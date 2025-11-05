import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Trash2, X, Upload, Package } from "lucide-react";

const API_BASE = "https://apisurprise.dodunsoftsolutions.com/api";

const ProductAddForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // General images
  const [variantImages, setVariantImages] = useState({}); // { "Red-8": [File] }

  const [product, setProduct] = useState({
    title: "",
    handle: "",
    description: "",
    vendor: "Surprise Sutra",
    productCategory: "",
    type: "",
    tags: [],
    published: false,
    giftCard: false,
    seo: { title: "", description: "" },
    variants: [],
    termsAndConditions: "",
    boxContents: "",
    colors: [],
  });

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
  const processedCombos = useRef(new Set());

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/category`);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Reset processed combos
  useEffect(() => {
    processedCombos.current = new Set(
      product.variants.map((v) => `${v.color}-${v.size}`)
    );
  }, [product.variants]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // SEO
  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({
      ...p,
      seo: { ...p.seo, [name]: value },
    }));
  };

  // Tags
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!product.tags.includes(tag)) {
        setProduct((p) => ({ ...p, tags: [...p.tags, tag] }));
      }
      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setProduct((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  };

  // === COLOR HANDLERS ===
  const addColor = () => {
    setProduct((p) => ({
      ...p,
      colors: [...p.colors, { id: generateId(), name: "", hex: "#000000", sizes: [] }],
    }));
  };

  const updateColor = (id, field, value) => {
    setProduct((p) => ({
      ...p,
      colors: p.colors.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const removeColor = (id) => {
    const color = product.colors.find((c) => c.id === id);
    const colorName = color?.name;

    setProduct((p) => ({
      ...p,
      colors: p.colors.filter((c) => c.id !== id),
      variants: p.variants.filter((v) => v.color !== colorName),
    }));

    // Remove variant images
    setVariantImages((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${colorName}-`)) {
          delete updated[key];
        }
      });
      return updated;
    });

    processedCombos.current = new Set(
      product.variants.filter((v) => v.color !== colorName).map((v) => `${v.color}-${v.size}`)
    );
  };

  // === SIZE HANDLERS ===
  const handleSizeKeyDown = (e, colorId) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const size = e.target.value.trim().toUpperCase();
      const color = product.colors.find((c) => c.id === colorId);
      if (!color || !color.name) {
        alert("Please enter color name first");
        return;
      }

      setProduct((p) => ({
        ...p,
        colors: p.colors.map((c) =>
          c.id === colorId
            ? { ...c, sizes: c.sizes.includes(size) ? c.sizes : [...c.sizes, size] }
            : c
        ),
      }));

      e.target.value = "";
    }
  };

  const removeSizeFromColor = (colorId, size) => {
    const color = product.colors.find((c) => c.id === colorId);
    const colorName = color?.name;
    const key = `${colorName}-${size}`;

    setProduct((p) => ({
      ...p,
      colors: p.colors.map((c) =>
        c.id === colorId ? { ...c, sizes: c.sizes.filter((s) => s !== size) } : c
      ),
      variants: p.variants.filter((v) => !(v.color === colorName && v.size === size)),
    }));

    setVariantImages((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });

    processedCombos.current.delete(key);
  };

  // === ADD VARIANT FOR ENTIRE COLOR ===
  const addVariantsForColor = (colorId) => {
    const color = product.colors.find((c) => c.id === colorId);
    if (!color || !color.name || color.sizes.length === 0) return;

    color.sizes.forEach((size) => {
      const key = `${color.name}-${size}`;
      if (processedCombos.current.has(key)) return;

      const exists = product.variants.some((v) => v.color === color.name && v.size === size);
      if (!exists) {
        setProduct((p) => ({
          ...p,
          variants: [
            ...p.variants,
            {
              color: color.name,
              size,
              variantKey: key,
              price: 0,
              compareAtPrice: 0,
              sku: "",
              inventoryQty: 0,
            },
          ],
        }));
        processedCombos.current.add(key);
      }
    });
  };

  // === VARIANT UPDATE ===
  const updateVariant = (color, size, field, value) => {
    setProduct((p) => ({
      ...p,
      variants: p.variants.map((v) =>
        v.color === color && v.size === size
          ? {
              ...v,
              [field]:
                field === "price" || field === "compareAtPrice"
                  ? parseFloat(value) || 0
                  : field === "inventoryQty"
                    ? parseInt(value) || 0
                    : value,
            }
          : v
      ),
    }));
  };

  // === SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title?.trim()) return alert("Title is required");
    if (product.colors.some((c) => !c.name?.trim())) return alert("All colors must have a name");

    setLoading(true);
    const formData = new FormData();

    const payload = {
      ...product,
      images: [],
      variantImages: [],
      colors: product.colors.map((c) => ({
        id: c.id,
        name: c.name,
        hex: c.hex,
        sizes: c.sizes,
      })),
    };
    formData.append("data", JSON.stringify(payload));

    images.forEach((file) => formData.append("general", file));
    Object.entries(variantImages).forEach(([variantKey, files]) => {
      files.forEach((file) => formData.append(`variant-${variantKey}`, file));
    });

    try {
      await axios.post(`${API_BASE}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product created successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-800 mb-8">Add New Product</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">

          {/* Title & Handle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-red-700 mb-2">Title *</label>
              <input id="title" type="text" name="title" value={product.title} onChange={handleChange} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="handle" className="block text-sm font-bold text-red-700 mb-2">Handle</label>
              <input id="handle" type="text" name="handle" value={product.handle} onChange={handleChange} className="w-full p-3 border-2 border-gray-300 rounded-xl bg-gray-50" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-red-700 mb-2">Description</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange} rows={6} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none" placeholder="Enter product description..." />
          </div>

          {/* Vendor & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vendor" className="block text-sm font-bold text-red-700 mb-2">Vendor</label>
              <input id="vendor" type="text" name="vendor" value={product.vendor} onChange={handleChange} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="productCategory" className="block text-sm font-bold text-red-700 mb-2">Category</label>
              <select id="productCategory" name="productCategory" value={product.productCategory} onChange={handleChange} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Type & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-bold text-red-700 mb-2">Type</label>
              <input id="type" type="text" name="type" value={product.type} onChange={handleChange} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="tags-input" className="block text-sm font-bold text-red-700 mb-2">Tags (Press Enter)</label>
              <input id="tags-input" type="text" onKeyDown={handleTagKeyDown} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none" placeholder="e.g., Halloween, Skeleton" />
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {tag}
                    <X className="w-4 h-4 cursor-pointer" onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Published & Gift Card */}
          <div className="flex gap-6">
            <label htmlFor="published" className="flex items-center gap-2 cursor-pointer">
              <input id="published" type="checkbox" name="published" checked={product.published} onChange={handleChange} className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
              <span className="font-medium">Published</span>
            </label>
            <label htmlFor="giftCard" className="flex items-center gap-2 cursor-pointer">
              <input id="giftCard" type="checkbox" name="giftCard" checked={product.giftCard} onChange={handleChange} className="w-5 h-5 text-red-600 rounded focus:ring-red-500" />
              <span className="font-medium">Gift Card</span>
            </label>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-800">SEO</h3>
            <div>
              <label htmlFor="seo-title" className="block text-sm font-bold text-red-700 mb-2">SEO Title</label>
              <input id="seo-title" type="text" name="title" placeholder="SEO Title" value={product.seo.title} onChange={handleSeoChange} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="seo-description" className="block text-sm font-bold text-red-700 mb-2">SEO Description</label>
              <textarea id="seo-description" name="description" placeholder="SEO Description" value={product.seo.description} onChange={handleSeoChange} rows={3} className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none" />
            </div>
          </div>

          {/* General Images */}
          <div>
            <label htmlFor="general-images" className="block text-sm font-bold text-red-700 mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-red-400 transition">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
                  if (files.length) setImages((prev) => [...prev, ...files]);
                }}
                className="hidden"
                id="general-images"
              />
              <label htmlFor="general-images" className="text-red-600 font-medium hover:underline cursor-pointer">
                Click to upload
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {images.map((file, i) => (
                <div key={`${file.name}-${i}`} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-32 object-cover rounded-lg shadow" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* === COLORS + SIZES + VARIANT IMAGES + ADD VARIANT BUTTON === */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-red-700">Colors & Sizes</label>
              <button type="button" onClick={addColor} className="text-red-600 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Color
              </button>
            </div>

            {product.colors.map((color) => {
              const hasName = color.name?.trim();
              const hasSizes = color.sizes.length > 0;

              // HAR SIZE KE LIYE IMAGE HONA CHAHIYE
              const hasImages = color.sizes.every(size =>
                variantImages[`${color.name}-${size}`]?.length > 0
              );

              const canAddVariant = hasName && hasSizes && hasImages;

              return (
                <div key={color.id} className="mb-8 p-5 border rounded-xl bg-gray-50">
                  {/* Color Name & Hex */}
                  <div className="flex gap-3 items-center mb-4">
                    <div className="flex-1">
                      <label htmlFor={`color-name-${color.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Color Name
                      </label>
                      <input
                        id={`color-name-${color.id}`}
                        type="text"
                        placeholder="Color name (e.g. Red)"
                        value={color.name}
                        onChange={(e) => updateColor(color.id, "name", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`color-hex-${color.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        id={`color-hex-${color.id}`}
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(color.id, "hex", e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeColor(color.id)}
                      className="text-red-600 self-end"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <label htmlFor={`size-input-${color.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Sizes for <strong>{color.name || "this color"}</strong>
                    </label>
                    <input
                      id={`size-input-${color.id}`}
                      type="text"
                      placeholder="Press Enter to add size (e.g. 8, 10)"
                      onKeyDown={(e) => handleSizeKeyDown(e, color.id)}
                      className="w-full p-2 border rounded-lg focus:border-red-500 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {color.sizes.map((sz) => (
                        <span
                          key={sz}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {sz}
                          <X
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => removeSizeFromColor(color.id, sz)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* === VARIANT IMAGES (per size) === */}
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-red-700 mb-3">Variant Images</h4>
                    {color.sizes.map((size) => {
                      const key = `${color.name}-${size}`;
                      const images = variantImages[key] || [];

                      return (
                        <div key={key} className="mb-4 p-3 border rounded-lg bg-white">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            {color.name} / {size}
                          </p>

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-red-400 transition">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                const files = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
                                if (files.length === 0) return;
                                setVariantImages((prev) => ({
                                  ...prev,
                                  [key]: [...(prev[key] || []), ...files],
                                }));
                              }}
                              className="hidden"
                              id={`variant-images-${key}`}
                            />
                            <label htmlFor={`variant-images-${key}`} className="text-red-600 text-sm font-medium hover:underline cursor-pointer">
                              Upload Images
                            </label>
                          </div>

                          {images.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {images.map((file, i) => (
                                <div key={i} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVariantImages((prev) => ({
                                        ...prev,
                                        [key]: prev[key].filter((_, idx) => idx !== i),
                                      }));
                                    }}
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Variant Button */}
                  {canAddVariant && (
                    <button
                      type="button"
                      onClick={() => addVariantsForColor(color.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition mt-4"
                    >
                      <Package className="w-5 h-5" />
                      Add All Variants for {color.name}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-4">Variants (Color + Size)</h3>
            {product.variants.length === 0 ? (
              <p className="text-gray-500 italic">
                Fill color name, add sizes, upload images for each size, then click <strong>"Add All Variants"</strong> to generate.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.variants.map((v, i) => {
                  const variantImagesList = variantImages[v.variantKey] || [];

                  return (
                    <div key={`${v.color}-${v.size}-${i}`} className="border p-5 rounded-xl shadow-md bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {v.color} / {v.size}
                          </p>
                        </div>
                        <div className="bg-gray-100 text-xs px-2 py-1 rounded">
                          SKU: {v.sku || "—"}
                        </div>
                      </div>

                      {variantImagesList.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 mb-2">Images</p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {variantImagesList.map((file, idx) => (
                              <img
                                key={idx}
                                src={URL.createObjectURL(file)}
                                alt={`${v.color} ${v.size}`}
                                className="w-16 h-16 object-cover rounded-lg border"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                          <input
                            type="number"
                            value={v.price}
                            onChange={(e) => updateVariant(v.color, v.size, "price", e.target.value)}
                            className="w-full p-2 border rounded focus:border-red-500 text-sm"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Compare At</label>
                          <input
                            type="number"
                            value={v.compareAtPrice || ""}
                            onChange={(e) => updateVariant(v.color, v.size, "compareAtPrice", e.target.value)}
                            className="w-full p-2 border rounded focus:border-red-500 text-sm"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">SKU</label>
                          <input
                            type="text"
                            value={v.sku}
                            onChange={(e) => updateVariant(v.color, v.size, "sku", e.target.value)}
                            className="w-full p-2 border rounded focus:border-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                          <input
                            type="number"
                            value={v.inventoryQty}
                            onChange={(e) => updateVariant(v.color, v.size, "inventoryQty", e.target.value)}
                            className="w-full p-2 border rounded focus:border-red-500 text-sm"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* T&C and Box Contents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="termsAndConditions" className="block text-sm font-bold text-red-700 mb-2">Terms & Conditions</label>
              <textarea
                id="termsAndConditions"
                value={product.termsAndConditions}
                onChange={(e) => setProduct((p) => ({ ...p, termsAndConditions: e.target.value }))}
                rows={5}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none"
                placeholder="Enter terms and conditions..."
              />
            </div>
            <div>
              <label htmlFor="boxContents" className="block text-sm font-bold text-red-700 mb-2">Box Contents</label>
              <textarea
                id="boxContents"
                value={product.boxContents}
                onChange={(e) => setProduct((p) => ({ ...p, boxContents: e.target.value }))}
                rows={5}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none"
                placeholder="Enter box contents..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;