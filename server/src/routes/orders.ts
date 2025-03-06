import express from "express";
import pool from "../config/db";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

// Create a new order
router.post("/", authenticateUser, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.user.user.id;
    const {
      items,
      total,
      payment_method,
      coins_used,
      delivery_address,
      notes,
    } = req.body;

    // Generate order ID
    const orderId = `#ORD${Math.floor(10000 + Math.random() * 90000)}`;

    // Calculate stamps earned (1 stamp per order)
    const stamps_earned = 1;

    // Insert order
    await connection.query(
      `INSERT INTO orders 
       (id, user_id, total_amount, status, payment_method, coins_used, stamps_earned, delivery_address, notes) 
       VALUES (?, ?, ?, 'new', ?, ?, ?, ?, ?)`,
      [
        orderId,
        userId,
        total,
        payment_method,
        coins_used || 0,
        stamps_earned,
        delivery_address,
        notes,
      ],
    );

    // Insert order items
    for (const item of items) {
      const [result] = await connection.query(
        `INSERT INTO order_items (order_id, item_id, quantity, price, size, notes) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.quantity,
          item.price,
          item.size || null,
          item.notes || null,
        ],
      );

      const orderItemId = (result as any).insertId;

      // Insert order item addons if any
      if (item.addons && item.addons.length > 0) {
        for (const addon of item.addons) {
          await connection.query(
            `INSERT INTO order_item_addons (order_item_id, addon_name, price) 
             VALUES (?, ?, ?)`,
            [orderItemId, addon.name, addon.price],
          );
        }
      }
    }

    // If coins were used, update user's coins balance
    if (coins_used && coins_used > 0) {
      // Add transaction record
      await connection.query(
        `INSERT INTO coins_transactions (user_id, amount, type, order_id, description) 
         VALUES (?, ?, 'spent', ?, 'Coins used for order')`,
        [userId, -coins_used, orderId],
      );

      // Update balance
      await connection.query(
        `UPDATE coins_balance SET balance = balance - ? WHERE user_id = ?`,
        [coins_used, userId],
      );
    }

    // Add stamps to user's loyalty card (assuming first active card)
    const [activeCards] = await connection.query(
      `SELECT ulc.* FROM user_loyalty_cards ulc 
       JOIN loyalty_cards lc ON ulc.card_id = lc.id 
       WHERE ulc.user_id = ? AND lc.is_active = true 
       LIMIT 1`,
      [userId],
    );

    if ((activeCards as any[]).length > 0) {
      const activeCard = (activeCards as any[])[0];

      // Add stamps to card
      await connection.query(
        `UPDATE user_loyalty_cards SET stamps = stamps + ? WHERE id = ?`,
        [stamps_earned, activeCard.id],
      );

      // Record stamps history
      await connection.query(
        `INSERT INTO stamps_history (user_id, card_id, stamps_added, order_id, reason) 
         VALUES (?, ?, ?, ?, 'Order completion')`,
        [userId, activeCard.card_id, stamps_earned, orderId],
      );

      // Check if user has earned a reward (reached max_stamps)
      const [cardDetails] = await connection.query(
        `SELECT ulc.stamps, lc.max_stamps, lc.reward 
         FROM user_loyalty_cards ulc 
         JOIN loyalty_cards lc ON ulc.card_id = lc.id 
         WHERE ulc.id = ?`,
        [activeCard.id],
      );

      const cardDetail = (cardDetails as any[])[0];
      if (cardDetail.stamps >= cardDetail.max_stamps) {
        // User has earned a reward - reset stamps
        await connection.query(
          `UPDATE user_loyalty_cards SET stamps = 0 WHERE id = ?`,
          [activeCard.id],
        );
      }
    }

    await connection.commit();

    res.status(201).json({
      message: "تم إنشاء الطلب بنجاح",
      orderId,
      stamps_earned,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  } finally {
    connection.release();
  }
});

// Get user's order history
router.get("/history", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    // For each order, get items
    const ordersWithItems = await Promise.all(
      (orders as any[]).map(async (order) => {
        const [items] = await pool.query(
          `SELECT oi.*, mi.name, mi.image_url 
         FROM order_items oi 
         JOIN menu_items mi ON oi.item_id = mi.id 
         WHERE oi.order_id = ?`,
          [order.id],
        );

        // For each item, get addons
        const itemsWithAddons = await Promise.all(
          (items as any[]).map(async (item) => {
            const [addons] = await pool.query(
              `SELECT * FROM order_item_addons WHERE order_item_id = ?`,
              [item.id],
            );

            return {
              ...item,
              addons: addons,
            };
          }),
        );

        return {
          ...order,
          items: itemsWithAddons,
        };
      }),
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get order details by ID
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const orderId = req.params.id;

    // Get order details
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
      [orderId, userId],
    );

    if ((orders as any[]).length === 0) {
      return res.status(404).json({ message: "الطلب غير موجود" });
    }

    const order = (orders as any[])[0];

    // Get order items
    const [items] = await pool.query(
      `SELECT oi.*, mi.name, mi.image_url 
       FROM order_items oi 
       JOIN menu_items mi ON oi.item_id = mi.id 
       WHERE oi.order_id = ?`,
      [orderId],
    );

    // For each item, get addons
    const itemsWithAddons = await Promise.all(
      (items as any[]).map(async (item) => {
        const [addons] = await pool.query(
          `SELECT * FROM order_item_addons WHERE order_item_id = ?`,
          [item.id],
        );

        return {
          ...item,
          addons: addons,
        };
      }),
    );

    const orderWithItems = {
      ...order,
      items: itemsWithAddons,
    };

    res.json(orderWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

export default router;
