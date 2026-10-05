import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";

function ShopByProduct() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Professional Cricket Bat",
      price: 2499,
      category: "Cricket",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Football",
      price: 1299,
      category: "Football",
      image:
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Professional Dumbbells",
      price: 1999,
      category: "Gym",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Sports Running Shoes",
      price: 2999,
      category: "Sports Gear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div>
            <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold mb-2">
              Featured
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Shop By Product
            </h2>

            <p className="text-gray-400 mt-2 max-w-xl">
              Discover our most popular sports products and gear.
            </p>
          </div>

          {/* View All Products */}
          <button
            onClick={() => navigate("/products")}
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              border
              border-blue-600
              text-blue-400
              hover:bg-blue-600
              hover:text-white
              px-5
              py-3
              rounded-lg
              font-semibold
              transition-all
              duration-300
              w-full
              sm:w-auto
            "
          >
            View All Products

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                group
                bg-gray-900
                border
                border-gray-800
                hover:border-blue-500
                rounded-2xl
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-900/20
              "
            >

              {/* Product Image */}
              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-48
                    sm:h-56
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                  "
                />

                {/* Category Badge */}
                <span
                  className="
                    absolute
                    top-3
                    left-3
                    bg-black/70
                    backdrop-blur-sm
                    text-blue-400
                    text-xs
                    font-semibold
                    px-3
                    py-1.5
                    rounded-full
                  "
                >
                  {product.category}
                </span>

              </div>

              {/* Product Details */}
              <div className="p-4">

                <h3
                  className="
                    font-semibold
                    text-sm
                    sm:text-base
                    line-clamp-2
                    min-h-[48px]
                    group-hover:text-blue-400
                    transition-colors
                  "
                >
                  {product.name}
                </h3>

                {/* Price + Cart */}
                <div className="flex items-center justify-between mt-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Starting from
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-blue-500">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleProductClick(product.id)}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      p-2.5
                      rounded-lg
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                    aria-label={`View ${product.name}`}
                  >
                    <ShoppingCart size={19} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ShopByProduct;