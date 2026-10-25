import { useEffect, useMemo, useState } from "react";
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
  Search,
  RotateCcw,
} from "lucide-react";

import productApi from "../services/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Product and category data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // Sidebar and pagination
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Read applied filters from the URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedSubCategory = searchParams.get("subCategory") || "";
  const searchQuery = searchParams.get("search") || "";

  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  // Input states for price filters
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

  // Keep price inputs synchronized with URL changes
  useEffect(() => {
    setMinPriceInput(minPrice);
    setMaxPriceInput(maxPrice);
  }, [minPrice, maxPrice]);

  // Get subcategories from the products currently loaded.
  // This uses the existing product API response.
  const subCategories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.subCategory)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [products]);

  // Update URL parameters while preserving existing filters
  function updateParams(updates = {}, remove = []) {
    const next = new URLSearchParams(searchParams);

    remove.forEach((key) => {
      next.delete(key);
    });

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next);
  }

  // Select or deselect a category
  function handleCategorySelect(categoryName) {
    const nextCategory =
      selectedCategory === categoryName ? "" : categoryName;

    updateParams(
      { category: nextCategory },
      ["page", "subCategory"]
    );
  }

  // Select or deselect a subcategory
  function handleSubCategorySelect(subCategory) {
    const nextSubCategory =
      selectedSubCategory === subCategory ? "" : subCategory;

    updateParams(
      { subCategory: nextSubCategory },
      ["page"]
    );
  }

  // Clear every filter and show all products
  function handleAllProducts() {
    setSearchParams({});
    setMinPriceInput("");
    setMaxPriceInput("");
  }

  // Expand or collapse a category in the sidebar
  function toggleCategory(categoryName) {
    setExpandedCategories((previous) => ({
      ...previous,
      [categoryName]: !previous[categoryName],
    }));
  }

  // Validate and apply the price range
  function handlePriceSubmit(event) {
    event.preventDefault();

    const min = minPriceInput.trim();
    const max = maxPriceInput.trim();

    if (
      min !== "" &&
      (!Number.isFinite(Number(min)) || Number(min) < 0)
    ) {
      alert("Please enter a valid minimum price.");
      return;
    }

    if (
      max !== "" &&
      (!Number.isFinite(Number(max)) || Number(max) < 0)
    ) {
      alert("Please enter a valid maximum price.");
      return;
    }

    if (
      min !== "" &&
      max !== "" &&
      Number(min) > Number(max)
    ) {
      alert("Minimum price cannot exceed maximum price.");
      return;
    }

    updateParams(
      {
        minPrice: min,
        maxPrice: max,
      },
      ["page"]
    );
  }

  // Clear only the price filters
  function handleClearPrice() {
    setMinPriceInput("");
    setMaxPriceInput("");

    updateParams(
      {
        minPrice: "",
        maxPrice: "",
      },
      ["page"]
    );
  }

  // Category icons
  function categoryIcon(name) {
    const normalized = name.toLowerCase();

    if (normalized.includes("home")) {
      return <House size={15} />;
    }

    if (normalized.includes("music")) {
      return <Music2 size={15} />;
    }

    if (normalized.includes("phone")) {
      return <Smartphone size={15} />;
    }

    if (normalized.includes("storage")) {
      return <Package size={15} />;
    }

    return <Layers3 size={15} />;
  }

  // Fetch products whenever a filter or page changes
  useEffect(() => {
    if (categoryLoading) return undefined;

    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        // The URL uses category names, but the API expects category IDs.
        const selectedCategoryData = categories.find(
          (item) =>
            item.name?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

        // If the selected category does not exist, show no products.
        if (selectedCategory && !selectedCategoryData) {
          setProducts([]);
          setTotalPages(1);
          return;
        }

        const data = await productApi.getdata({
          page: currentPage,
          limit: 10,
          category: selectedCategoryData?._id || "",
          search: searchQuery,
          subCategory: selectedSubCategory,
          minPrice,
          maxPrice,
          sort,
        });

        if (cancelled) return;

        setProducts(data.products ?? []);
        setTotalPages(Number(data.totalPages) || 1);
      } catch (fetchError) {
        if (cancelled) return;

        console.error("Error fetching products:", fetchError);

        setError("Unable to load products. Please try again.");
        setProducts([]);
        setTotalPages(1);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    selectedCategory,
    selectedSubCategory,
    searchQuery,
    minPrice,
    maxPrice,
    sort,
    categories,
    categoryLoading,
  ]);

  // Fetch categories once when the component mounts
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        setCategoryError("");

        const data = await productApi.getCategories();

        const categoryData =
          data.categories ??
          data.data?.categories ??
          data.data ??
          [];

        if (!Array.isArray(categoryData)) {
          throw new Error("Invalid categories response");
        }

        if (!cancelled) {
          setCategories(categoryData);
        }
      } catch (fetchError) {
        console.error("Error fetching categories:", fetchError);

        if (!cancelled) {
          setCategoryError("Unable to load categories.");
        }
      } finally {
        if (!cancelled) {
          setCategoryLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  // Automatically expand the selected category
  useEffect(() => {
    if (selectedCategory) {
      setExpandedCategories((previous) => ({
        ...previous,
        [selectedCategory]: true,
      }));
    }
  }, [selectedCategory]);

  // Initial loading state
  if (loading && categoryLoading) {
    return <Loader />;
  }

  // Product API error
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <ErrorMessage message={error} />

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mx-auto mt-4 block cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

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

          {/* Mobile category toggle */}
          <button
            type="button"
            onClick={() => setShowFilters((visible) => !visible)}
            aria-expanded={showFilters}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 lg:hidden"
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
              <h2 className="text-base font-bold text-gray-900">
                Category
              </h2>

              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
                {categories.length}
              </span>
            </div>

            {/* All products button */}
            <button
              type="button"
              onClick={handleAllProducts}
              className={`mb-2 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
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

            {/* Category list */}
            <div className="space-y-1">
              {categoryLoading ? (
                <p className="px-3 py-2 text-sm text-gray-400">
                  Loading categories...
                </p>
              ) : categories.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-400">
                  {categoryError || "No categories available."}
                </p>
              ) : (
                categories.map((category) => {
                  const isSelected =
                    selectedCategory === category.name;

                  const isExpanded =
                    Boolean(expandedCategories[category.name]) ||
                    isSelected;

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
                          onClick={() =>
                            handleCategorySelect(category.name)
                          }
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm"
                        >
                          {categoryIcon(category.name || "")}

                          <span className="flex-1 truncate font-medium">
                            {category.name}
                          </span>
                        </button>

                        <button
                          type="button"
                          aria-label={`${
                            isExpanded ? "Collapse" : "Expand"
                          } ${category.name}`}
                          aria-expanded={isExpanded}
                          onClick={() =>
                            toggleCategory(category.name)
                          }
                          className="mr-1 cursor-pointer rounded p-1.5 transition hover:bg-white"
                        >
                          {isExpanded ? (
                            <ChevronDown size={15} />
                          ) : (
                            <ChevronRight size={15} />
                          )}
                        </button>
                      </div>

                      {/* Subcategories */}
                      {isExpanded &&
                        isSelected &&
                        subCategories.length > 0 && (
                          <div className="mb-2 ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            {subCategories.map((subCategory) => (
                              <button
                                key={subCategory}
                                type="button"
                                onClick={() =>
                                  handleSubCategorySelect(subCategory)
                                }
                                className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs transition ${
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

            {/* Clear subcategory */}
            {selectedSubCategory && (
              <button
                type="button"
                onClick={() =>
                  updateParams({ subCategory: "" }, ["page"])
                }
                className="mt-4 w-full cursor-pointer border-t border-gray-100 pt-3 text-left text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear subcategory filter
              </button>
            )}
          </aside>

          {/* Products area */}
          <section className="min-w-0">
            {/* Search summary */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedSubCategory ||
                    selectedCategory ||
                    (searchQuery
                      ? `Search: ${searchQuery}`
                      : "All Products")}
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

            {/* R8.5 and R8.6: Price filters and sorting */}
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-bold text-gray-900">
                  Filter & Sort
                </h3>
              </div>

              <form onSubmit={handlePriceSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {/* Minimum price */}
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Minimum Price (₹)
                    </label>

                    <input
                      id="minPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={minPriceInput}
                      onChange={(event) =>
                        setMinPriceInput(event.target.value)
                      }
                      placeholder="e.g. 500"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Maximum price */}
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Maximum Price (₹)
                    </label>

                    <input
                      id="maxPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={maxPriceInput}
                      onChange={(event) =>
                        setMaxPriceInput(event.target.value)
                      }
                      placeholder="e.g. 5000"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Sorting */}
                  <div>
                    <label
                      htmlFor="sort"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Sort Products
                    </label>

                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) =>
                        updateParams(
                          { sort: event.target.value },
                          ["page"]
                        )
                      }
                      className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Default</option>
                      <option value="price_asc">
                        Price: Low to High
                      </option>
                      <option value="price_desc">
                        Price: High to Low
                      </option>
                      <option value="newest">
                        Newest First
                      </option>
                      <option value="oldest">
                        Oldest First
                      </option>
                    </select>
                  </div>
                </div>

                {/* Filter buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Search size={16} />
                    Apply Price Filters
                  </button>

                  <button
                    type="button"
                    onClick={handleClearPrice}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <RotateCcw size={16} />
                    Clear Price
                  </button>
                </div>
              </form>
            </div>

            {/* Active filters */}
            {(minPrice ||
              maxPrice ||
              sort ||
              selectedSubCategory ||
              searchQuery) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Active filters:
                </span>

                {searchQuery && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Search: {searchQuery}
                  </span>
                )}

                {selectedSubCategory && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Subcategory: {selectedSubCategory}
                  </span>
                )}

                {minPrice && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Min: ₹{Number(minPrice).toLocaleString("en-IN")}
                  </span>
                )}

                {maxPrice && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Max: ₹{Number(maxPrice).toLocaleString("en-IN")}
                  </span>
                )}

                {sort && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Sort:{" "}
                    {
                      {
                        price_asc: "Price: Low to High",
                        price_desc: "Price: High to Low",
                        newest: "Newest First",
                        oldest: "Oldest First",
                      }[sort] || sort
                    }
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleAllProducts}
                  className="cursor-pointer text-xs font-semibold text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Loading state */}
            {loading ? (
              <div className="rounded-xl border border-gray-200 bg-white py-16">
                <Loader />
              </div>
            ) : products.length === 0 ? (
              /* Empty state */
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🛍️
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No products found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Try selecting another category or adjusting your filters.
                </p>

                <button
                  type="button"
                  onClick={handleAllProducts}
                  className="mt-4 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  View All Products
                </button>
              </div>
            ) : (
              /* Responsive product grid */
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            )}

            {/* R8.8: Pagination preserves existing filters */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
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
                    onClick={() =>
                      updateParams(
                        { page: currentPage - 1 },
                        []
                      )
                    }
                    disabled={currentPage <= 1}
                    className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateParams(
                        { page: currentPage + 1 },
                        []
                      )
                    }
                    disabled={currentPage >= totalPages}
                    className="cursor-pointer rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
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