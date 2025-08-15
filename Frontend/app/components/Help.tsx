// components/sections/Help.tsx
import AnimatedCard from "@/app/components/ui/AnimatedCard";

const helpCards = [
  {
    title: "Startups",
    description: "Launch and grow with scalable, affordable solutions.",
    bgImage: "/help1.jpg",
  },
  {
    title: "Enterprises",
    description: "Transform operations with our enterprise-grade services.",
    bgImage: "/help2.jpg",
  },
  {
    title: "Non-Profits",
    description: "Maximize your impact with specialized, efficient solutions.",
    bgImage: "help3.jpg",
  },
];
// NOTE: Add corresponding images to `public/images/`

const Help = () => {
  return (
    <div id="help" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Who Can We Help?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-black mb-16">
          We cater to a wide range of industries, providing tailored solutions
          to meet their specific challenges and goals, ensuring success at every
          stage of their journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {helpCards.map((card, index) => (
            <AnimatedCard key={index}>
              <div
                className="relative h-96 rounded-lg shadow-lg overflow-hidden bg-cover bg-center flex items-end p-6 text-white transform transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url(${card.bgImage})` }}
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-white">{card.description}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
