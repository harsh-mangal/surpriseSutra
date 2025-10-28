import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  sku: { type: String, default: null },                              // Variant SKU
  grams: { type: Number, default: 0 },                               // Variant Grams
  inventoryTracker: { type: String, default: null },                 // shopify / blank
  inventoryQty: { type: Number, default: 0 },                        // Quantity
  inventoryPolicy: { type: String, default: null },                  // deny / continue
  fulfillmentService: { type: String, default: null },               // manual
  price: { type: Number, default: 0 },                               // Variant Price
  compareAtPrice: { type: Number, default: null },                   // Compare Price
  requiresShipping: { type: Boolean, default: true },                // Requires Shipping
  taxable: { type: Boolean, default: true },                         // Variant Taxable
  weightUnit: { type: String, default: "g" },                        // Variant Weight Unit
  variantImage: { type: String, default: null },                     // Variant Image
});

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },                             // Image Src URL
  position: { type: Number, default: 1 },                            // Image order
  altText: { type: String, default: null },                          // Alt text
});

const productSchema = new mongoose.Schema(
  {
    handle: { type: String, required: true, unique: true },          // Handle
    title: { type: String, required: true },                         // Product Title
    description: { type: String, default: null },                    // Body (HTML)
    vendor: { type: String, default: null },                         // Vendor
    productCategory: { type: String, default: null },                // Product Category
    type: { type: String, default: null },                           // Type
    tags: [{ type: String }],                                        // Tags
    published: { type: Boolean, default: true },                     // Published
    option1Name: { type: String, default: null },                    // Option1 Name
    option1Value: { type: String, default: null },                   // Option1 Value
    giftCard: { type: Boolean, default: false },                     // Gift Card
    seo: {
      title: { type: String, default: null },                        // SEO Title
      description: { type: String, default: null },                  // SEO Description
    },
    images: [imageSchema],                                           // Product Images
    variants: [variantSchema],                                       // Product Variants
    includedIndia: { type: Boolean, default: false },                // Included / India
    status: { type: String, enum: ["active", "draft", "archived"], default: "active" }, // Status
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
