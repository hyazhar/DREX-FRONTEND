import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productApi from "../services/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  function handleCategorySelect(categoryId) {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategory === categoryId) {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }
    newParams.delete("page");
    setSearchParams(newParams);
  }

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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await productApi.getCategories();
        const categoryData =
          data.categories ?? data.data?.categories ?? data.data ?? [];

        if (!Array.isArray(categoryData)) {
          throw new Error("Invalid categories response");
        }

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error}></ErrorMessage>;
  }

  return (
    <>
      {/* Sticky Category Navigation */}
      <section className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                Shop by Category
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Find the right gear for your game.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 sm:text-sm">
              {categories.length} Categories
            </span>
          </div>

          {/* Category Buttons */}
          {categoryLoading ? (
            <p className="py-3 text-sm text-gray-500">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="py-3 text-sm text-gray-500">
              No categories available.
            </p>
          ) : (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => handleCategorySelect("")}
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  !selectedCategory
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategorySelect(category._id)}
                  className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    selectedCategory === category._id
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Product Heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                DREX Sports Store
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                All Products
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Discover quality sports gear for your next game.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
              <p className="text-sm text-gray-500">
                Page{" "}
                <span className="font-bold text-gray-900">{currentPage}</span>{" "}
                of <span className="font-bold text-gray-900">{totalPages}</span>
              </p>
            </div>
          </div>

          {/* Product Grid / Empty State */}
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                🛍️
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                We couldn't find any products here. Try another category or
                check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:px-6">
              <p className="text-sm text-gray-500">
                Page{" "}
                <span className="font-bold text-gray-900">{currentPage}</span>{" "}
                of <span className="font-bold text-gray-900">{totalPages}</span>
              </p>

              <div className="flex items-center gap-3">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSearchParams({ page: String(currentPage - 1) })
                  }
                  disabled={currentPage === 1}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700"
                >
                  <span aria-hidden="true">←</span>
                  Previous
                </button>

                {/* Current Page */}
                <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold text-white shadow-sm">
                  {currentPage}
                </span>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSearchParams({ page: String(currentPage + 1) })
                  }
                  disabled={currentPage >= totalPages}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700"
                >
                  Next
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Product;
