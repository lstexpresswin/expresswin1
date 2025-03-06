import express from "express";
import pool from "../config/db";

const router = express.Router();

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE is_active = true ORDER BY name",
    );
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

// Get all menu items
router.get("/items", async (req, res) => {
  try {
    const categoryId = req.query.category;
    let query = `
      SELECT mi.* 
      FROM menu_items mi
      WHERE mi.is_available = true
    `;

    const queryParams: any[] = [];

    if (categoryId && categoryId !== "all") {
      query += " AND mi.category_id = ?";
      queryParams.push(categoryId);
    }

    query += " ORDER BY mi.name";

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

// Get menu item by ID
router.get("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Get item details
    const [items] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      itemId,
    ]);

    if ((items as any[]).length === 0) {
      return res.status(404).json({ message: "الصنف غير موجود" });
    }

    const item = (items as any[])[0];

    // Get sizes
    const [sizes] = await pool.query(
      "SELECT size_name FROM item_sizes WHERE item_id = ?",
      [itemId],
    );

    // Get ingredients
    const [ingredients] = await pool.query(
      "SELECT ingredient_name FROM item_ingredients WHERE item_id = ?",
      [itemId],
    );

    // Get addons
    const [addons] = await pool.query(
      "SELECT addon_name, price FROM item_addons WHERE item_id = ?",
      [itemId],
    );

    const itemWithDetails = {
      ...item,
      sizes: (sizes as any[]).map((s) => s.size_name),
      ingredients: (ingredients as any[]).map((i) => i.ingredient_name),
      addons: (addons as any[]).map((a) => ({
        name: a.addon_name,
        price: a.price,
      })),
    };

    res.json(itemWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

export default router;
