import Category from "../models/categoriesSchemma.js";
import Product from "../models/ProductScheema.js";

// ✅ Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, products } = req.body;

    // 🧩 Validate category name
    if (!name)
      return res.status(400).json({ success: false, message: "Category name is required" });

    // 🧠 Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ success: false, message: "Category already exists" });

    // ✅ If products provided, validate all exist
    let validProducts = [];
    if (products && products.length > 0) {
      const foundProducts = await Product.find({ _id: { $in: products } });

      if (foundProducts.length !== products.length) {
        const missingIds = products.filter(
          (id) => !foundProducts.some((p) => p._id.toString() === id)
        );
        return res.status(400).json({
          success: false,
          message: "Some products not found",
          missingProductIds: missingIds,
        });
      }

      validProducts = foundProducts.map((p) => p._id);
    }

    // 🆕 Create category
    const category = new Category({
      name,
      products: validProducts,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


// ✅ Get all categories with products populated
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products").lean();
    res.status(200).json({ success: true, total: categories.length, categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✅ Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res.status(200).json({ success: true, category });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✅ Update category (name or products)
export const updateCategory = async (req, res) => {
  try {
    const { name, products } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    if (name) category.name = name;
    if (products) category.products = products;

    await category.save();
    res.status(200).json({ success: true, message: "Category updated successfully", category });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✅ Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
