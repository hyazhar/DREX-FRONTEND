const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
            About Us
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            Built for Those Who Love Sports
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
            We provide quality sports equipment, apparel, and accessories
            designed to help athletes and sports enthusiasts perform at
            their best.
          </p>

        </div>
      </section>


      {/* About Company */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Content */}
          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Your Trusted Sports Store
            </h2>

            <p className="text-gray-600 mt-6 leading-relaxed">
              Our company was created with a simple goal: make quality
              sports products accessible to everyone. Whether you are a
              professional athlete, a fitness enthusiast, or someone
              starting a new sport, we want to help you find the right
              equipment.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              From cricket and football to badminton, hockey, gym
              equipment, and sportswear, our store brings together products
              for different sports and training needs in one place.
            </p>

          </div>


          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">

            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h3 className="text-3xl font-bold text-blue-600">
                50+
              </h3>

              <p className="text-gray-600 mt-2">
                Sports Products
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h3 className="text-3xl font-bold text-blue-600">
                7+
              </h3>

              <p className="text-gray-600 mt-2">
                Product Categories
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h3 className="text-3xl font-bold text-blue-600">
                100%
              </h3>

              <p className="text-gray-600 mt-2">
                Customer Focused
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h3 className="text-3xl font-bold text-blue-600">
                24/7
              </h3>

              <p className="text-gray-600 mt-2">
                Online Shopping
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Mission & Vision */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">

              <div className="w-12 h-12 bg-blue-100 text-blue-600
                              rounded-lg flex items-center justify-center
                              text-xl font-bold">
                M
              </div>

              <h2 className="text-2xl font-bold mt-6">
                Our Mission
              </h2>

              <p className="text-gray-600 mt-4 leading-relaxed">
                Our mission is to provide reliable, affordable, and
                high-quality sports products while making the shopping
                experience simple and convenient for every customer.
              </p>

            </div>


            {/* Vision */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">

              <div className="w-12 h-12 bg-blue-100 text-blue-600
                              rounded-lg flex items-center justify-center
                              text-xl font-bold">
                V
              </div>

              <h2 className="text-2xl font-bold mt-6">
                Our Vision
              </h2>

              <p className="text-gray-600 mt-4 leading-relaxed">
                Our vision is to become a trusted destination for sports
                enthusiasts by continuously expanding our product range
                and delivering an excellent customer experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
            What We Offer
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Everything You Need to Play
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore our growing collection of sports products made for
            training, competition, fitness, and everyday activity.
          </p>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

          {[
            "Cricket",
            "Football",
            "Badminton",
            "Hockey",
            "Gym",
            "Top Wear",
            "Bottom Wear",
            "Sports Gear",
          ].map((category) => (
            <div
              key={category}
              className="bg-white border border-gray-200 rounded-xl
                         p-6 text-center hover:shadow-md
                         transition duration-200"
            >
              <h3 className="font-semibold text-lg">
                {category}
              </h3>
            </div>
          ))}

        </div>

      </section>


      {/* CTA */}
      <section className="bg-blue-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Level Up Your Game?
          </h2>

          <p className="text-blue-100 mt-4 max-w-xl mx-auto">
            Explore our collection and find the equipment you need for
            your next game or workout.
          </p>

          <button
            className="mt-8 bg-white text-blue-600
                       font-semibold px-7 py-3 rounded-lg
                       hover:bg-gray-100 transition"
          >
            Explore Products
          </button>

        </div>

      </section>

    </div>
  );
};

export default About;