import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Eye, Plus, Store, IndianRupee, Info, FileText, Tag, Layers, Tags, Image, Package, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(25);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://apisurprise.dodunsoftsolutions.com/api/products/all');
                setProducts(response.data?.products);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle products per page change
    const handlePerPageChange = (e) => {
        setProductsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle View action
    const handleView = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Handle Delete action (placeholder)
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`https://apisurprise.dodunsoftsolutions.com/api/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    // Handle Edit action (placeholder)
    const handleEdit = (id) => {
        alert(`Edit product with ID: ${id}`);
        // Replace with navigation to edit page or form, e.g., <Link to={`/products/edit/${id}`} />
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return <div className="text-center text-gray-600 py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            {/* Header with Add Product Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <label className="mr-2 text-gray-700 font-medium">Show:</label>
                    <select
                        value={productsPerPage}
                        onChange={handlePerPageChange}
                        className="border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className="ml-2 text-gray-700 font-medium">products per page</span>
                </div>
                <Link
                    to="/add-product"
                    className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-green-600 transition shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add Product
                </Link>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border border-gray-200 bg-white">
                    <thead className="bg-gradient-to-r from-yellow-400 to-red-500 text-white">
                        <tr>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Title</th>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Vendor</th>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Price</th>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Status</th>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Published</th>
                            <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr
                                key={product._id}
                                className={`hover:bg-gray-100 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    }`}
                            >
                                <td className="border border-gray-200 px-6 py-4">{product.title}</td>
                                <td className="border border-gray-200 px-6 py-4">{product.vendor || 'N/A'}</td>
                                <td className="border border-gray-200 px-6 py-4">
                                    {product.variants && product.variants.length > 0
                                        ? `₹${product.variants[0].price || 0}`
                                        : 'N/A'}
                                </td>
                                <td className="border border-gray-200 px-6 py-4 capitalize">{product.status}</td>
                                <td className="border border-gray-200 px-6 py-4">
                                    {product.published ? 'Yes' : 'No'}
                                </td>
                                <td className="border border-gray-200 px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleView(product)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="View"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        {/* <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-lg shadow-sm transition ${currentPage === page
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Modal for View Product Details */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 border border-yellow-400/30">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-t-2xl -mx-8 -mt-8 px-8 py-5 shadow-md">
                            <h2 className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">
                                {selectedProduct.title}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-yellow-200 transition transform hover:scale-110"
                                title="Close"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {[
                                    { icon: <Store size={20} />, label: "Vendor", value: selectedProduct.vendor },
                                    { icon: <IndianRupee size={20} />, label: "Price", value: selectedProduct.variants?.[0]?.price ? `₹${selectedProduct.variants[0].price}` : "N/A" },
                                    { icon: <Info size={20} />, label: "Status", value: selectedProduct.status },
                                    { icon: <Eye size={20} />, label: "Published", value: selectedProduct.published ? "Yes" : "No" },
                                    { icon: <FileText size={20} />, label: "Description", value: selectedProduct.description },
                                    { icon: <Tag size={20} />, label: "Category", value: selectedProduct.productCategory },
                                    { icon: <Layers size={20} />, label: "Type", value: selectedProduct.type },
                                    { icon: <Tags size={20} />, label: "Tags", value: selectedProduct.tags?.join(", ") },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">{item.icon}</span>
                                        <div>
                                            <strong className="text-gray-700 font-semibold">{item.label}:</strong>{" "}
                                            <span
                                                className={`text-gray-900 ${item.label === "Status"
                                                        ? selectedProduct.status === "active"
                                                            ? "text-green-600"
                                                            : selectedProduct.status === "draft"
                                                                ? "text-yellow-600"
                                                                : "text-red-600"
                                                        : ""
                                                    }`}
                                            >
                                                {item.value || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-5">
                                {/* Images */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-red-500"><Image size={20} /></span>
                                        <strong className="text-gray-700 font-semibold">Images:</strong>
                                    </div>
                                    {selectedProduct.images?.length > 0 ? (
                                        <div className="flex gap-3 flex-wrap">
                                            {selectedProduct.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img.src}
                                                    alt={img.altText || "Product Image"}
                                                    className="w-36 h-36 object-cover rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-900">N/A</span>
                                    )}
                                </div>

                                {/* Variants */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-red-500"><Package size={20} /></span>
                                        <strong className="text-gray-700 font-semibold">Variants:</strong>
                                    </div>
                                    {selectedProduct.variants?.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                                                <thead className="bg-gradient-to-r from-yellow-400 to-red-500 text-white">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-sm font-semibold">SKU</th>
                                                        <th className="px-4 py-2 text-left text-sm font-semibold">Price</th>
                                                        <th className="px-4 py-2 text-left text-sm font-semibold">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {selectedProduct.variants.map((variant, idx) => (
                                                        <tr
                                                            key={idx}
                                                            className="border-t hover:bg-yellow-50 transition-colors"
                                                        >
                                                            <td className="px-4 py-2 text-gray-900">{variant.sku || "N/A"}</td>
                                                            <td className="px-4 py-2 text-gray-900">₹{variant.price || 0}</td>
                                                            <td className="px-4 py-2 text-gray-900">{variant.inventoryQty || 0}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <span className="text-gray-900">N/A</span>
                                    )}
                                </div>

                                {/* SEO */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-red-500"><Globe size={20} /></span>
                                        <strong className="text-gray-700 font-semibold">SEO:</strong>
                                    </div>
                                    <div className="ml-6 space-y-2">
                                        <div>
                                            <strong className="text-gray-700 font-semibold">Title:</strong>{" "}
                                            <span className="text-gray-900">{selectedProduct.seo?.title || "N/A"}</span>
                                        </div>
                                        <div>
                                            <strong className="text-gray-700 font-semibold">Description:</strong>{" "}
                                            <span className="text-gray-900">{selectedProduct.seo?.description || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-red-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductTable;