import React from "react";
import { BookOpen, Award, Users, Clock } from "lucide-react";
const Mission = () => {
  return (
    <div>
      <section className="py-16 px-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:pl-12 md:pr-12">
              {/* Added left and right padding */}
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-4">
                At PageTurner, we believe that books have the power to transform
                lives. Our mission is to curate a thoughtful collection of books
                that inspire curiosity, foster empathy, and ignite imagination.
              </p>
              <p className="text-lg mb-4">
                We strive to create a welcoming space where readers of all ages
                and backgrounds can discover their next favorite book and
                connect with a community of fellow book lovers.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-amber-600 mb-2" />
                  <h3 className="font-semibold">10,000+</h3>
                  <p className="text-sm text-muted-foreground">
                    Books in Collection
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                  <Users className="h-8 w-8 text-amber-600 mb-2" />
                  <h3 className="font-semibold">5,000+</h3>
                  <p className="text-sm text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 md:pl-12 md:pr-12">
              {" "}
              {/* Added left and right padding */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-2 flex items-center">
                  <Award className="h-5 w-5 text-amber-600 mr-2" />
                  Curated Selection
                </h3>
                <p>
                  We carefully select each title in our collection, focusing on
                  quality literature across all genres and interests.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-2 flex items-center">
                  <Users className="h-5 w-5 text-amber-600 mr-2" />
                  Community Focus
                </h3>
                <p>
                  We host regular book clubs, author events, and reading groups
                  to foster a vibrant community of readers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-2 flex items-center">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  Personalized Service
                </h3>
                <p>
                  Our knowledgeable staff provides personalized recommendations
                  based on your reading preferences and interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
