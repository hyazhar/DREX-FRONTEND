import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  House,
  Music2,
  Smartphone,
  Package,
  Layers3,
  SlidersHorizontal,
} from "lucide-react";

import productApi from "../services/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const selectedCategory = searchParams.get("category") || "";
  const selectedSubCategory = searchParams.get("subCategory") || "";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // The current API response exposes subCategory on products, so use those
  // values to populate the sidebar until a dedicated subcategory endpoint exists.
  const subCategories = useMemo(
    () => [
      ...new Set(
        products.map((product) => product.subCategory).filter(Boolean),
      ),
    ],
    [products],
  );

  function updateParams(updates = {}, remove = []) {
    const next = new URLSearchParams(searchParams);

    remove.forEach((key) => next.delete(key));
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next);
  }

  function handleCategorySelect(categoryName) {
    const nextCategory = selectedCategory === categoryName ? "" : categoryName;

    updateParams({ category: nextCategory }, ["page", "subCategory"]);
  }

  function handleSubCategorySelect(subCategory) {
    const nextSubCategory =
      selectedSubCategory === subCategory ? "" : subCategory;

    updateParams({ subCategory: nextSubCategory }, ["page"]);
  }

  function handleAllProducts() {
    updateParams({ category: "", subCategory: "" }, ["page"]);
  }

  function toggleCategory(categoryName) {
    setExpandedCategories((previous) => ({
      ...previous,
      [categoryName]: !previous[categoryName],
    }));
  }

  useEffect(() => {
    if (categoryLoading) return undefined;

    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const selectedCategoryData = categories.find(
          (item) => item.name?.toLowerCase() === selectedCategory.toLowerCase(),
        );

        if (selectedCategory && !selectedCategoryData) {
          setProducts([]);
          setTotalPages(1);
          return;
        }

        const data = await productApi.getdata({
          page: currentPage,
          category: selectedCategoryData?._id || "",
          search: searchQuery,
          subCategory: selectedSubCategory,
        });

        if (cancelled) return;

        setProducts(data.products ?? []);
        setTotalPages(Number(data.totalPages) || 1);
      } catch (fetchError) {
        if (cancelled) return;

        console.error("Error fetching products:", fetchError);
        setError("Unable to load products. Please try again.");
        setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    selectedCategory,
    categories,
    categoryLoading,
    searchQuery,
    selectedSubCategory,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const data = await productApi.getCategories();
        const categoryData =
          data.categories ?? data.data?.categories ?? data.data ?? [];

        if (!Array.isArray(categoryData)) {
          throw new Error("Invalid categories response");
        }

        if (!cancelled) setCategories(categoryData);
      } catch (fetchError) {
        console.error("Error fetching categories:", fetchError);
      } finally {
        if (!cancelled) setCategoryLoading(false);
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setExpandedCategories((previous) => ({
        ...previous,
        [selectedCategory]: true,
      }));
    }
  }, [selectedCategory]);

  if (loading && categoryLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const categoryIcon = (name) => {
    const normalized = name.toLowerCase();

    if (normalized.includes("home")) return <House size={15} />;
    if (normalized.includes("music")) return <Music2 size={15} />;
    if (normalized.includes("phone")) return <Smartphone size={15} />;
    if (normalized.includes("storage")) return <Package size={15} />;

    return <Layers3 size={15} />;
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              DREX Sports Store
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Shop Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find the right gear for your next game.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((visible) => !visible)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Categories
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Category sidebar */}
          <aside
            className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-5 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Category</h2>
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
                {categories.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAllProducts}
              className={`mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                !selectedCategory && !selectedSubCategory
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Layers3 size={16} />
              <span className="flex-1">All Products</span>
              {!selectedCategory && !selectedSubCategory && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              )}
            </button>

            <div className="space-y-1">
              {categoryLoading ? (
                <p className="px-3 py-2 text-sm text-gray-400">
                  Loading categories...
                </p>
              ) : categories.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-400">
                  No categories available.
                </p>
              ) : (
                categories.map((category) => {
                  const isSelected = selectedCategory === category.name;
                  const isExpanded =
                    Boolean(expandedCategories[category.name]) || isSelected;

                  return (
                    <div key={category._id || category.name}>
                      <div
                        className={`flex items-center rounded-lg transition ${
                          isSelected
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(category.name)}
                          className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left text-sm"
                        >
                          {categoryIcon(category.name || "")}
                          <span className="flex-1 truncate font-medium">
                            {category.name}
                          </span>
                        </button>

                        <button
                          type="button"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name}`}
                          onClick={() => toggleCategory(category.name)}
                          className="mr-1 rounded p-1.5 hover:bg-white"
                        >
                          {isExpanded ? (
                            <ChevronDown size={15} />
                          ) : (
                            <ChevronRight size={15} />
                          )}
                        </button>
                      </div>

                      {isExpanded && isSelected && subCategories.length > 0 && (
                        <div className="mb-2 ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                          {subCategories.map((subCategory) => (
                            <button
                              key={subCategory}
                              type="button"
                              onClick={() =>
                                handleSubCategorySelect(subCategory)
                              }
                              className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs transition ${
                                selectedSubCategory === subCategory
                                  ? "bg-blue-600 font-semibold text-white"
                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  selectedSubCategory === subCategory
                                    ? "bg-white"
                                    : "bg-gray-300"
                                }`}
                              />
                              {subCategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {selectedSubCategory && (
              <button
                type="button"
                onClick={() => updateParams({ subCategory: "" }, ["page"])}
                className="mt-4 w-full border-t border-gray-100 pt-3 text-left text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear subcategory filter
              </button>
            )}
          </aside>

          {/* Products area */}
          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedSubCategory ||
                    selectedCategory ||
                    (searchQuery ? `Search: ${searchQuery}` : "All Products")}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {loading
                    ? "Loading products..."
                    : `${products.length} products on this page`}
                </p>
              </div>

              {totalPages > 1 && (
                <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {loading ? (
              <div className="rounded-xl border border-gray-200 bg-white py-16">
                <Loader />
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🛍️
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No products found
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Try selecting another category or clearing your filters.
                </p>
                <button
                  type="button"
                  onClick={handleAllProducts}
                  className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-500">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateParams({ page: currentPage - 1 }, [])}
                    disabled={currentPage <= 1}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => updateParams({ page: currentPage + 1 }, [])}
                    disabled={currentPage >= totalPages}
                    className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Product;
