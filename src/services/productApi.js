async function getdata() {
  const product = await fetch("https://fakestoreapi.com/products");
  const getproduct = await product.json();
  return getproduct;
}

async function getProductById(id) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}
export default {getdata,getProductById};


