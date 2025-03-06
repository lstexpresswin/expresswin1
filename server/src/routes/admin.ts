import express from "express";
import pool from "../config/db";
import { authenticateAdmin } from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Dashboard statistics
router.get("/dashboard/stats", authenticateAdmin, async (req, res) => {
  try {
    // Get total orders today
    const [todayOrders] = await pool.query(
      `SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE()`,
    );

    // Get new orders today
    const [newOrders] = await pool.query(
      `SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = CURDATE() AND status = 'new'`,
    );

    // Get active users count
    const [activeUsers] = await pool.query(
      `SELECT COUNT(*) as count FROM users WHERE is_active = true`,
    );

    // Get new users this week
    const [newUsers] = await pool.query(
      `SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`,
    );

    // Get total sales today
    const [todaySales] = await pool.query(
      `SELECT SUM(total_amount) as total FROM orders WHERE DATE(created_at) = CURDATE()`,
    );

    // Get average preparation time
    const [avgPrepTime] = await pool.query(
      `SELECT AVG(preparing_time) as avg_time FROM orders WHERE preparing_time IS NOT NULL`,
    );

    // Get popular categories
    const [popularCategories] = await pool.query(
      `SELECT c.id, c.name, COUNT(oi.id) as order_count, SUM(oi.price * oi.quantity) as total_sales
       FROM categories c
       JOIN menu_items mi ON c.id = mi.category_id
       JOIN order_items oi ON mi.id = oi.item_id
       JOIN orders o ON oi.order_id = o.id
       WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY c.id
       ORDER BY total_sales DESC
       LIMIT 5`,
    );

    // Get recent orders
    const [recentOrders] = await pool.query(
      `SELECT o.id, o.total_amount, o.status, o.created_at, u.name as customer_name, u.phone_number as customer_phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC
       LIMIT 5`,
    );

    // Get popular items
    const [popularItems] = await pool.query(
      `SELECT mi.id, mi.name, mi.price, mi.image_url, c.name as category, COUNT(oi.id) as order_count
       FROM menu_items mi
       JOIN categories c ON mi.category_id = c.id
       JOIN order_items oi ON mi.id = oi.item_id
       JOIN orders o ON oi.order_id = o.id
       WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY mi.id
       ORDER BY order_count DESC
       LIMIT 5`,
    );

    res.json({
      orders: {
        today: (todayOrders as any[])[0].count,
        new: (newOrders as any[])[0].count,
      },
      users: {
        active: (activeUsers as any[])[0].count,
        new: (newUsers as any[])[0].count,
      },
      sales: {
        today: (todaySales as any[])[0].total || 0,
      },
      preparation: {
        avg_time: Math.round((avgPrepTime as any[])[0].avg_time) || 0,
      },
      popularCategories,
      recentOrders,
      popularItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Order management

// Get all orders
router.get("/orders", authenticateAdmin, async (req, res) => {
  try {
    const status = req.query.status;
    const dateRange = req.query.dateRange || "all";

    let query = `
      SELECT o.*, u.name as customer_name, u.phone_number as customer_phone, u.address as customer_address
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `;

    const queryParams: any[] = [];

    // Filter by status
    if (status && status !== "all") {
      query += " WHERE o.status = ?";
      queryParams.push(status);
    }

    // Filter by date range
    if (dateRange !== "all") {
      const whereOrAnd = queryParams.length > 0 ? "AND" : "WHERE";

      if (dateRange === "today") {
        query += ` ${whereOrAnd} DATE(o.created_at) = CURDATE()`;
      } else if (dateRange === "yesterday") {
        query += ` ${whereOrAnd} DATE(o.created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`;
      } else if (dateRange === "week") {
        query += ` ${whereOrAnd} o.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`;
      } else if (dateRange === "month") {
        query += ` ${whereOrAnd} o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`;
      }
    }

    query += " ORDER BY o.created_at DESC";

    const [orders] = await pool.query(query, queryParams);

    // For each order, get items
    const ordersWithItems = await Promise.all(
      (orders as any[]).map(async (order) => {
        const [items] = await pool.query(
          `SELECT oi.*, mi.name 
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
          customer: {
            name: order.customer_name,
            phone: order.customer_phone,
            address: order.customer_address,
          },
        };
      }),
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Update order status
router.put("/orders/:id/status", authenticateAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Validate status
    const validStatuses = [
      "new",
      "preparing",
      "delivering",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "حالة الطلب غير صالحة" });
    }

    // Update order status
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      orderId,
    ]);

    res.json({ message: "تم تحديث حالة الطلب بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Menu management

// Get all categories (including inactive)
router.get("/menu/categories", authenticateAdmin, async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories ORDER BY name",
    );
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Create a new category
router.post(
  "/menu/categories",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, icon } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Generate category ID (slug from name)
      const id = name.toLowerCase().replace(/\s+/g, "-");

      // Insert category
      await pool.query(
        "INSERT INTO categories (id, name, description, image_url, icon) VALUES (?, ?, ?, ?, ?)",
        [id, name, description, image_url, icon],
      );

      res.status(201).json({
        message: "تم إنشاء الفئة بنجاح",
        category: { id, name, description, image_url, icon },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  },
);

// Update a category
router.put(
  "/menu/categories/:id",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name, description, icon, is_active } = req.body;

      let query = "UPDATE categories SET name = ?, description = ?";
      const queryParams: any[] = [name, description];

      if (icon) {
        query += ", icon = ?";
        queryParams.push(icon);
      }

      if (req.file) {
        query += ", image_url = ?";
        queryParams.push(`/uploads/${req.file.filename}`);
      }

      if (is_active !== undefined) {
        query += ", is_active = ?";
        queryParams.push(is_active === "true");
      }

      query += " WHERE id = ?";
      queryParams.push(categoryId);

      await pool.query(query, queryParams);

      res.json({ message: "تم تحديث الفئة بنجاح" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  },
);

// Get all menu items (including unavailable)
router.get("/menu/items", authenticateAdmin, async (req, res) => {
  try {
    const categoryId = req.query.category;

    let query = "SELECT * FROM menu_items";
    const queryParams: any[] = [];

    if (categoryId && categoryId !== "all") {
      query += " WHERE category_id = ?";
      queryParams.push(categoryId);
    }

    query += " ORDER BY name";

    const [items] = await pool.query(query, queryParams);

    // For each item, get sizes, ingredients, and addons
    const itemsWithDetails = await Promise.all(
      (items as any[]).map(async (item) => {
        // Get sizes
        const [sizes] = await pool.query(
          "SELECT size_name FROM item_sizes WHERE item_id = ?",
          [item.id],
        );

        // Get ingredients
        const [ingredients] = await pool.query(
          "SELECT ingredient_name FROM item_ingredients WHERE item_id = ?",
          [item.id],
        );

        // Get addons
        const [addons] = await pool.query(
          "SELECT addon_name, price FROM item_addons WHERE item_id = ?",
          [item.id],
        );

        return {
          ...item,
          sizes: (sizes as any[]).map((s) => s.size_name),
          ingredients: (ingredients as any[]).map((i) => i.ingredient_name),
          addons: (addons as any[]).map((a) => ({
            name: a.addon_name,
            price: a.price,
          })),
        };
      }),
    );

    res.json(itemsWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Create a new menu item
router.post(
  "/menu/items",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const {
        name,
        description,
        price,
        coins_price,
        category_id,
        sizes,
        ingredients,
        addons,
        is_available,
      } = req.body;

      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Generate item ID
      const id = Date.now().toString();

      // Insert menu item
      await connection.query(
        `INSERT INTO menu_items 
       (id, name, description, price, coins_price, image_url, category_id, is_available) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          description,
          price,
          coins_price || null,
          image_url,
          category_id,
          is_available === "true",
        ],
      );

      // Insert sizes if provided
      if (sizes && Array.isArray(JSON.parse(sizes))) {
        const parsedSizes = JSON.parse(sizes);
        for (const size of parsedSizes) {
          await connection.query(
            "INSERT INTO item_sizes (item_id, size_name) VALUES (?, ?)",
            [id, size],
          );
        }
      }

      // Insert ingredients if provided
      if (ingredients && Array.isArray(JSON.parse(ingredients))) {
        const parsedIngredients = JSON.parse(ingredients);
        for (const ingredient of parsedIngredients) {
          await connection.query(
            "INSERT INTO item_ingredients (item_id, ingredient_name) VALUES (?, ?)",
            [id, ingredient],
          );
        }
      }

      // Insert addons if provided
      if (addons && Array.isArray(JSON.parse(addons))) {
        const parsedAddons = JSON.parse(addons);
        for (const addon of parsedAddons) {
          await connection.query(
            "INSERT INTO item_addons (item_id, addon_name, price) VALUES (?, ?, ?)",
            [id, addon.name, addon.price],
          );
        }
      }

      await connection.commit();

      res.status(201).json({
        message: "تم إنشاء الصنف بنجاح",
        item: { id, name, description, price, category_id },
      });
    } catch (err) {
      await connection.rollback();
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    } finally {
      connection.release();
    }
  },
);

// Update a menu item
router.put(
  "/menu/items/:id",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const itemId = req.params.id;
      const {
        name,
        description,
        price,
        coins_price,
        category_id,
        sizes,
        ingredients,
        addons,
        is_available,
      } = req.body;

      let query = `UPDATE menu_items SET 
                 name = ?, 
                 description = ?, 
                 price = ?, 
                 category_id = ?`;

      const queryParams: any[] = [name, description, price, category_id];

      if (coins_price !== undefined) {
        query += ", coins_price = ?";
        queryParams.push(coins_price || null);
      }

      if (req.file) {
        query += ", image_url = ?";
        queryParams.push(`/uploads/${req.file.filename}`);
      }

      if (is_available !== undefined) {
        query += ", is_available = ?";
        queryParams.push(is_available === "true");
      }

      query += " WHERE id = ?";
      queryParams.push(itemId);

      await connection.query(query, queryParams);

      // Update sizes if provided
      if (sizes) {
        // Delete existing sizes
        await connection.query("DELETE FROM item_sizes WHERE item_id = ?", [
          itemId,
        ]);

        // Insert new sizes
        const parsedSizes = JSON.parse(sizes);
        if (Array.isArray(parsedSizes)) {
          for (const size of parsedSizes) {
            await connection.query(
              "INSERT INTO item_sizes (item_id, size_name) VALUES (?, ?)",
              [itemId, size],
            );
          }
        }
      }

      // Update ingredients if provided
      if (ingredients) {
        // Delete existing ingredients
        await connection.query(
          "DELETE FROM item_ingredients WHERE item_id = ?",
          [itemId],
        );

        // Insert new ingredients
        const parsedIngredients = JSON.parse(ingredients);
        if (Array.isArray(parsedIngredients)) {
          for (const ingredient of parsedIngredients) {
            await connection.query(
              "INSERT INTO item_ingredients (item_id, ingredient_name) VALUES (?, ?)",
              [itemId, ingredient],
            );
          }
        }
      }

      // Update addons if provided
      if (addons) {
        // Delete existing addons
        await connection.query("DELETE FROM item_addons WHERE item_id = ?", [
          itemId,
        ]);

        // Insert new addons
        const parsedAddons = JSON.parse(addons);
        if (Array.isArray(parsedAddons)) {
          for (const addon of parsedAddons) {
            await connection.query(
              "INSERT INTO item_addons (item_id, addon_name, price) VALUES (?, ?, ?)",
              [itemId, addon.name, addon.price],
            );
          }
        }
      }

      await connection.commit();

      res.json({ message: "تم تحديث الصنف بنجاح" });
    } catch (err) {
      await connection.rollback();
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    } finally {
      connection.release();
    }
  },
);

// Delete a menu item
router.delete("/menu/items/:id", authenticateAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const itemId = req.params.id;

    // Delete related records first
    await connection.query("DELETE FROM item_sizes WHERE item_id = ?", [
      itemId,
    ]);
    await connection.query("DELETE FROM item_ingredients WHERE item_id = ?", [
      itemId,
    ]);
    await connection.query("DELETE FROM item_addons WHERE item_id = ?", [
      itemId,
    ]);

    // Delete the menu item
    await connection.query("DELETE FROM menu_items WHERE id = ?", [itemId]);

    await connection.commit();

    res.json({ message: "تم حذف الصنف بنجاح" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  } finally {
    connection.release();
  }
});

// Loyalty management

// Get all loyalty cards
router.get("/loyalty/cards", authenticateAdmin, async (req, res) => {
  try {
    const [cards] = await pool.query(
      "SELECT * FROM loyalty_cards ORDER BY name",
    );
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Create a new loyalty card
router.post("/loyalty/cards", authenticateAdmin, async (req, res) => {
  try {
    const { name, description, max_stamps, reward } = req.body;

    // Generate a 7-digit card ID
    const id = Math.floor(1000000 + Math.random() * 9000000).toString();

    await pool.query(
      "INSERT INTO loyalty_cards (id, name, description, max_stamps, reward) VALUES (?, ?, ?, ?, ?)",
      [id, name, description, max_stamps, reward],
    );

    res.status(201).json({
      message: "تم إنشاء بطاقة الولاء بنجاح",
      card: { id, name, description, max_stamps, reward },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Update a loyalty card
router.put("/loyalty/cards/:id", authenticateAdmin, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { name, description, max_stamps, reward, is_active } = req.body;

    await pool.query(
      "UPDATE loyalty_cards SET name = ?, description = ?, max_stamps = ?, reward = ?, is_active = ? WHERE id = ?",
      [name, description, max_stamps, reward, is_active === "true", cardId],
    );

    res.json({ message: "تم تحديث بطاقة الولاء بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get all quick gifts
router.get("/loyalty/gifts", authenticateAdmin, async (req, res) => {
  try {
    const [gifts] = await pool.query(
      "SELECT * FROM quick_gifts ORDER BY created_at DESC",
    );
    res.json(gifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Create a new quick gift
router.post(
  "/loyalty/gifts",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, type, value, expiry_date } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      // Generate a 5-digit gift code
      const id = Math.floor(10000 + Math.random() * 90000).toString();

      await pool.query(
        `INSERT INTO quick_gifts 
       (id, name, description, type, value, expiry_date, image_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`,
        [id, name, description, type, value, expiry_date, image_url],
      );

      res.status(201).json({
        message: "تم إنشاء الهدية بنجاح",
        gift: { id, name, description, type, value, expiry_date, image_url },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  },
);

// Update a quick gift
router.put(
  "/loyalty/gifts/:id",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const giftId = req.params.id;
      const { name, description, type, value, expiry_date, status } = req.body;

      let query = `UPDATE quick_gifts SET 
                 name = ?, 
                 description = ?, 
                 type = ?, 
                 value = ?, 
                 expiry_date = ?`;

      const queryParams: any[] = [name, description, type, value, expiry_date];

      if (req.file) {
        query += ", image_url = ?";
        queryParams.push(`/uploads/${req.file.filename}`);
      }

      if (status) {
        query += ", status = ?";
        queryParams.push(status);
      }

      query += " WHERE id = ?";
      queryParams.push(giftId);

      await pool.query(query, queryParams);

      res.json({ message: "تم تحديث الهدية بنجاح" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  },
);

// User management

// Get all users
router.get("/users", authenticateAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT u.id, u.phone_number, u.name, u.email, u.address, u.created_at, u.is_active,
              (SELECT balance FROM coins_balance WHERE user_id = u.id) as coins_balance
       FROM users u
       ORDER BY u.created_at DESC`,
    );

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get user details
router.get("/users/:id", authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Get user data
    const [users] = await pool.query(
      `SELECT u.id, u.phone_number, u.name, u.email, u.address, u.created_at, u.is_active,
              (SELECT balance FROM coins_balance WHERE user_id = u.id) as coins_balance
       FROM users u
       WHERE u.id = ?`,
      [userId],
    );

    if ((users as any[]).length === 0) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    const user = (users as any[])[0];

    // Get user loyalty cards
    const [loyaltyCards] = await pool.query(
      `SELECT ulc.*, lc.name, lc.max_stamps, lc.reward 
       FROM user_loyalty_cards ulc 
       JOIN loyalty_cards lc ON ulc.card_id = lc.id 
       WHERE ulc.user_id = ?`,
      [userId],
    );

    // Get user orders
    const [orders] = await pool.query(
      `SELECT id, total_amount, status, created_at 
       FROM orders 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [userId],
    );

    // Get user gifts
    const [gifts] = await pool.query(
      `SELECT ug.*, qg.name, qg.type 
       FROM user_gifts ug 
       JOIN quick_gifts qg ON ug.gift_id = qg.id 
       WHERE ug.user_id = ? 
       ORDER BY ug.created_at DESC`,
      [userId],
    );

    res.json({
      user,
      loyaltyCards,
      orders,
      gifts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Update user
router.put("/users/:id", authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, address, is_active } = req.body;

    await pool.query(
      "UPDATE users SET name = ?, email = ?, address = ?, is_active = ? WHERE id = ?",
      [name, email, address, is_active === "true", userId],
    );

    res.json({ message: "تم تحديث المستخدم بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Add coins to user
router.post("/users/:id/coins", authenticateAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.params.id;
    const { amount, description } = req.body;

    // Check if user has coins balance record
    const [balanceResult] = await connection.query(
      "SELECT * FROM coins_balance WHERE user_id = ?",
      [userId],
    );

    if ((balanceResult as any[]).length === 0) {
      // Create coins balance record
      await connection.query(
        "INSERT INTO coins_balance (user_id, balance) VALUES (?, ?)",
        [userId, amount],
      );
    } else {
      // Update coins balance
      await connection.query(
        "UPDATE coins_balance SET balance = balance + ? WHERE user_id = ?",
        [amount, userId],
      );
    }

    // Add transaction record
    await connection.query(
      `INSERT INTO coins_transactions (user_id, amount, type, description) 
       VALUES (?, ?, 'bonus', ?)`,
      [userId, amount, description || "Admin bonus"],
    );

    await connection.commit();

    res.json({ message: "تم إضافة الكوينز بنجاح" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  } finally {
    connection.release();
  }
});

// Assign loyalty card to user
router.post("/users/:id/loyalty-cards", authenticateAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { card_id, stamps } = req.body;

    // Check if user already has this card
    const [existingCards] = await pool.query(
      "SELECT * FROM user_loyalty_cards WHERE user_id = ? AND card_id = ?",
      [userId, card_id],
    );

    if ((existingCards as any[]).length > 0) {
      return res
        .status(400)
        .json({ message: "المستخدم لديه بالفعل هذه البطاقة" });
    }

    // Assign card to user
    await pool.query(
      "INSERT INTO user_loyalty_cards (user_id, card_id, stamps) VALUES (?, ?, ?)",
      [userId, card_id, stamps || 0],
    );

    res.status(201).json({ message: "تم تعيين بطاقة الولاء بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

export default router;
