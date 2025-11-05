import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRotes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use('/api/user',userRotes)
app.use('/api/order',orderRoutes);
app.use('/api/category',categoryRoutes)

// DB Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb+srv://dodun:dodun@dodun.cqitb.mongodb.net/suprisesutra?appName=Dodun")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 3043;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
