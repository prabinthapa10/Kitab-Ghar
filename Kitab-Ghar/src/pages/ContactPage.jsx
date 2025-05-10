import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewLetter from "../components/NewLetter";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-amber-50 py-12 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We'd love
              to hear from you. Reach out using the form below or visit us in
              store.
            </p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16">
          <div className="container mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
            </div>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16">
          <div className="container mx-auto px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Our Location
                        </h3>
                        <p className="text-muted-foreground">123 Book Lane</p>
                        <p className="text-muted-foreground">
                          Reading, RG1 2BK
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Phone</h3>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                        <p className="text-muted-foreground">
                          info@pageturner.com
                        </p>
                        <p className="text-muted-foreground">
                          support@pageturner.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Hours</h3>
                        <div className="grid grid-cols-2 gap-x-4 text-muted-foreground">
                          <p>Monday - Friday:</p>
                          <p>9:00 AM - 8:00 PM</p>
                          <p>Saturday:</p>
                          <p>10:00 AM - 6:00 PM</p>
                          <p>Sunday:</p>
                          <p>12:00 PM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 flex justify-center items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 🔥 Full-width Map */}
          <div className="w-[95%] m-auto h-[300px] mt-16 rounded-none overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24348.169849104434!2d84.00509098239246!3d28.196955113611065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595c4849bb1f7%3A0x5b9d7090965a2f9e!2sKajipokhari%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1746898209702!5m2!1sen!2snp"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">
                    Do you offer book recommendations?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! Our knowledgeable staff is always happy to recommend
                    books based on your interests, previous reads, or specific
                    genres you enjoy. Just ask any team member in store, or send
                    us an email with your preferences.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">
                    Can I order books that aren't in stock?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolutely. We can special order almost any book in print.
                    Special orders typically arrive within 3-7 business days,
                    and we'll contact you as soon as your book arrives.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">
                    Do you buy used books?
                  </h3>
                  <p className="text-muted-foreground">
                    We do accept gently used books for store credit. Please
                    bring your books during our buying hours (Tuesday-Thursday,
                    11AM-4PM) and our staff will evaluate them. Store credit can
                    be used for up to 50% of any purchase.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">
                    How do I join the book club?
                  </h3>
                  <p className="text-muted-foreground">
                    We host several book clubs focusing on different genres and
                    interests. You can sign up in store or through our website.
                    Most clubs meet monthly, and new members are always welcome!
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">
                    Do you host author events?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we regularly host author readings, signings, and
                    discussions. Check our events calendar on the website or
                    sign up for our newsletter to stay informed about upcoming
                    events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewLetter />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
