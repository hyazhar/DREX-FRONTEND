import React from "react";

function SiteMap() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>

          <p className="mt-3 text-gray-600">
            Visit our store or get in touch with our team.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
            <iframe
              title="Our Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d680.3857239090954!2d85.39795904960528!3d25.815531321831052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed6f0036a2277d%3A0xe73eddd5bcf76daa!2sIndian%20sports!5e1!3m2!1sen!2sin!4v1788794314967!5m2!1sen!2sin"           width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteMap;
