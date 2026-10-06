async function getdata(page=1) {
  const product = await fetch(`http://localhost:3000/api/products?page=${page}`);
  if(!product.ok){
    throw new Error("Failed to fetch products");
  }
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


