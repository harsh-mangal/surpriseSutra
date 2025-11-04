// ProductList.jsx — Filters + Sorting fixed, Mobile panel redesigned
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List as ListIcon,
  SlidersHorizontal,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ----------------------------- Config ----------------------------- */
const API_BASE = "http://localhost:5005";
const PRODUCTS_PER_PAGE = 16;

/* --------------------------- Small hooks --------------------------- */
const useDebounced = (val, delay = 400) => {
  const [d, setD] = useState(val);
  useEffect(() => {
    const id = setTimeout(() => setD(val), delay);
    return () => clearTimeout(id);
  }, [val, delay]);
  return d;
};

const useLocalStorage = (key, initial) => {
  const [v, setV] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV];
};

/* ------------------------------- Main ------------------------------ */
const ProductList = () => {
  const navigate = useNavigate();

  // Data
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // UI state
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // View + sort (persistent)
  const [sortBy, setSortBy] = useLocalStorage("ss.sort", "relevance");
  // 'list' | 'grid2' | 'grid3' | 'grid4'
  const [viewMode, setViewMode] = useLocalStorage("ss.view", "grid3");

  // Pagination
  const [page, setPage] = useState(1);

  // Filter options (fetched or derived)
  const [options, setOptions] = useState({ categories: [], tags: [] });

  // Debounced inputs to reduce API spam
  const dSearch = useDebounced(search, 500);
  const dMin = useDebounced(minPrice, 250);
  const dMax = useDebounced(maxPrice, 250);

  /* ----------------------- Fetch filter options ---------------------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Preferred endpoint if your backend supports it:
        // 1) /api/products/filters  2) /api/products/meta
        const tryUrls = [
          `${API_BASE}/api/products/filters`,
          `${API_BASE}/api/products/meta`,
        ];
        let ok = false;
        for (const url of tryUrls) {
          try {
            const { data } = await axios.get(url);
            if (cancelled) return;
            const cats =
              data?.categories ||
              data?.facets?.categories ||
              data?.data?.categories ||
              [];
            const tags =
              data?.tags || data?.facets?.tags || data?.data?.tags || [];
            if (cats.length || tags.length) {
              setOptions({
                categories: [...new Set(cats)].sort(),
                tags: [...new Set(tags)].sort(),
              });
              ok = true;
              break;
            }
          } catch {}
        }
        if (!ok) {
          // Fallback: get a large page and derive
          const { data } = await axios.get(
            `${API_BASE}/api/products?limit=200&page=1`
          );
          if (cancelled) return;
          const cats = new Set();
          const tset = new Set();
          (data?.products || []).forEach((p) => {
            const c = p.productCategory?.split(">")[0]?.trim();
            if (c) cats.add(c);
            (p.tags || []).forEach((t) => t && tset.add(t));
          });
          setOptions({
            categories: Array.from(cats).sort(),
            tags: Array.from(tset).sort(),
          });
        }
      } catch {
        // Silent fail; options just remain empty
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------------- Fetch products ------------------------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page,
          limit: PRODUCTS_PER_PAGE,
          search: dSearch,
          minPrice: dMin,
          maxPrice: dMax,
          sort: sortBy, // send to server first
        });
        [...selectedCategories].forEach((c) => params.append("categories", c));
        [...selectedTags].forEach((t) => params.append("tags", t));

        const url = `${API_BASE}/api/products?${params.toString()}`;
        const { data } = await axios.get(url);

        if (cancelled) return;

        let list = data?.products || [];
        const total = data?.total ?? list.length;
        const pages =
          data?.totalPages ?? Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));

        // Client-side sorting fallback (if server ignores "sort")
        list = sortClient(list, sortBy);

        setItems(list);
        setTotalCount(total);
        setTotalPages(pages);
      } catch (e) {
        setError("Failed to load products. Please try again.");
      } finally {
        if (!cancelled) {
          setLoading(false);
          setInitialLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, dSearch, dMin, dMax, selectedCategories, selectedTags, sortBy]);

  // Reset to page 1 whenever filters change materially
  useEffect(() => {
    setPage(1);
  }, [dSearch, dMin, dMax, selectedCategories, selectedTags, sortBy]);

  /* ----------------------------- Helpers ----------------------------- */
  const activeCount =
    (search ? 1 : 0) +
    (dMin !== 0 || dMax !== 100000 ? 1 : 0) +
    selectedCategories.size +
    selectedTags.size;

  const indexOfFirst = (page - 1) * PRODUCTS_PER_PAGE + 1;
  const indexOfLast = Math.min(page * PRODUCTS_PER_PAGE, totalCount);

  const toggleSet = (set, val, setter) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const clearAll = () => {
    setSearch("");
    setMinPrice(0);
    setMaxPrice(100000);
    setSelectedCategories(new Set());
    setSelectedTags(new Set());
    setSortBy("relevance");
    setPage(1);
  };

  const addToCart = (product) => {
    const key = "surprise_sutra_cart";
    const now = JSON.parse(localStorage.getItem(key) || "[]");
    const id = product._id;
    const match = now.find((i) => i.id === id);
    const next = match
      ? now.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      : [...now, { ...product, id, qty: 1 }];
    localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const buyNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  /* ---------------------------- Render utils ---------------------------- */
  const gridWrapperClasses =
    viewMode === "list"
      ? "space-y-4"
      : viewMode === "grid2"
      ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
      : viewMode === "grid4"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"; // grid3 default

  /* ------------------------------ Returns ------------------------------ */
  if (initialLoading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md text-center">
          <p className="text-red-700 text-lg font-semibold mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Shop Our Collection
              </h1>
              <span className="text-xs md:text-sm bg-yellow-400 text-red-900 px-2.5 py-1 rounded-full font-bold">
                {totalCount} Products
              </span>
            </div>

            {/* Search + Actions */}
            <div className="flex w-full md:w-auto items-center gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition"
                />
                {loading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-white/80" />
                )}
              </div>

              {/* Mobile filters button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-white/30 transition"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="text-sm">Filters</span>
                {activeCount > 0 && (
                  <span className="ml-1 text-xs bg-yellow-400 text-red-900 px-1.5 py-0.5 rounded-full font-bold">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden md:block px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
              </select>

              {/* View Mode */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                <ViewBtn
                  icon={<ListIcon className="w-4 h-4" />}
                  active={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  title="List"
                />
                <ViewBtn
                  label="2×"
                  active={viewMode === "grid2"}
                  onClick={() => setViewMode("grid2")}
                  title="2 per row"
                />
                <ViewBtn
                  label="3×"
                  active={viewMode === "grid3"}
                  onClick={() => setViewMode("grid3")}
                  title="3 per row"
                />
                <ViewBtn
                  label="4×"
                  active={viewMode === "grid4"}
                  onClick={() => setViewMode("grid4")}
                  title="4 per row"
                />
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 border border-white/30">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {(dMin !== 0 || dMax !== 100000) && (
                <Chip
                  label={`₹${dMin} – ₹${dMax}`}
                  onClear={() => {
                    setMinPrice(0);
                    setMaxPrice(100000);
                  }}
                />
              )}
              {search && (
                <Chip
                  label={`Search: ${search}`}
                  onClear={() => setSearch("")}
                />
              )}
              {[...selectedCategories].map((c) => (
                <Chip
                  key={c}
                  label={`Category: ${c}`}
                  onClear={() =>
                    toggleSet(selectedCategories, c, setSelectedCategories)
                  }
                />
              ))}
              {[...selectedTags].map((t) => (
                <Chip
                  key={t}
                  label={`Tag: ${t}`}
                  onClear={() => toggleSet(selectedTags, t, setSelectedTags)}
                />
              ))}
              <button
                onClick={clearAll}
                className="ml-auto text-sm bg-white text-red-700 px-3 py-1.5 rounded-full font-medium hover:bg-red-50 transition inline-flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" /> Clear all
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <FilterPanel
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              categories={options.categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              tags={options.tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>

          {/* Products */}
          <main>
            {/* Mobile top row (sort + density) */}
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white text-sm"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price_asc">Sort: Price Low → High</option>
                <option value="price_desc">Sort: Price High → Low</option>
                <option value="newest">Sort: Newest</option>
                <option value="popular">Sort: Popular</option>
              </select>

              <div className="flex items-center gap-2">
                <ViewBtn
                  icon={<ListIcon className="w-4 h-4" />}
                  compact
                  active={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  title="List"
                />
                <ViewBtn
                  label="2×"
                  compact
                  active={viewMode === "grid2"}
                  onClick={() => setViewMode("grid2")}
                  title="2 per row"
                />
                <ViewBtn
                  label="3×"
                  compact
                  active={viewMode === "grid3"}
                  onClick={() => setViewMode("grid3")}
                  title="3 per row"
                />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-end text-sm text-gray-600 mb-4">
              {totalCount > 0 ? (
                <>
                  Showing {indexOfFirst}-{indexOfLast} of {totalCount}
                </>
              ) : (
                <>No products found</>
              )}
            </div>

            {/* Content */}
            {loading ? (
              <GridSkeleton viewMode={viewMode} />
            ) : items.length === 0 ? (
              <EmptyState onReset={clearAll} />
            ) : viewMode === "list" ? (
              <div className="space-y-4">
                {items.map((p) => (
                  <ProductRow
                    key={p._id}
                    product={p}
                    onAdd={() => addToCart(p)}
                    onBuy={() => buyNow(p)}
                    onOpen={() => navigate(`/productdetails/${p._id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className={gridWrapperClasses}>
                {items.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onAdd={() => addToCart(p)}
                    onBuy={() => buyNow(p)}
                    onOpen={() => navigate(`/productdetails/${p._id}`)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <PageBtn
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  iconLeft={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </PageBtn>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => {
                      if (
                        n === 1 ||
                        n === totalPages ||
                        (n >= page - 1 && n <= page + 1)
                      ) {
                        return (
                          <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                              page === n
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      } else if (n === page - 2 || n === page + 2) {
                        return (
                          <span key={n} className="px-2 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <PageBtn
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  iconRight={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </PageBtn>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer (improved UX) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-red-700">Filters</h2>
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto">
              <FilterPanel
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                categories={options.categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                tags={options.tags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                compact
              />
            </div>

            {/* Footer Actions (sticky) */}
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white z-10">
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------- Subcomponents ---------------------------- */

const ProductCard = ({ product, onAdd, onBuy, onOpen }) => {
  const mainImage = product.images?.[0]?.src
    ? product.images[0].src.startsWith("http")
      ? product.images[0].src
      : `${API_BASE}${product.images[0].src}`
    : `${API_BASE}/default-image.jpg`;

  const v = product.variants?.[0] || {};
  const price = v.price || 0;
  const compare = v.compareAtPrice;

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group"
    >
      <div className="h-56 sm:h-64 md:h-72 overflow-hidden bg-gray-50 relative">
        <img
          loading="lazy"
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          NEW
        </div>
      </div>
      <div className="p-4 sm:p-5 space-y-2">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 group-hover:text-red-700 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          {compare ? (
            <>
              <span className="text-xl sm:text-2xl font-extrabold text-red-600">
                ₹{price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{compare}
              </span>
            </>
          ) : (
            <span className="text-xl sm:text-2xl font-extrabold text-red-600">
              ₹{price}
            </span>
          )}
        </div>

        {product.variants?.length > 1 && (
          <select
            className="w-full mt-1 px-3 py-2 text-sm border border-orange-200 rounded-lg bg-yellow-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={(e) => e.stopPropagation()}
          >
            {product.variants.map((opt, i) => (
              <option key={i} value={opt.sku}>
                {opt.option1Value || opt.sku} - ₹{opt.price}
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold py-2.5 rounded-lg uppercase tracking-wide text-xs sm:text-sm shadow hover:shadow-md transition-all"
          >
            Add
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuy(product);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg uppercase tracking-wide text-xs sm:text-sm shadow hover:shadow-md transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ product, onAdd, onBuy, onOpen }) => {
  const mainImage = product.images?.[0]?.src
    ? product.images[0].src.startsWith("http")
      ? product.images[0].src
      : `${API_BASE}${product.images[0].src}`
    : `${API_BASE}/default-image.jpg`;

  const v = product.variants?.[0] || {};
  const price = v.price || 0;
  const compare = v.compareAtPrice;

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group flex"
    >
      <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gray-50 overflow-hidden">
        <img
          loading="lazy"
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-2 justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-red-700 transition-colors line-clamp-2">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            {compare ? (
              <>
                <span className="text-xl sm:text-2xl font-extrabold text-red-600">
                  ₹{price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{compare}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl font-extrabold text-red-600">
                ₹{price}
              </span>
            )}
          </div>

          {product.variants?.length > 1 && (
            <select
              className="mt-2 w-full max-w-xs px-3 py-2 text-sm border border-orange-200 rounded-lg bg-yellow-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={(e) => e.stopPropagation()}
            >
              {product.variants.map((opt, i) => (
                <option key={i} value={opt.sku}>
                  {opt.option1Value || opt.sku} - ₹{opt.price}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold py-2.5 rounded-lg uppercase tracking-wide text-xs sm:text-sm shadow hover:shadow-md transition-all"
          >
            Add
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuy(product);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg uppercase tracking-wide text-xs sm:text-sm shadow hover:shadow-md transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  categories,
  selectedCategories,
  setSelectedCategories,
  tags,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  compact = false,
}) => {
  // keep min <= max with simple guards
  const clampMin = (v) => setMinPrice(Math.max(0, Math.min(v, maxPrice)));
  const clampMax = (v) => setMaxPrice(Math.min(100000, Math.max(v, minPrice)));

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${
        compact ? "" : "p-5"
      }`}
    >
      {!compact && (
        <h2 className="text-lg font-bold text-red-700 mb-4">Filters</h2>
      )}

      {/* Sort (shows on compact/mobile too) */}
      <div className="mb-6">
        <label className="block text-xs text-gray-500 mb-1">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white text-sm"
        >
          <option value="relevance">Relevance</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Double-ended price slider (two inputs) */}
      <div className="mb-6">
        <label className="block text-xs text-gray-500 mb-2">Price Range</label>

        <div className="px-1">
          <input
            type="range"
            min={0}
            max={100000}
            value={minPrice}
            onChange={(e) => clampMin(parseInt(e.target.value))}
            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <input
            type="range"
            min={0}
            max={100000}
            value={maxPrice}
            onChange={(e) => clampMax(parseInt(e.target.value))}
            className="w-full -mt-2 h-2 bg-transparent appearance-none cursor-pointer accent-red-600"
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">Min</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => clampMin(parseInt(e.target.value || 0))}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">Max</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => clampMax(parseInt(e.target.value || 0))}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <FilterSection
          title="Categories"
          items={categories}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <FilterSection
          title="Tags"
          items={tags}
          selected={selectedTags}
          setSelected={setSelectedTags}
        />
      )}
    </div>
  );
};

const FilterSection = ({ title, items, selected, setSelected }) => {
  const [open, setOpen] = useState(true);
  const toggle = (val) => {
    const next = new Set(selected);
    next.has(val) ? next.delete(val) : next.add(val);
    setSelected(next);
  };

  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex justify-between items-center font-semibold text-gray-800 mb-3 hover:text-red-600 transition"
      >
        {title}
        {open ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {open && (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {items.map((it) => (
            <label key={it} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.has(it)}
                onChange={() => toggle(it)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{it}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const Chip = ({ label, onClear }) => (
  <span className="inline-flex items-center gap-1.5 text-xs bg-white text-red-700 border border-red-200 px-2.5 py-1 rounded-full">
    {label}
    <button onClick={onClear} className="hover:text-red-900">
      <X className="w-3.5 h-3.5" />
    </button>
  </span>
);

const ViewBtn = ({ icon, label, active, onClick, title, compact = false }) => (
  <button
    onClick={onClick}
    title={title}
    className={`${
      compact ? "px-2.5 py-2" : "px-3 py-2"
    } rounded-lg border text-sm flex items-center gap-1 transition ${
      active
        ? "bg-red-600 text-white border-red-600"
        : "bg-white/20 md:bg-white text-white md:text-gray-700 hover:bg-white/30 md:hover:bg-gray-100 border-white/30 md:border-gray-300"
    }`}
  >
    {icon ? icon : label}
  </button>
);

const PageBtn = ({ children, onClick, disabled, iconLeft, iconRight }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
      disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-red-600 text-white hover:bg-red-700"
    }`}
  >
    {iconLeft}
    {children}
    {iconRight}
  </button>
);

const EmptyState = ({ onReset }) => (
  <div className="text-center py-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-red-100">
    <h3 className="text-xl font-bold text-red-700 mb-2">No products found</h3>
    <p className="text-gray-600 mb-4">Try adjusting filters or search terms.</p>
    <button
      onClick={onReset}
      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
    >
      Reset Filters
    </button>
  </div>
);

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="h-11 bg-white/60 backdrop-blur rounded-xl w-72 mb-6 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse"
          >
            <div className="h-56 sm:h-64 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GridSkeleton = ({ viewMode }) => {
  const cls =
    viewMode === "grid4"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      : viewMode === "grid2"
      ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6"
      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6";
  return (
    <div className={cls}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse"
        >
          <div className="h-56 sm:h-64 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------------------------- Client-side sort -------------------------- */
function sortClient(list, sortBy) {
  const copy = [...list];
  switch (sortBy) {
    case "price_asc":
      return copy.sort(
        (a, b) =>
          (a?.variants?.[0]?.price || 0) - (b?.variants?.[0]?.price || 0)
      );
    case "price_desc":
      return copy.sort(
        (a, b) =>
          (b?.variants?.[0]?.price || 0) - (a?.variants?.[0]?.price || 0)
      );
    case "newest":
      return copy.sort(
        (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
      );
    case "popular":
      return copy.sort((a, b) => (b?.popularity || 0) - (a?.popularity || 0));
    default:
      return copy; // relevance (assumed server provides)
  }
}

export default ProductList;
