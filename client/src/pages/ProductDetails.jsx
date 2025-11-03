import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  ArrowLeft,
  Star,
  Plus,
  Minus,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FileText, Gift, Scale, Tags } from "lucide-react";

const API_BASE = "http://localhost:5005";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const galleryRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Original");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // --------------------------------------------------------------
  // 1. FETCH + NORMALISE
  // --------------------------------------------------------------
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);

        // GENERAL IMAGES
        const general = (data.images || []).map((img) => ({
          src: img.src?.startsWith("http") ? img.src : `${API_BASE}${img.src}`,
          alt: img.altText || data.title,
        }));

        // COLOR IMAGES (legacy fallback)
        const colourMap = {};
        (data.colorImages || []).forEach((ci) => {
          const name = ci.color;
          if (!name) return;
          colourMap[name] = (ci.images || []).map((img) => ({
            src: img.src?.startsWith("http") ? img.src : `${API_BASE}${img.src}`,
            alt: `${data.title} – ${name}`,
          }));
        });

        // VARIANT IMAGES (NEW: color-size combo) → e.g., "Red-8"
        const variantImageMap = {};
        (data.variantImages || []).forEach((vi) => {
          const key = vi.variant; // "Red-8"
          if (!key) return;
          variantImageMap[key] = (vi.images || []).map((img) => ({
            src: img.src?.startsWith("http") ? img.src : `${API_BASE}${img.src}`,
            alt: `${data.title} – ${key}`,
          }));
        });

        // VARIANT MAP (color → size → variant)
        const vMap = {};
        (data.variants || []).forEach((v) => {
          const c = v.color || v.option1;
          const s = v.size || v.option2;
          if (c && s) {
            if (!vMap[c]) vMap[c] = {};
            vMap[c][s] = v;
          }
        });

        const enriched = {
          ...data,
          _generalImages: general,
          _colourImages: colourMap,
          _variantImageMap: variantImageMap,
          _variantMap: vMap,
        };

        setProduct(enriched);

        // Auto-select first color & size
        const colours = Object.keys(vMap);
        if (colours.length) {
          const firstC = colours[0];
          setSelectedColor(firstC);
          const sizes = Object.keys(vMap[firstC]);
          if (sizes.length) setSelectedSize(sizes[0]);
        } else {
          setSelectedColor("Original");
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to load product");
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  // --------------------------------------------------------------
  // 2. HELPERS
  // --------------------------------------------------------------
  const hasColourVariants =
    product && product._variantMap && Object.keys(product._variantMap).length > 0;

  // Current variant key: "Red-8"
  const currentVariantKey = hasColourVariants && selectedColor !== "Original" && selectedSize
    ? `${selectedColor}-${selectedSize}`
    : null;

  // Current variant data
  let currentVariant = {};
  if (currentVariantKey && product?._variantMap[selectedColor]?.[selectedSize]) {
    currentVariant = product._variantMap[selectedColor][selectedSize];
  } else if (product?.variants?.length) {
    currentVariant = product.variants[0];
  }

  const price = currentVariant?.price ?? 0;
  const compare = currentVariant?.compareAtPrice ?? 0;
  const discount =
    compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
  const inStock = (currentVariant?.inventoryQty ?? 0) > 0;

  // GALLERY IMAGES — PRIORITY: Variant → Color → General
  const variantSpecificImages = currentVariantKey ? product?._variantImageMap[currentVariantKey] || [] : [];
  const colorImages = selectedColor !== "Original" ? product?._colourImages[selectedColor] || [] : [];
  const generalImages = product?._generalImages || [];

  const galleryImages = currentVariantKey
    ? [...variantSpecificImages, ...generalImages]  // 1. Variant images
    : selectedColor === "Original"
      ? generalImages
      : [...colorImages, ...generalImages]; // 2. Color → 3. General

  // Auto-switch to first variant image when size/color changes
  useEffect(() => {
    if (currentVariantKey && variantSpecificImages.length > 0) {
      setSelectedImageIdx(0); // First variant image
    } else if (selectedColor !== "Original" && colorImages.length > 0) {
      setSelectedImageIdx(generalImages.length); // First color image
    } else {
      setSelectedImageIdx(0); // General
    }
  }, [currentVariantKey, selectedColor, generalImages.length]);

  // --------------------------------------------------------------
  // 3. GALLERY NAVIGATION
  // --------------------------------------------------------------
  const nextImage = () => {
    setSelectedImageIdx((i) => (i + 1) % galleryImages.length);
  };
  const prevImage = () => {
    setSelectedImageIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  // --------------------------------------------------------------
  // 4. CART LOGIC – CORRECT IMAGE PER VARIANT
  // --------------------------------------------------------------
  const addToCart = () => {
    if (!product) return;

    const existing = JSON.parse(localStorage.getItem("surprise_sutra_cart") || "[]");

    // Choose correct image for cart
    let cartImage = product._generalImages[0]?.src || "/placeholder.jpg";

    if (currentVariantKey && product._variantImageMap[currentVariantKey]?.[0]) {
      cartImage = product._variantImageMap[currentVariantKey][0].src;
    } else if (selectedColor !== "Original" && product._colourImages[selectedColor]?.[0]) {
      cartImage = product._colourImages[selectedColor][0].src;
    }

    const item = {
      productId: product._id,
      title: product.title,
      vendor: product.vendor,
      image: cartImage,
      color: selectedColor === "Original" ? null : selectedColor,
      size: selectedSize,
      price,
      compareAtPrice: compare,
      sku: currentVariant.sku || null,
      qty: quantity,
      inventoryQty: currentVariant.inventoryQty || 0,
    };

    const found = existing.find(
      (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
    );

    const newCart = found
      ? existing.map((i) =>
          i.productId === item.productId && i.color === item.color && i.size === item.size
            ? { ...i, qty: i.qty + quantity }
            : i
        )
      : [...existing, item];

    localStorage.setItem("surprise_sutra_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const inc = () => setQuantity((q) => (q < 10 ? q + 1 : 10));

  // --------------------------------------------------------------
  // 5. RENDER
  // --------------------------------------------------------------
  if (loading) return <LoadingSkeleton />;
  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <p className="text-red-700 font-semibold text-lg">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/diy-kits")}
            className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 hover:text-yellow-300 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* LEFT: IMAGE GALLERY */}
              <div className="relative order-1 lg:order-none">
                <div
                  className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden aspect-square cursor-zoom-in"
                  onMouseEnter={() => setZoomed(true)}
                  onMouseLeave={() => setZoomed(false)}
                  onClick={() => setZoomed(!zoomed)}
                >
                  <img
                    src={galleryImages[selectedImageIdx]?.src || "/placeholder.jpg"}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? "scale-150" : "scale-100"}`}
                    loading="eager"
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                      {discount}% OFF
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition" />
                  <ZoomIn className="absolute bottom-4 right-4 w-6 h-6 text-white opacity-0 hover:opacity-100 transition" />
                </div>

                {galleryImages.length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2" ref={galleryRef}>
                      {galleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImageIdx(i)}
                          className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedImageIdx === i
                              ? "border-red-600 shadow-lg ring-2 ring-red-200 ring-offset-2"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                          aria-label={`View image ${i + 1}`}
                        >
                          <img
                            src={img.src}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg lg:hidden"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg lg:hidden"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* RIGHT: PRODUCT INFO */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-6 lg:space-y-8 order-2 lg:order-none">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {product.vendor}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 py-3 border-y border-gray-100">
                  <span className="text-3xl sm:text-4xl font-extrabold text-red-600">
                    ₹{price.toFixed(2)}
                  </span>
                  {compare > price && (
                    <>
                      <span className="text-lg line-through text-gray-400">₹{compare.toFixed(2)}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        Save ₹{(compare - price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Color Selector */}
                {hasColourVariants && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setSelectedColor("Original");
                          setSelectedSize(null);
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                          selectedColor === "Original"
                            ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                            : "border-gray-200 bg-white hover:border-red-300"
                        }`}
                      >
                        <span className="text-sm">Original</span>
                      </button>

                      {Object.keys(product._variantMap).map((c) => {
                        const colObj = product.colors?.find((co) => co.name === c);
                        const hex = colObj?.hex || "#cccccc";
                        const hasVariantImg = product._variantImageMap[`${c}-${Object.keys(product._variantMap[c])[0]}`]?.length > 0;

                        return (
                          <button
                            key={c}
                            onClick={() => {
                              setSelectedColor(c);
                              const sizes = Object.keys(product._variantMap[c]);
                              if (sizes.length) setSelectedSize(sizes[0]);
                            }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                              selectedColor === c
                                ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                                : "border-gray-200 bg-white hover:border-red-300"
                            }`}
                          >
                            <div
                              className="w-5 h-5 rounded-full border border-gray-300 shadow-sm ring-2 ring-offset-1 ring-transparent"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="text-sm">{c}</span>
                            {/* {hasVariantImg && (
                              <span className="ml-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                Photo
                              </span>
                            )} */}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {hasColourVariants &&
                  selectedColor !== "Original" &&
                  product._variantMap[selectedColor] &&
                  Object.keys(product._variantMap[selectedColor]).length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                        Size
                      </label>
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                        {Object.keys(product._variantMap[selectedColor]).map((sz) => {
                          const v = product._variantMap[selectedColor][sz];
                          const ok = (v.inventoryQty || 0) > 0;
                          const hasImg = product._variantImageMap[`${selectedColor}-${sz}`]?.length > 0;
                          return (
                            <button
                              key={sz}
                              disabled={!ok}
                              onClick={() => ok && setSelectedSize(sz)}
                              className={`px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all relative ${
                                selectedSize === sz
                                  ? "border-red-600 bg-red-50 text-red-700"
                                  : ok
                                  ? "border-gray-300 bg-white hover:border-red-300"
                                  : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              {sz}
                              {hasImg && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                      <button onClick={dec} className="p-3 hover:bg-gray-200 transition" aria-label="Decrease quantity">
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="px-6 py-2 font-bold text-lg">{quantity}</span>
                      <button onClick={inc} className="p-3 hover:bg-gray-200 transition" aria-label="Increase quantity">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addToCart}
                    disabled={!inStock}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-red-900 font-bold py-4 rounded-xl uppercase tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={buyNow}
                    disabled={!inStock}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl uppercase tracking-wide shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <Truck className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-bold text-sm">Free Delivery</div>
                      <div className="text-xs text-gray-600">Orders above ₹499</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-bold text-sm">Secure Payment</div>
                      <div className="text-xs text-gray-600">100% Protected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT DETAILS SECTION */}
            {(product.description || product.boxContents || product.termsAndConditions || product.tags?.length > 0) && (
              <div className="mt-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
                <h2 className="text-2xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">
                  Product Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.description && (
                    <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all duration-200">
                      <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-gray-900 border-b pb-2">
                        <FileText className="w-5 h-5 text-red-600" />
                        Description
                      </h3>
                      <div
                        className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </div>
                  )}

                  {product.boxContents && (
                    <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all duration-200">
                      <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-gray-900 border-b pb-2">
                        <Gift className="w-5 h-5 text-red-600" />
                        Box Contains
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{product.boxContents}</p>
                    </div>
                  )}

                  {product.termsAndConditions && (
                    <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all duration-200">
                      <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-gray-900 border-b pb-2">
                        <Scale className="w-5 h-5 text-red-600" />
                        Terms & Conditions
                      </h3>
                      <details className="mt-1">
                        <summary className="text-sm font-semibold text-gray-700 cursor-pointer hover:text-red-600">
                          View Terms
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {product.termsAndConditions}
                        </p>
                      </details>
                    </div>
                  )}

                  {product.tags?.length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all duration-200">
                      <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-gray-900 border-b pb-2">
                        <Tags className="w-5 h-5 text-red-600" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((t, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-12 bg-gray-200 rounded w-64"></div>
            <div className="flex gap-3">
              <div className="flex-1 h-14 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 h-14 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetails;