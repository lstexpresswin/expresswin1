import express from "express";
import pool from "../config/db";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

// Get user's loyalty cards
router.get("/cards", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    const [cards] = await pool.query(
      `SELECT ulc.*, lc.name, lc.description, lc.max_stamps, lc.reward 
       FROM user_loyalty_cards ulc 
       JOIN loyalty_cards lc ON ulc.card_id = lc.id 
       WHERE ulc.user_id = ?`,
      [userId],
    );

    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get user's coins balance
router.get("/coins", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    const [result] = await pool.query(
      "SELECT balance FROM coins_balance WHERE user_id = ?",
      [userId],
    );

    const balance = (result as any[])[0]?.balance || 0;

    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get user's coins transactions
router.get("/coins/transactions", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    const [transactions] = await pool.query(
      `SELECT * FROM coins_transactions WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Redeem a gift code
router.post("/gifts/redeem", authenticateUser, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.user.user.id;
    const { code } = req.body;

    // Check if gift exists and is active
    const [gifts] = await connection.query(
      `SELECT * FROM quick_gifts WHERE id = ? AND status = 'active' AND expiry_date >= CURDATE()`,
      [code],
    );

    if ((gifts as any[]).length === 0) {
      return res
        .status(400)
        .json({ message: "رمز الهدية غير صالح أو منتهي الصلاحية" });
    }

    const gift = (gifts as any[])[0];

    // Check if user already has this gift
    const [userGifts] = await connection.query(
      `SELECT * FROM user_gifts WHERE user_id = ? AND gift_id = ?`,
      [userId, code],
    );

    if ((userGifts as any[]).length > 0) {
      return res
        .status(400)
        .json({ message: "لقد قمت بالفعل باستخدام هذا الرمز" });
    }

    // Add gift to user
    await connection.query(
      `INSERT INTO user_gifts (user_id, gift_id, is_used) VALUES (?, ?, false)`,
      [userId, code],
    );

    await connection.commit();

    res.json({
      message: "تم استرداد الهدية بنجاح",
      gift: {
        id: gift.id,
        name: gift.name,
        description: gift.description,
        type: gift.type,
        value: gift.value,
        expiry_date: gift.expiry_date,
        image_url: gift.image_url,
      },
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  } finally {
    connection.release();
  }
});

// Get user's gifts
router.get("/gifts", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    const [gifts] = await pool.query(
      `SELECT ug.*, qg.name, qg.description, qg.type, qg.value, qg.expiry_date, qg.image_url 
       FROM user_gifts ug 
       JOIN quick_gifts qg ON ug.gift_id = qg.id 
       WHERE ug.user_id = ? AND qg.expiry_date >= CURDATE() 
       ORDER BY ug.created_at DESC`,
      [userId],
    );

    res.json(gifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Use a gift
router.post("/gifts/:id/use", authenticateUser, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const userId = req.user.user.id;
    const giftId = req.params.id;

    // Check if user has this gift and it's not used
    const [userGifts] = await connection.query(
      `SELECT ug.*, qg.name, qg.type, qg.value 
       FROM user_gifts ug 
       JOIN quick_gifts qg ON ug.gift_id = qg.id 
       WHERE ug.id = ? AND ug.user_id = ? AND ug.is_used = false AND qg.expiry_date >= CURDATE()`,
      [giftId, userId],
    );

    if ((userGifts as any[]).length === 0) {
      return res
        .status(400)
        .json({ message: "الهدية غير متاحة أو تم استخدامها بالفعل" });
    }

    const userGift = (userGifts as any[])[0];

    // Mark gift as used
    await connection.query(
      `UPDATE user_gifts SET is_used = true, used_at = NOW() WHERE id = ?`,
      [giftId],
    );

    await connection.commit();

    res.json({
      message: "تم استخدام الهدية بنجاح",
      gift: userGift,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  } finally {
    connection.release();
  }
});

export default router;
