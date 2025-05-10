import React from "react";

const testimonials = [
  {
    quote:
      "PageTurner is my happy place. The staff always has the perfect recommendation, and I've discovered so many amazing books here.",
    author: "Emily R.",
  },
  {
    quote:
      "As a parent, I appreciate their thoughtful children's section. My kids look forward to our weekend visits to pick out new adventures.",
    author: "Marcus T.",
  },
  {
    quote:
      "The book club changed my reading life! I've met wonderful friends and read books I never would have picked up otherwise.",
    author: "Sophia L.",
  },
];

const Testimonials = () => {
  return (
    <div>
      <section className="py-16 px-10 bg-amber-50">
        <div className="container mx-auto px-4 md:px-12">
          {" "}
          {/* Added padding for left and right */}
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-right">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
