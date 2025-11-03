import Product from "../models/ProductScheema.js";
import XLSX from "xlsx";
import fs from "fs";

// ✅ Get productby params
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;
    const skip = (page - 1) * limit;

    const search = req.query.search || '';
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    const vendors = req.query.vendors ? (Array.isArray(req.query.vendors) ? req.query.vendors : [req.query.vendors]) : [];
    const categories = req.query.categories ? (Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories]) : [];
    const tags = req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags]) : [];

    // Build filter query
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Price filter on first variant
    filter.$or = [
      { 'variants.0.price': { $gte: minPrice, $lte: maxPrice } },
      { variants: { $size: 0 } }, // ✅ include products with no variants
    ];


    if (vendors.length > 0) {
      filter.vendor = { $in: vendors };
    }

    if (categories.length > 0) {
      filter.productCategory = { $in: categories };
    }

    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }

    // Get total count
    const total = await Product.countDocuments(filter);

    // Get paginated products
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      products,
      total,
      page,
      totalPages,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (err) {
    console.error("Error fetching all products:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✅ Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const addProduct = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const {
      title, handle, description, vendor, productCategory, type,
      tags, published, giftCard, seo, variants, colors,
      termsAndConditions, boxContents
    } = data;

    // === GENERAL IMAGES ===
    const generalImages = (req.files || [])
      .filter((f) => f.fieldname === "general")
      .map((f, i) => ({
        src: `/uploads/general/${f.filename}`,
        position: i + 1,
      }));

    // === VARIANT IMAGES ===
    const variantImageEntries = variants.map((v) => {
      const fieldname = `variant-${v.color}-${v.size}`;
      const files = (req.files || []).filter((f) => f.fieldname === fieldname);
      const images = files.map((f, i) => ({
        src: `/uploads/variants/${v.color}-${v.size}/${f.filename}`,
        position: i + 1,
      }));
      return { variant: `${v.color}-${v.size}`, images };
    });

    // === SHOPIFY-STYLE VARIANTS ===
    const shopifyVariants = variants.map((v) => ({
      ...v,
      option1: v.color,
      option2: v.size,
    }));

    // === CREATE PRODUCT ===
    const product = new Product({
      title, handle, description, vendor, productCategory, type,
      tags, published, giftCard, seo,
      images: generalImages,
      variantImages: variantImageEntries,
      variants: shopifyVariants,
      colors: colors.map((c) => ({
        id: c.id,
        name: c.name,
        hex: c.hex,
        sizes: c.sizes,
      })),
      termsAndConditions, boxContents,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(400).json({ message: err.message || "Failed to add product" });
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

