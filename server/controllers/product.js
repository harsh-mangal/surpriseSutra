import Product from "../models/ProductScheema.js";
import XLSX from "xlsx";
import fs from "fs";

// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add a single product manually
export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Upload and import Excel file
export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!sheetData.length) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Empty Excel sheet" });
    }

    // Convert each row into Product schema format
    const products = sheetData.map((row) => ({
      handle: row["Handle"],
      title: row["Title"],
      description: row["Body (HTML)"] || null,
      vendor: row["Vendor"] || null,
      productCategory: row["Product Category"] || null,
      type: row["Type"] || null,
      tags: row["Tags"] ? row["Tags"].split(",").map(t => t.trim()) : [],
      published: row["Published"] === "TRUE" || row["Published"] === true,
      option1Name: row["Option1 Name"] || null,
      option1Value: row["Option1 Value"] || null,
      giftCard: row["Gift Card"] === "TRUE" || row["Gift Card"] === true,
      seo: {
        title: row["SEO Title"] || null,
        description: row["SEO Description"] || null,
      },
      images: [
        ...(row["Image Src"]
          ? [
              {
                src: row["Image Src"],
                position: 1,
                altText: row["Image Alt Text"] || null,
              },
            ]
          : []),
      ],
      variants: [
        {
          sku: row["Variant SKU"] || null,
          grams: Number(row["Variant Grams"] || 0),
          inventoryTracker: row["Variant Inventory Tracker"] || null,
          inventoryQty: Number(row["Variant Inventory Qty"] || 0),
          inventoryPolicy: row["Variant Inventory Policy"] || null,
          fulfillmentService: row["Variant Fulfillment Service"] || null,
          price: Number(row["Variant Price"] || 0),
          compareAtPrice: Number(row["Variant Compare At Price"] || 0),
          requiresShipping: row["Variant Requires Shipping"] !== "FALSE",
          taxable: row["Variant Taxable"] !== "FALSE",
          weightUnit: row["Variant Weight Unit"] || "g",
          variantImage: row["Variant Image"] || null,
        },
      ],
      includedIndia:
        row["Included / India"] === "TRUE" || row["Included / India"] === true,
      status: "active",
    }));

    // Insert products into MongoDB
    await Product.insertMany(products, { ordered: false });

    fs.unlinkSync(filePath); // delete uploaded file

    res.status(200).json({
      message: "Excel imported successfully",
      count: products.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Edit (Update) Product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // returns updated doc
      runValidators: true, // validates schema
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete Product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

