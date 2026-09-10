async function getdata() {
  const product = await fetch("https://fakestoreapi.com/products");
  const getproduct = await product.json();
  return getproduct;
}
export default getdata;


