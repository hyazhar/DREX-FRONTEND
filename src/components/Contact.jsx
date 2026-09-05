import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
            Get In Touch
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Contact Us
          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl text-lg">
            Have a question about our products, orders, or services?
            Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold">
              Let's talk
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Whether you need help choosing the right sports equipment,
              have a question about your order, or want to work with us,
              feel free to contact our team.
            </p>

            {/* Email */}
            <div className="flex items-start gap-4 mt-10">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                ✉
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>

                <p className="text-gray-600 mt-1">
                  support@sportzone.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mt-7">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                ☎
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Phone
                </h3>

                <p className="text-gray-600 mt-1">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 mt-7">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                📍
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Address
                </h3>

                <p className="text-gray-600 mt-1">
                  Sports Zone, Main Market
                  <br />
                  Patna, Bihar, India
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4 mt-7">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                🕒
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Business Hours
                </h3>

                <p className="text-gray-600 mt-1">
                  Monday - Saturday: 9:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

            <h2 className="text-2xl font-bold">
              Send us a message
            </h2>

            <p className="text-gray-500 mt-2">
              Fill out the form and we'll get back to you.
            </p>

            <form className="mt-8">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact