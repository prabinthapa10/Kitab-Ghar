import React from "react";

const milestones = [
  {
    year: "2005",
    title: "The Beginning",
    description:
      "PageTurner Books opened its doors in a small corner shop with just 500 books and a dream.",
  },
  {
    year: "2010",
    title: "Growing Community",
    description:
      "We expanded to our current location, tripling our space and adding a cozy reading nook and café.",
  },
  {
    year: "2015",
    title: "Digital Expansion",
    description:
      "We launched our online store, bringing our curated selection to book lovers nationwide.",
  },
  {
    year: "2020",
    title: "Community Hub",
    description:
      "Despite challenges, we strengthened our community focus with virtual events and a local delivery service.",
  },
  {
    year: "Today",
    title: "Continuing the Story",
    description:
      "We continue to grow and evolve, while staying true to our mission of connecting readers with great books.",
  },
];
const Milestone = () => {
  return (
    <div>
      <section className="py-16 px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  {index < 4 && (
                    <div className="w-0.5 h-full bg-amber-200 mt-2"></div>
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-semibold text-xl mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Milestone;
