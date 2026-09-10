import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Shipping Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Learn more about our shipping process, delivery times, charges,
            and order tracking.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. Shipping Overview
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We aim to process and deliver your orders as quickly and safely
              as possible. Orders are processed after successful payment
              confirmation and are shipped to the delivery address provided
              during checkout.
            </p>
          </section>

          {/* 2 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Order Processing Time
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Orders are generally processed within 1–2 business days. Orders
              placed on weekends or public holidays may be processed on the
              next business day.
            </p>

            <div className="mt-5 rounded-xl bg-gray-50 p-5">
              <p className="font-semibold text-slate-900">
                Processing Time
              </p>

              <p className="mt-2 text-gray-600">
                1–2 business days
              </p>
            </div>
          </section>

          {/* 3 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              3. Delivery Time
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Delivery time depends on your location and the shipping service
              available for your order.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-slate-900">
                  Standard Delivery
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Usually delivered within 3–7 business days.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-slate-900">
                  Express Delivery
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Available in selected locations and delivered faster.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="font-bold text-slate-900">
                  Remote Locations
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Remote areas may require additional delivery time.
                </p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              4. Shipping Charges
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Shipping charges, if applicable, will be displayed during
              checkout before you place your order. Shipping fees may vary
              depending on the delivery location, order value, package size,
              and selected shipping method.
            </p>

            <div className="mt-5 rounded-xl border border-gray-200 p-5">
              <p className="font-semibold text-slate-900">
                Free Shipping
              </p>

              <p className="mt-2 text-gray-600">
                Free shipping may be available on eligible orders or during
                promotional periods.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              5. Order Tracking
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Once your order has been shipped, you may receive tracking
              information that allows you to monitor the delivery status of
              your package.
            </p>

            <div className="mt-6 flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-slate-900">
                  Track Your Order
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Use your order ID to check the latest delivery status.
                </p>
              </div>

              <a
                href="/trackOrder"
                className="inline-flex w-fit rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700"
              >
                Track Order
              </a>
            </div>
          </section>

          {/* 6 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              6. Delivery Address
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Please make sure that your delivery address, phone number, and
              other required information are correct before placing your
              order.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We may not be responsible for delivery delays or failed
              deliveries caused by incorrect or incomplete address
              information provided by the customer.
            </p>
          </section>

          {/* 7 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              7. Delayed Deliveries
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Although we work with our shipping partners to deliver orders
              within the estimated timeframe, unexpected delays may occur due
              to weather, transportation issues, holidays, high order volumes,
              or other circumstances beyond our control.
            </p>
          </section>

          {/* 8 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              8. Failed Delivery Attempts
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If the delivery partner is unable to deliver your order after
              multiple attempts, the package may be returned to us. Additional
              shipping charges may apply if the order needs to be shipped
              again.
            </p>
          </section>

          {/* 9 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              9. Damaged Packages
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If your package appears damaged when delivered, please inspect
              the product before accepting it whenever possible. If you
              receive a damaged product, contact our support team as soon as
              possible with your order details and supporting photographs.
            </p>
          </section>

          {/* 10 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              10. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have questions about shipping, delivery delays, or order
              tracking, please contact our customer support team.
            </p>

            <a
              href="/contact"
              className="mt-5 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700"
            >
              Contact Support
            </a>
          </section>

          {/* Last Updated */}
          <p className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
            Last updated: September 7, 2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default ShippingPolicy;
