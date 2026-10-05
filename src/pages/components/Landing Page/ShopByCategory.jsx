import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Trophy,
  Volleyball,
  Dumbbell,
  Target,
  ArrowRight,
} from "lucide-react";

function ShopByCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Cricket",
      icon: Trophy,
      path: "/products?category=Cricket",
    },
    {
      name: "Football",
      icon: Volleyball,
      path: "/products?category=Football",
    },
    {
      name: "Badminton",
      icon: Target,
      path: "/products?category=Badminton",
    },
    {
      name: "Gym",
      icon: Dumbbell,
      path: "/products?category=Gym",
    },
    {
      name: "Sports Gear",
      icon: Trophy,
      path: "/products?category=Sports%20Gear",
    },
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section className="bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div>
            <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold mb-2">
              Explore
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Shop By Category
            </h2>

            <p className="text-gray-400 mt-2 max-w-xl">
              Find the perfect sports products for your game, workout and
              everyday performance.
            </p>
          </div>

          {/* View All Categories */}
          <button
            onClick={() => navigate("/categories")}
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
            View All Categories

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

        </div>

        {/* Category Grid */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4
            sm:gap-5
          "
        >

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.path)}
                className="
                  group
                  bg-gray-900
                  border
                  border-gray-800
                  hover:border-blue-500
                  rounded-2xl
                  p-5
                  sm:p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-h-[170px]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-blue-900/20
                "
              >

                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    sm:w-20
                    sm:h-20
                    rounded-full
                    bg-blue-600/10
                    border
                    border-blue-500/20
                    flex
                    items-center
                    justify-center
                    text-blue-500
                    group-hover:bg-blue-600
                    group-hover:text-white
                    group-hover:scale-110
                    transition-all
                    duration-300
                    mb-4
                  "
                >
                  <Icon
                    size={34}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Category Name */}
                <h3
                  className="
                    font-semibold
                    text-sm
                    sm:text-base
                    text-center
                    group-hover:text-blue-400
                    transition-colors
                  "
                >
                  {category.name}
                </h3>

                {/* Shop Text */}
                <span
                  className="
                    text-xs
                    text-gray-500
                    group-hover:text-blue-400
                    mt-2
                    transition-colors
                  "
                >
                  Shop Now →
                </span>

              </button>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default ShopByCategory;