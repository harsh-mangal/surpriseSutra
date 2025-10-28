// ProductList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedVendors, setSelectedVendors] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  // Extract unique values for filters
  const vendors = useMemo(() => [...new Set(products.map(p => p.vendor).filter(Boolean))], [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.productCategory).filter(Boolean))], [products]);
  const tags = useMemo(() => {
    const tagSet = new Set();
    products.forEach(p => p.tags?.forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [products]);

  const minPrice = Math.min(...products.map(p => p.variants?.[0]?.price || 0).filter(p => p > 0));
  const maxPrice = Math.max(...products.map(p => p.variants?.[0]?.price || 0).filter(p => p > 0));

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const variant = product.variants?.[0] || {};
      const price = variant.price || 0;

      // Search
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      // Price
      if (price < priceRange[0] || price > priceRange[1]) return false;

      // Vendor
      if (selectedVendors.size > 0 && !selectedVendors.has(product.vendor)) return false;

      // Category
      if (selectedCategories.size > 0 && !selectedCategories.has(product.productCategory)) return false;

      // Tags
      if (selectedTags.size > 0 && !product.tags?.some(tag => selectedTags.has(tag))) return false;

      return true;
    });
  }, [products, searchTerm, priceRange, selectedVendors, selectedCategories, selectedTags]);

  const addToCart = (productId, variant) => {
    setCart(prev => ({
      ...prev,
      [productId]: { variant, quantity: (prev[productId]?.quantity || 0) + 1 }
    }));
    alert(`Added to cart!`);
  };

  const buyNow = (productId, variant) => {
    addToCart(productId, variant);
    alert('Redirecting to checkout...');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedVendors(new Set());
    setSelectedCategories(new Set());
    setSelectedTags(new Set());
    setPriceRange([minPrice, maxPrice]);
  };

  const activeFilters = selectedVendors.size + selectedCategories.size + selectedTags.size + (searchTerm ? 1 : 0);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shop Our Collection</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm bg-yellow-400 text-red-800 px-3 py-1 rounded-full font-bold">
                {filteredProducts.length} Products
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto px-4 py-8">
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
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Vendor Filter */}
              {vendors.length > 0 && (
                <FilterSection
                  title="Vendors"
                  items={vendors}
                  selected={selectedVendors}
                  setSelected={setSelectedVendors}
                />
              )}

              {/* Category Filter */}
              {categories.length > 0 && (
                <FilterSection
                  title="Categories"
                  items={categories}
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                />
              )}

              {/* Tags Filter */}
              {tags.length > 0 && (
                <FilterSection
                  title="Tags"
                  items={tags}
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => {
                  const mainImage = product.images?.[0]?.src || 'https://via.placeholder.com/400x500';
                  const defaultVariant = product.variants?.[0] || {};
                  const price = defaultVariant.price || 0;
                  const comparePrice = defaultVariant.compareAtPrice;

                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-400 group"
                    >
                      {/* Tall Image */}
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
                          <span className="text-2xl font-bold text-red-600">₹{price}</span>
                          {comparePrice && comparePrice > price && (
                            <span className="text-sm text-gray-500 line-through">₹{comparePrice}</span>
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
                            onClick={() => addToCart(product._id, defaultVariant)}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-800 font-bold py-3 px-4 rounded-lg uppercase tracking-wide text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => buyNow(product._id, defaultVariant)}
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
        {[...Array(8)].map((_, i) => (
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