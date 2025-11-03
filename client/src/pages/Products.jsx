// ProductList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Filter, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedVendors, setSelectedVendors] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 16;

  // Fetch products from backend with filters & pagination
  // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFilteredProducts();
    }, 1500); // wait 500ms after typing stops

    return () => clearTimeout(delay);
  }, [currentPage, searchTerm, priceRange, selectedVendors, selectedCategories, selectedTags]);


  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage,
        limit: PRODUCTS_PER_PAGE,
        search: searchTerm,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });

      selectedVendors.forEach(v => params.append('vendors', v));
      selectedCategories.forEach(c => params.append('categories', c));
      selectedTags.forEach(t => params.append('tags', t));

      const response = await axios.get(`http://localhost:5005/api/products?${params.toString()}`);

      setAllProducts(response.data.products);
      setTotalCount(response.data.total);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  // Extract filter options from current products (for UI)
  const vendors = useMemo(() => {
    return [...new Set(allProducts.map(p => p.vendor).filter(Boolean))];
  }, [allProducts]);

  const categories = useMemo(() => {
    const cats = allProducts
      .map(p => p.productCategory?.split('>')[0]?.trim())
      .filter(Boolean);
    return [...new Set(cats)];
  }, [allProducts]);

  const tags = useMemo(() => {
    const tagSet = new Set();
    allProducts.forEach(p => p.tags?.forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [allProducts]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedVendors, selectedCategories, selectedTags]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {

    const current = JSON.parse(localStorage.getItem("surprise_sutra_cart") || '[]');

    const productToAdd = {
      ...product,
      id: product._id,
      qty: 1,
    };

    const existing = current.find(i => i.id === productToAdd.id);
    if (existing) {
      localStorage.setItem(
        "surprise_sutra_cart",
        JSON.stringify(current.map(i => i.id === productToAdd.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      localStorage.setItem("surprise_sutra_cart", JSON.stringify([...current, productToAdd]));
    }

    window.dispatchEvent(new Event('cartUpdated'));
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedVendors(new Set());
    setSelectedCategories(new Set());
    setSelectedTags(new Set());
    setPriceRange([0, 100000]);
    setCurrentPage(1);
  };

  const activeFilters = selectedVendors.size + selectedCategories.size + selectedTags.size + (searchTerm ? 1 : 0);

  const indexOfFirstProduct = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const indexOfLastProduct = Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <p className="text-red-700 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shop Our Collection</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm bg-yellow-400 text-red-800 px-3 py-1 rounded-full font-bold">
                {totalCount} Products
              </span>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm bg-white text-red-700 px-3 py-1 rounded-full font-medium hover:bg-red-50 transition"
                >
                  Clear Filters ({activeFilters})
                </button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition"
              />
            </div>
          </div>
        </div>
      </header>

      <div className=" mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-black/50' : 'hidden'} lg:relative lg:block lg:w-72`}>
            <div className={`${showMobileFilters ? 'fixed left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto' : 'hidden'} lg:block`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-red-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Vendor Filter */}
              {vendors.length > 0 && (
                <FilterSection title="Vendors" items={vendors} selected={selectedVendors} setSelected={setSelectedVendors} />
              )}

              {/* Category Filter */}
              {categories.length > 0 && (
                <FilterSection title="Categories" items={categories} selected={selectedCategories} setSelected={setSelectedCategories} />
              )}

              {/* Tags Filter */}
              {tags.length > 0 && (
                <FilterSection title="Tags" items={tags} selected={selectedTags} setSelected={setSelectedTags} />
              )}
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl z-40 hover:bg-red-700 transition"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Showing Info */}
            <div className="flex justify-end items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstProduct}-{indexOfLastProduct} of {totalCount}
              </div>
            </div>

            {allProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allProducts.map(product => {
                    const mainImage =
                      product.images?.[0]?.src
                        ? product.images[0].src.startsWith('http')
                          ? product.images[0].src // ✅ already a full URL
                          : `http://localhost:5005${product.images[0].src}`
                        : 'http://localhost:5005/default-image.jpg'; // ✅ fallback image


                    const defaultVariant = product.variants?.[0] || {};
                    const price = defaultVariant.price || 0;
                    const comparePrice = defaultVariant.compareAtPrice;

                    return (
                      <div
                        key={product._id}
                        onClick={() => navigate(`/productdetails/${product._id}`)}
                        className="bg-white cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-400 group"
                      >
                        <div className="h-80 overflow-hidden bg-gray-50 relative">
                          <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-bold text-lg text-red-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {product.title}
                          </h3>

                          <p className="text-sm text-orange-700 font-medium">
                            {product.vendor || 'Premium Brand'}
                          </p>

                          <div className="flex items-center gap-2">
                            {comparePrice ? (
                              <>
                                <span className="text-2xl font-bold text-red-600">₹{price}</span>
                                <span className="text-sm text-gray-500 line-through">₹{comparePrice}</span>
                              </>
                            ) : (
                              <span className="text-2xl font-bold text-red-600">₹{price}</span>
                            )}
                          </div>

                          {product.variants.length > 1 && (
                            <select className="w-full px-3 py-2 text-sm border border-orange-200 rounded-lg bg-yellow-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                              {product.variants.map((v, i) => (
                                <option key={i} value={v.sku}>
                                  {v.option1Value || v.sku} - ₹{v.price}
                                </option>
                              ))}
                            </select>
                          )}

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-800 font-bold py-3 px-4 rounded-lg uppercase tracking-wide text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                buyNow(product);
                              }}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wide text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === pageNumber
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <span key={pageNumber} className="px-2 py-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Reusable Filter Section
const FilterSection = ({ title, items, selected, setSelected }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleItem = (item) => {
    const newSet = new Set(selected);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setSelected(newSet);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex justify-between items-center font-semibold text-gray-800 mb-3 hover:text-red-600 transition"
      >
        {title}
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {expanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map(item => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.has(item)}
                onChange={() => toggleItem(item)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-gray-200 rounded-xl w-64 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
            <div className="h-80 bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProductList;