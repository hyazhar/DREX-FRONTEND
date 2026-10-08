import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productApi from "../services/productApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productApi.getdata(currentPage);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to load products.Please Try Again");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error}></ErrorMessage>;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50 p-6">
              {/* Featured Badge */}
              {product.isFeatured && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 shadow-sm">
                  Featured
                </span>
              )}

              {/* Product Image */}
              <div className="text-gray-400">No Image</div>
            </div>

            {/* Product Details */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-blue-600">
                  {product.category?.name}
                </span>

                <span className="text-xs text-gray-400">
                  {product.subCategory}
                </span>
              </div>

              {/* Product Brand */}
              <p className="text-sm text-gray-500">{product.brand}</p>

              {/* Product Name */}
              <h2 className="mt-1 line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-gray-800 transition-colors group-hover:text-blue-600">
                {product.name}
              </h2>

              {/* Price + Button */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
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
      <div className="flex items-center justify-center gap-4 py-10">
  <button
    onClick={() => setSearchParams({ page: currentPage - 1 })}
    disabled={currentPage === 1}
    className="cursor-pointer rounded-lg border px-4 py-2 transition hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
  >
    Previous
  </button>

  <span className="font-medium">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setSearchParams({ page: currentPage + 1 })}
    disabled={currentPage === totalPages}
    className="cursor-pointer rounded-lg border px-4 py-2 transition hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
  >
    Next
  </button>
</div>
    </>
  );
}

export default Product;
