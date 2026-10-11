import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ArrowLeft,
  Package,
} from "lucide-react";

import productApi from "../services/productApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await productApi.getProductById(id);

        // Supports either API response format.
        const productData = data.product ?? data;

        if (!productData?._id) {
          throw new Error("Product not found");
        }
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Unable to load this product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Reset quantity when product changes.
  useEffect(() => {
    setQuantity(1);
    setSelectedSize("");
    setSelectedColor("");
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <ErrorMessage message={error} />

        <div className="mt-6 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>

        <Link
          to="/products"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const stock = Number(product.stock ?? 0);
  const outOfStock = stock <= 0;

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  const colors = Array.isArray(product.colors) ? product.colors : [];

  const canAddToCart =
    !outOfStock &&
    quantity >= 1 &&
    quantity <= stock &&
    (!sizes.length || Boolean(selectedSize)) &&
    (!colors.length || Boolean(selectedColor));

  function decreaseQuantity() {
    setQuantity((previous) => Math.max(1, previous - 1));
  }

  function increaseQuantity() {
    setQuantity((previous) => Math.min(stock, previous + 1));
  }

  function handleAddToCart() {
    if (!canAddToCart) {
      return;
    }

    // Cart API integration will be implemented in R12.
    alert(
      `R7 UI ready: ${product.name}, quantity ${quantity}. Cart integration comes in R12.`,
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Product Image Area */}
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border bg-gray-50 p-8 sm:min-h-[450px]">
          {product.isFeatured && (
            <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">
              Featured Product
            </span>
          )}

          {/* The current API doesn't provide product images. */}
          <div className="flex flex-col items-center text-center text-gray-400">
            <Package size={90} strokeWidth={1.2} />

            <p className="mt-4 text-sm">Product image will appear here</p>
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          {/* Category */}
          {product.category?.name && (
            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {product.category.name}
            </span>
          )}

          {/* Name */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Brand */}
          {product.brand && (
            <p className="mt-3 text-gray-500">
              Brand:{" "}
              <span className="font-semibold text-gray-800">
                {product.brand}
              </span>
            </p>
          )}

          {/* Price */}
          <p className="mt-6 text-3xl font-bold text-blue-600">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          {/* Stock Status */}
          <div className="mt-5">
            {outOfStock ? (
              <span className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                Out of Stock
              </span>
            ) : stock <= 5 ? (
              <span className="rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700">
                Only {stock} left
              </span>
            ) : (
              <span className="rounded-full bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                In Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-7 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Product Description
            </h2>

            <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Subcategory */}
          {product.subCategory && (
            <p className="mt-5 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Subcategory:</span>{" "}
              {product.subCategory}
            </p>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900">Select Size</h2>

              <div className="mt-3 flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer rounded-lg border px-4 py-2 transition ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900">Select Color</h2>

              <div className="mt-3 flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer rounded-lg border px-4 py-2 transition ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-7">
            <h2 className="font-semibold text-gray-900">Quantity</h2>

            <div className="mt-3 flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || outOfStock}
                aria-label="Decrease quantity"
                className="cursor-pointer p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={18} />
              </button>

              <span className="min-w-12 text-center font-semibold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={outOfStock || quantity >= stock}
                aria-label="Increase quantity"
                className="cursor-pointer p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <ShoppingCart size={20} />

              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              type="button"
              onClick={() => {
                alert("Wishlist integration will be implemented in R13.");
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95"
            >
              <Heart size={20} />
              Wishlist
            </button>
          </div>

          {/* Product Information */}
          <div className="mt-8 rounded-xl bg-gray-50 p-5">
            <h2 className="font-semibold text-gray-900">Product Information</h2>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">Brand:</span>{" "}
                {product.brand || "Not specified"}
              </p>

              <p>
                <span className="font-medium text-gray-800">Category:</span>{" "}
                {product.category?.name || "Not specified"}
              </p>

              <p>
                <span className="font-medium text-gray-800">Availability:</span>{" "}
                {outOfStock ? "Unavailable" : "Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
