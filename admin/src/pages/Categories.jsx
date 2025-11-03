import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Search, Plus, Edit2, Trash2, X, Check, Eye } from "lucide-react";

const API_BASE = "http://localhost:5005/api";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");

  const [newCategory, setNewCategory] = useState({
    name: "",
    products: [],
  });

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/category`);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/all`);
      setProducts(res.data?.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentCategoryId(null);
    setNewCategory({ name: "", products: [] });
    setSearchProduct("");
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = async (category) => {
    setIsEdit(true);
    setCurrentCategoryId(category._id);
    setNewCategory({
      name: category.name,
      products: category.products.map(p => p._id),
    });
    setSearchProduct("");
    setShowModal(true);
  };

  // Open View Modal
  const openViewModal = (category) => {
    setViewCategory(category);
    setShowViewModal(true);
  };

  // Handle input
  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  // Toggle product selection
  const handleProductSelect = (productId) => {
    setNewCategory((prev) => {
      if (prev.products.includes(productId)) {
        return { ...prev, products: prev.products.filter(id => id !== productId) };
      } else {
        return { ...prev, products: [...prev.products, productId] };
      }
    });
  };

  // Submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const url = isEdit
        ? `${API_BASE}/category/${currentCategoryId}`
        : `${API_BASE}/category`;

      const method = isEdit ? axios.put : axios.post;

      const res = await method(url, newCategory);

      alert(res.data.message || `Category ${isEdit ? "updated" : "created"} successfully!`);
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || `Error ${isEdit ? "updating" : "creating"} category`);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${API_BASE}/category/${id}`);
      alert("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting category");
    }
  };

  // Filtered + Sorted Products: Selected at top
  const sortedProducts = useMemo(() => {
    const selected = products.filter(p => newCategory.products.includes(p._id));
    const unselected = products.filter(p => !newCategory.products.includes(p._id));

    const filteredSelected = selected.filter(p =>
      p.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
    const filteredUnselected = unselected.filter(p =>
      p.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return [...filteredSelected, ...filteredUnselected];
  }, [products, newCategory.products, searchProduct]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-red-800">Category Management</h2>
          <button
            onClick={openAddModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Loading */}
        {loading && !showModal && !showViewModal ? (
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          /* Table */
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="p-4 text-left font-bold text-red-800">#</th>
                  <th className="p-4 text-left font-bold text-red-800">Category Name</th>
                  <th className="p-4 text-left font-bold text-red-800">Products</th>
                  <th className="p-4 text-center font-bold text-red-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat, i) => (
                    <tr
                      key={cat._id}
                      className="border-t border-gray-200 hover:bg-red-50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-700">{i + 1}</td>
                      <td className="p-4 font-semibold text-red-700">{cat.name}</td>
                      <td className="p-4">
                        <button
                          onClick={() => openViewModal(cat)}
                          className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition"
                        >
                          <Eye className="w-4 h-4" />
                          View Products ({cat.products?.length || 0})
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openEditModal(cat)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-500">
                      <p className="text-lg">No categories found</p>
                      <p className="text-sm mt-2">Click "Add Category" to create one.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* === VIEW PRODUCTS MODAL === */}
      {showViewModal && viewCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-red-800">
                Products in <span className="text-red-600">"{viewCategory.name}"</span>
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {viewCategory.products && viewCategory.products.length > 0 ? (
                viewCategory.products.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    {p.images?.[0]?.src ? (
                      <img
                        src={p.images[0].src}
                        alt={p.title}
                        className="w-16 h-16 rounded-lg object-cover shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">No img</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{p.title}</p>
                      <p className="text-sm text-gray-600">₹{p.variants?.[0]?.price || 'N/A'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No products in this category</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === ADD / EDIT MODAL === */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-red-800">
                {isEdit ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-bold text-red-700 mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Collection"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>

              {/* Search Products */}
              <div>
                <label className="block text-sm font-bold text-red-700 mb-2">
                  Search & Select Products
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                <div className="border-2 border-gray-300 rounded-xl p-4 max-h-80 overflow-y-auto bg-gray-50">
                  {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sortedProducts.map((p) => {
                        const isSelected = newCategory.products.includes(p._id);
                        return (
                          <label
                            key={p._id}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                              isSelected
                                ? "bg-red-100 border-red-500"
                                : "bg-white border-gray-300 hover:border-red-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleProductSelect(p._id)}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3 flex-1">
                              {p.images?.[0]?.src ? (
                                <img
                                  src={p.images[0].src}
                                  alt={p.title}
                                  className="w-12 h-12 rounded-lg object-cover shadow"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <span className="text-xs text-gray-500">No img</span>
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm truncate">
                                  {p.title}
                                </p>
                                <p className="text-xs text-gray-500">₹{p.variants?.[0]?.price || 'N/A'}</p>
                              </div>
                              {isSelected && <Check className="w-5 h-5 text-red-600" />}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      {searchProduct ? "No products found" : "No products available"}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      {isEdit ? "Update" : "Create"} Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;