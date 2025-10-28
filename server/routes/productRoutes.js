import express from "express";
import multer from "multer";
import {
  getProducts,
  addProduct,
  uploadExcel,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

// Multer setup for Excel uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // CSV
      "application/octet-stream" // sometimes CSV or Excel is detected like this
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log("Rejected file MIME:", file.mimetype);
      cb(new Error("Only Excel or CSV files are allowed"), false);
    }
  },
});



// Routes
router.get("/", getProducts);
router.post("/", addProduct);
router.post("/upload", upload.single("file"), uploadExcel);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);



export default router;
