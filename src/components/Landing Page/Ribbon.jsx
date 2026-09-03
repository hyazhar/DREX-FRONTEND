import React from "react";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

function Ribbon() {
  const benefits = [
    {
      icon: <Truck size={26} />,
      title: "Free Shipping",
      description: "On orders over ₹999",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: <RotateCcw size={26} />,
      title: "Easy Returns",
      description: "7-day easy returns",
    },
    {
      icon: <Headphones size={26} />,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];

  return (
    <section className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex overflow-x-auto scrollbar-hide">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="
                min-w-[220px]
                sm:min-w-0
                flex-1
                flex
                items-center
                justify-center
                gap-3
                py-4
                px-5
                border-r
                border-blue-400
                last:border-r-0
              "
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {benefit.icon}
              </div>

              {/* Text */}
              <div className="whitespace-nowrap">
                <h3 className="font-bold text-sm sm:text-base">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-blue-100">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Ribbon;