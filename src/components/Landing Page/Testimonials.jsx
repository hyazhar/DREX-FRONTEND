import React from "react";
import { Star, Quote } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Cricket Player",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      review:
        "Amazing quality products! I ordered a cricket bat and the quality was much better than I expected. Delivery was also very fast.",
    },
    {
      name: "Arjun Kumar",
      role: "Fitness Enthusiast",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      review:
        "I bought a set of dumbbells from here and I'm really impressed with the quality. Great products at reasonable prices.",
    },
    {
      name: "Priya Singh",
      role: "Football Player",
      image: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      review:
        "The shopping experience was excellent. My football arrived on time and was packed really well. I'll definitely shop here again.",
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">

          <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold mb-2">
            Testimonials
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Thousands of sports enthusiasts trust us for quality products,
            great prices and reliable service.
          </p>

        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testimonials.map((testimonial, index) => (

            <div
              key={index}
              className="
                group
                relative
                bg-black
                border
                border-gray-800
                hover:border-blue-500
                rounded-2xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-900/20
              "
            >

              {/* Quote Icon */}
              <div
                className="
                  absolute
                  top-5
                  right-5
                  w-10
                  h-10
                  rounded-full
                  bg-blue-600/10
                  flex
                  items-center
                  justify-center
                  text-blue-500
                "
              >
                <Quote size={20} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">

                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                ))}

              </div>

              {/* Review */}
              <p className="text-gray-400 leading-relaxed min-h-[120px]">
                "{testimonial.review}"
              </p>

              {/* Customer */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-800">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="
                    w-12
                    h-12
                    rounded-full
                    object-cover
                    border-2
                    border-blue-500/30
                  "
                />

                <div>
                  <h3 className="font-semibold">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;
