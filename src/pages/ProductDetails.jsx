import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from '../services/productApi'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState("");
 useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productApi.getProductById(id)
        setProduct(data.product);
        console.log(data.product);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.Please Try Again");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id]);

  if (loading) {
    return <Loader/>;
  }

  if(error){
    return <ErrorMessage message={error}></ErrorMessage>
  }

  return (
      <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">

        {/* Product Image */}
        <div className="flex h-[500px] items-center justify-center rounded-2xl bg-gray-50 p-10">
          <div className="text-gray-400">
            Product Image
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

          {/* Category */}
          <span className="mb-4 w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold capitalize text-blue-600">
            {product.category?.name}
          </span>

          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          {/* Brand */}
          <p className="mt-3 text-gray-500">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          {/* Price */}
          <p className="mt-6 text-3xl font-bold text-blue-600">
            ₹{product.price?.toLocaleString("en-IN")}
          </p>

          {/* Description */}
          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Product Information */}
          <div className="mt-6 space-y-2 text-gray-600">
            <p>
              <span className="font-semibold">Sub Category:</span>{" "}
              {product.subCategory}
            </p>

            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {product.stock}
            </p>

            <p>
              <span className="font-semibold">Featured:</span>{" "}
              {product.isFeatured ? "Yes" : "No"}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add to Bag
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;