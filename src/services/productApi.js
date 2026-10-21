const API_URL = "http://localhost:3000/api";

async function getdata(params = {}) {
  const filters =typeof params === "number" ? { page: params }: params;

  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      queryParams.set(key, value);
    }
  });

  const queryString = queryParams.toString();

  const response = await fetch(
    `${API_URL}/products${queryString ? `?${queryString}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

// Fetch one product by ID
async function getProductById(id) {
  const response = await fetch(
    `${API_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}

// Fetch all categories
async function getCategories() {
  const response = await fetch(
    `${API_URL}/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
}

const productApi = {
  getdata,
  getProductById,
  getCategories,
};

export default productApi;