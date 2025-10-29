import express from "express";
import {
  createOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orders.js";

const router = express.Router();

// Routes
router.post("/", createOrder); // Create new order
router.get("/", getOrders); // Get all orders (admin)
router.get("/user/:userId", getUserOrders); // Get orders of a single user
router.get("/:id", getOrderById); // Get order by ID
router.patch("/:id/status", updateOrderStatus); // Update order status
router.delete("/:id", deleteOrder); // Delete order

export default router;
