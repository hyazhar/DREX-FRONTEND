const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
            Order Tracking
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Track Your Order
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Enter your order ID below to check the current status of your
            order.
          </p>

        </div>
      </section>


      {/* Track Order Form */}
      <section className="max-w-3xl mx-auto px-6 py-16">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Enter Order ID
          </h2>

          <p className="text-gray-500 mt-2">
            You can find your order ID in your order confirmation.
          </p>


          <form className="mt-8">

            <label
              htmlFor="orderId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Order ID
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                id="orderId"
                name="orderId"
                placeholder="e.g. ORD-2026-00125"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-blue-500"
              />

              <button
                type="submit"
                className="px-7 py-3 bg-blue-600 hover:bg-blue-700
                           text-white font-semibold rounded-lg
                           transition duration-200"
              >
                Track Order
              </button>

            </div>

          </form>

        </div>


        {/* Order Status */}
        <div className="bg-white border border-gray-200 rounded-2xl
                        shadow-sm p-8 mt-8">

          <div className="flex flex-col sm:flex-row
                          sm:items-center sm:justify-between gap-3">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h3 className="text-lg font-bold">
                ORD-2026-00125
              </h3>
            </div>

            <span className="inline-flex w-fit px-4 py-2 rounded-full
                             bg-blue-100 text-blue-700
                             text-sm font-semibold">
              Shipped
            </span>

          </div>


          {/* Progress */}
          <div className="mt-10">

            <div className="relative">

              <div className="absolute top-4 left-0 right-0
                              h-1 bg-gray-200">
              </div>

              <div className="absolute top-4 left-0
                              w-2/3 h-1 bg-blue-600">
              </div>


              <div className="relative flex justify-between">

                {/* Confirmed */}
                <div className="flex flex-col items-center">

                  <div className="w-8 h-8 rounded-full
                                  bg-blue-600 text-white
                                  flex items-center justify-center
                                  font-bold">
                    ✓
                  </div>

                  <p className="text-sm font-semibold mt-3">
                    Confirmed
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Sep 1
                  </p>

                </div>


                {/* Packed */}
                <div className="flex flex-col items-center">

                  <div className="w-8 h-8 rounded-full
                                  bg-blue-600 text-white
                                  flex items-center justify-center
                                  font-bold">
                    ✓
                  </div>

                  <p className="text-sm font-semibold mt-3">
                    Packed
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Sep 2
                  </p>

                </div>


                {/* Shipped */}
                <div className="flex flex-col items-center">

                  <div className="w-8 h-8 rounded-full
                                  bg-blue-600 text-white
                                  flex items-center justify-center
                                  font-bold">
                    ✓
                  </div>

                  <p className="text-sm font-semibold mt-3">
                    Shipped
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Sep 3
                  </p>

                </div>


                {/* Delivered */}
                <div className="flex flex-col items-center">

                  <div className="w-8 h-8 rounded-full
                                  bg-gray-200 text-gray-400
                                  flex items-center justify-center
                                  font-bold">
                    4
                  </div>

                  <p className="text-sm font-semibold mt-3 text-gray-400">
                    Delivered
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Estimated Delivery */}
          <div className="mt-10 pt-6 border-t border-gray-200">

            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <p className="text-lg font-semibold mt-1">
              September 7, 2026
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default TrackOrder;