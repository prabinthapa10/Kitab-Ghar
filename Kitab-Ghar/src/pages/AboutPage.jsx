import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Mission from "../components/About/Mission";
import Milestone from "../components/About/Milestone";
import Testimonials from "../components/About/Testimonials";

const AboutPage = () => {
  return (
    <main className="flex-1">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-amber-50 py-12 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground mb-8">
            PageTurner Books has been a haven for book lovers since 2005. What
            started as a small corner shop has grown into a community treasure,
            connecting readers with stories that inspire, educate, and
            entertain.
          </p>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <img
              src="/assets/banner/banner.png"
              alt="PageTurner Books storefront"
              className="w-[800px] h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* Our Mission */}
      <Mission />
      {/* Our Team */}
      <section className="py-16 px-10 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:pl-12 md:pr-12">
            {[
              { name: "Sarah Johnson", role: "Founder & Owner", img: "1" },
              { name: "Michael Chen", role: "Fiction Specialist", img: "2" },
              { name: "Amara Patel", role: "Children's Literature", img: "3" },
              { name: "David Wilson", role: "Events Coordinator", img: "4" },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="aspect-square relative">
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Team+Member+${member.img}`}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our History */}
      <Milestone />
      {/* Testimonials */}
      <Testimonials />
      {/* footer */}
      <Footer />
    </main>
  );
};

export default AboutPage;
