import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRotes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use('/api/user',userRotes)
app.use('/api/order',orderRoutes);

// DB Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/surprisesutra")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
