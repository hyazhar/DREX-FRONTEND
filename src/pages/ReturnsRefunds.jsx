import React from "react";

const ReturnsRefunds = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Returns & Refunds Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            We want you to be completely satisfied with your purchase. If
            something isn't right, we're here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. Our Return Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              You may request a return within 7 days of receiving your order,
              provided the product meets our return conditions. We recommend
              checking your order as soon as it arrives.
            </p>
          </section>

          {/* Eligibility */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Return Eligibility
            </h2>

            <p className="mt-4 text-gray-600">
              To be eligible for a return, the following conditions should be
              met:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
              <li>The product must be unused and in its original condition.</li>
              <li>The original packaging should be intact.</li>
              <li>All tags, accessories, and labels should be included.</li>
              <li>Proof of purchase or order details must be provided.</li>
              <li>The return request must be submitted within 7 days.</li>
            </ul>
          </section>

          {/* Non Returnable */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              3. Non-Returnable Items
            </h2>

            <p className="mt-4 text-gray-600">
              Some products may not be eligible for return due to hygiene,
              safety, or product-specific restrictions.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
              <li>Used or damaged products.</li>
              <li>Products without original packaging.</li>
              <li>Customized or personalized products.</li>
              <li>Products damaged due to improper use.</li>
              <li>Items marked as non-returnable on the product page.</li>
            </ul>
          </section>

          {/* Damaged Products */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              4. Damaged or Incorrect Products
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you receive a damaged, defective, or incorrect product, please
              contact our support team as soon as possible. We may request
              photographs or videos of the product to verify the issue.
            </p>
          </section>

          {/* Return Process */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              5. How to Request a Return
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-sm font-semibold text-indigo-600">
                  STEP 01
                </span>

                <h3 className="mt-2 font-bold text-slate-900">
                  Contact Us
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Contact our support team with your order ID and reason for
                  requesting a return.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-sm font-semibold text-indigo-600">
                  STEP 02
                </span>

                <h3 className="mt-2 font-bold text-slate-900">
                  Return Approval
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Our team will review your request and provide return
                  instructions if approved.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <span className="text-sm font-semibold text-indigo-600">
                  STEP 03
                </span>

                <h3 className="mt-2 font-bold text-slate-900">
                  Product Inspection
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Once we receive the product, it will be inspected before the
                  refund is processed.
                </p>
              </div>
            </div>
          </section>

          {/* Refund */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              6. Refund Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Once your returned product has been received and approved, your
              refund will be initiated. The refund will generally be issued to
              the original payment method.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Depending on your bank or payment provider, it may take several
              business days for the refunded amount to appear in your account.
            </p>
          </section>

          {/* Shipping */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              7. Return Shipping
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Return shipping charges may apply depending on the reason for the
              return. If the product is defective, damaged, or incorrectly
              delivered, we may cover the applicable return shipping cost.
            </p>
          </section>

          {/* Cancellation */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              8. Order Cancellation
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Orders may be cancelled before they are shipped. Once an order
              has been dispatched, cancellation may no longer be possible and
              you may need to follow our return procedure.
            </p>
          </section>

          {/* Exchange */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              9. Exchanges
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Product exchanges may be available for eligible items, subject
              to stock availability. If the requested replacement is
              unavailable, you may be offered a refund instead.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-10 rounded-xl bg-slate-900 p-6 text-white">
            <h2 className="text-2xl font-bold">
              Need Help With a Return?
            </h2>

            <p className="mt-3 text-slate-300">
              If you have questions about your return or refund, please contact
              our customer support team with your order ID.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-gray-100"
            >
              Contact Support
            </button>
          </section>

          {/* Last Updated */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Last updated: September 7, 2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReturnsRefunds;
