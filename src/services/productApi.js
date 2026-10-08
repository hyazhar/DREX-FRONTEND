async function getdata(page=1) {
  const product = await fetch(`http://localhost:3000/api/products?page=${page}`);
  if(!product.ok){
    throw new Error("Failed to fetch products");
  }
  const getproduct = await product.json();
  return getproduct;
}
async function getProductById(id) {
  const product = await fetch(`http://localhost:3000/api/products/${id}`);

  if (!product.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await product.json();
  return data;
}
export default {getdata,getProductById};


