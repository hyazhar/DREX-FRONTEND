import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse our products, add the items you want to your cart, and proceed to checkout. Enter your delivery details and complete the payment to place your order.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order using your Order ID from the Track Order page. Once your order has been shipped, the latest delivery information will be available there.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery usually takes 3–7 business days. Delivery times may vary depending on your location and the shipping method selected.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes. You can request cancellation before your order is shipped. Once the order has been dispatched, cancellation may no longer be possible.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes. Eligible products can generally be returned within 7 days of delivery. The product must be unused, in its original condition, and include its original packaging and accessories.",
    },
    {
      question: "How long does it take to receive a refund?",
      answer:
        "Once your returned product has been received and approved, we will initiate the refund. The time required for the amount to appear in your account may depend on your bank or payment provider.",
    },
    {
      question: "What if I receive a damaged product?",
      answer:
        "If you receive a damaged or defective product, contact our support team as soon as possible with your Order ID and photographs of the product. Our team will help you with the next steps.",
    },
    {
      question: "What if I receive the wrong product?",
      answer:
        "Please contact our support team with your Order ID and details of the incorrect product. We will review the issue and provide the appropriate solution.",
    },
    {
      question: "Do you offer exchanges?",
      answer:
        "Exchanges may be available for eligible products depending on stock availability. Please contact our support team to check whether your product qualifies.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Free shipping may be available on eligible orders or during promotional periods. Any applicable shipping charges will be displayed during checkout.",
    },
    {
      question: "Can I change my delivery address?",
      answer:
        "You may request an address change before your order is shipped. Once the order has been dispatched, changing the delivery address may not be possible.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team through the Contact Us page. Please include your Order ID when contacting us about an existing order.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Find answers to the most common questions about orders, shipping,
            returns, refunds, and payments.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-gray-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-slate-700 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 px-6 pb-5 pt-4 leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Still Have Questions?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
