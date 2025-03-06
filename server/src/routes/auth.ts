import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// User login with phone and PIN
router.post("/login", async (req, res) => {
  try {
    const { phone, pin } = req.body;

    // Validate input
    if (!phone || !pin) {
      return res
        .status(400)
        .json({ message: "يرجى إدخال رقم الهاتف ورمز PIN" });
    }

    // Check if user exists
    const [users] = await pool.query(
      "SELECT * FROM users WHERE phone_number = ?",
      [phone],
    );
    const user = (users as any[])[0];

    if (!user) {
      return res.status(400).json({ message: "بيانات الدخول غير صحيحة" });
    }

    // Compare PIN (in a real app, PIN should be hashed)
    const isMatch = await bcrypt.compare(pin, user.pin);

    if (!isMatch) {
      return res.status(400).json({ message: "بيانات الدخول غير صحيحة" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        phone: user.phone_number,
        name: user.name,
      },
    };

    // Sign token
    jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: { id: user.id, phone: user.phone_number, name: user.name },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Admin login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "يرجى إدخال البريد الإلكتروني وكلمة المرور" });
    }

    // Check if admin exists
    const [admins] = await pool.query(
      "SELECT * FROM admin_users WHERE email = ?",
      [email],
    );
    const admin = (admins as any[])[0];

    if (!admin) {
      return res.status(400).json({ message: "بيانات الدخول غير صحيحة" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "بيانات الدخول غير صحيحة" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      isAdmin: true,
    };

    // Sign token
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get user profile
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;

    // Get user data
    const [users] = await pool.query(
      "SELECT id, phone_number, name, email, address, created_at FROM users WHERE id = ?",
      [userId],
    );
    const user = (users as any[])[0];

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // Get user loyalty cards
    const [loyaltyCards] = await pool.query(
      `SELECT ulc.*, lc.name, lc.max_stamps, lc.reward 
       FROM user_loyalty_cards ulc 
       JOIN loyalty_cards lc ON ulc.card_id = lc.id 
       WHERE ulc.user_id = ?`,
      [userId],
    );

    // Get user coins balance
    const [coinsResult] = await pool.query(
      "SELECT balance FROM coins_balance WHERE user_id = ?",
      [userId],
    );
    const coinsBalance = (coinsResult as any[])[0]?.balance || 0;

    res.json({
      user: {
        id: user.id,
        phone: user.phone_number,
        name: user.name,
        email: user.email,
        address: user.address,
        created_at: user.created_at,
      },
      loyaltyCards,
      coinsBalance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Update user profile
router.put("/profile", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { name, email, address } = req.body;

    // Update user data
    await pool.query(
      "UPDATE users SET name = ?, email = ?, address = ? WHERE id = ?",
      [name, email, address, userId],
    );

    res.json({ message: "تم تحديث الملف الشخصي بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

export default router;
