import React from "react";

const NewLetter = () => {
  return (
    <div>
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to get updates on new releases, author events, and
            exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto p-4 bg-amber-600 rounded-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/70 rounded-lg focus:outline-none"
            />
            <button className="px-6 py-2 bg-white text-amber-600 hover:bg-white/90 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLetter;
