import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productApi from "../services/productApi";
import ProductCard from '../components/ProductCard';
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
      <div className="mx-auto max-w-7xl px-4 py-8">

      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        All Products
      </h1>

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try searching for something else.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 py-10">

        <button
          onClick={() =>
            setSearchParams({ page: currentPage - 1 })
          }
          disabled={currentPage === 1}
          className="cursor-pointer rounded-lg border px-4 py-2 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-current"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setSearchParams({ page: currentPage + 1 })
          }
          disabled={currentPage === totalPages}
          className="cursor-pointer rounded-lg border px-4 py-2 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-current"
        >
          Next
        </button>

      </div>
    </div>

    </>
  );
}

export default Product;
