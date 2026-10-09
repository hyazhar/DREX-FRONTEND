import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

function ProductCard({ product }) {
  const outOfStock = product.stock <= 0;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        className="relative flex h-64 items-center justify-center bg-gray-50"
      >
        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}

        {/* Product Image Placeholder */}
        <div className="text-center text-gray-400">
          <div className="text-5xl">🏏</div>
          <p className="mt-2 text-sm">
            Product Image
          </p>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm font-medium capitalize text-blue-600">
          {product.category?.name}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <p className="mt-1 text-sm text-gray-500">
            {product.brand}
          </p>
        )}

        {/* Price */}
        <p className="mt-3 text-xl font-bold text-gray-900">
          ₹{product.price?.toLocaleString("en-IN")}
        </p>

        {/* Stock */}
        <div className="mt-2">
          {outOfStock ? (
            <p className="text-sm font-medium text-red-600">
              Out of Stock
            </p>
          ) : product.stock <= 5 ? (
            <p className="text-sm font-medium text-orange-500">
              Only {product.stock} left
            </p>
          ) : (
            <p className="text-sm font-medium text-green-600">
              In Stock
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">

          <button
            disabled={outOfStock}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={18} />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            className="cursor-pointer rounded-lg border p-2.5 text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 active:scale-95"
          >
            <Heart size={19} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;