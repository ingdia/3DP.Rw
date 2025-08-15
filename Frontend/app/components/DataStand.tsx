// components/sections/DataStand.tsx
import Link from "next/link";
import AnimatedCard from "@/app/components/ui/AnimatedCard";

const dataCards = [
  {
    title: "Data Reactive",
    description:
      "Limited use of data, primarily reacting to immediate needs or issues.",
    buttonText: "Learn What can you do?",
  },
  {
    title: "Data Literate",
    description:
      "Foundational understanding of data's value, with employees equipped with basic data skills.",
    buttonText: "Let's Help you Understand",
  },
  {
    title: "Data Ready",
    description:
      "Established data infrastructure and governance, enabling systematic data utilization for decision-making.",
    buttonText: "LEt's Analyze Your Data",
  },
  {
    title: "Data Experts",
    description:
      "Advanced expertise in data analytics and utilization, driving innovation and competitive advantage.",
    buttonText: "Ready to Take Action",
  },
];

const DataStand = () => {
  return (
    <div id="data-stand" className="bg-gray-800 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Where Do You Stand In Data For Your Business?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataCards.map((card, index) => (
            <AnimatedCard key={index} className="h-full">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-black mb-4">
                  {card.title}
                </h3>
                <p className="text-black mb-6 flex-grow">{card.description}</p>

                {/* === THIS IS THE UPDATED PART === */}
                <Link
                  href="/contact"
                  className="mt-auto text-center bg-transparent border-2 border-gray-800 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-700 hover:text-white transition-colors duration-300"
                >
                  {card.buttonText}
                </Link>
                {/* ================================ */}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataStand;
