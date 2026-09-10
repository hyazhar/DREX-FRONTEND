import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from './Loader';
function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) {
    return <Loader/>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <div className="grid gap-10 md:grid-cols-2">

        {/* Product Image */}
        <div className="flex h-[500px] items-center justify-center rounded-2xl bg-gray-50 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

          <span className="mb-4 w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold capitalize text-blue-600">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-400">
              ★
            </span>

            <span className="font-medium">
              {product.rating?.rate}
            </span>

            <span className="text-gray-400">
              ({product.rating?.count} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="mt-6 text-3xl font-bold text-blue-600">
            ${product.price}
          </p>

          {/* Description */}
          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Add to Bag */}
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