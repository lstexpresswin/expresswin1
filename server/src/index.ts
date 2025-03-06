import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import menuRoutes from "./routes/menu";
import orderRoutes from "./routes/orders";
import loyaltyRoutes from "./routes/loyalty";
import adminRoutes from "./routes/admin";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/admin", adminRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
