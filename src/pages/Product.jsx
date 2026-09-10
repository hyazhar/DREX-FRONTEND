import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productApi from "../services/productApi";
import Loader from "./Loader";
function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productApi.getdata();
        setProducts(data);
      } 
      catch (error) {
        console.error("Error fetching products:", error);
      } 
      finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (

<div className="grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {products.map((product) => (
    <Link
      key={product.id}
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-6">

        {/* Category Badge */}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-gray-700 shadow-sm">
          {product.category}
        </span>

        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
        />

      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <span className="text-sm text-yellow-400">
            ★
          </span>

          <span className="text-sm font-medium text-gray-700">
            {product.rating?.rate || "4.5"}
          </span>

          <span className="text-xs text-gray-400">
            ({product.rating?.count || "100"})
          </span>
        </div>

        {/* Product Title */}
        <h2 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-gray-800 transition-colors group-hover:text-blue-600">
          {product.title}
        </h2>

        {/* Price + Button */}
        <div className="mt-4 flex items-center justify-between">

          <div>
            <p className="text-xl font-bold text-gray-900">
              ${product.price}
            </p>

            <p className="text-xs text-gray-400">
              Inclusive of all taxes
            </p>
          </div>

          {/* Add to Bag */}
          <button
            onClick={(e) => e.preventDefault()}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add to Bag
          </button>

        </div>
      </div>
    </Link>
  ))}
</div>
  );
}

export default Product;
