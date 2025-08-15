import Image from "next/image";
import Link from "next/link"; // We need this for the new button
import AnimatedCard from "@/app/components/ui/AnimatedCard";

// This is the full list of your services
const servicesData = [
  {
    title: "Data Strategy & Roadmap Development",
    description:
      "We help define your data vision, create a clear strategy, and develop a roadmap for implementation, guiding your business towards a data-driven future.",
    imgSrc: "/service1.jpg",
  },
  {
    title: "Business Intelligence (BI) Implementation & Dashboard Development",
    description:
      "We implement BI tools and create customized dashboards to visualize and track key metrics, turning data into actionable insights for better decision-making.",
    imgSrc: "/service2.jpg",
  },
  {
    title: "Data Integration & Automation Services",
    description:
      "ntegrate data from various sources and automate workflows to streamline operations, ensuring seamless data flow across your organization.",
    imgSrc: "/service3.jpg",
  },
  {
    title: "Advanced Analytics & Predictive Modeling",
    description:
      "We leverage advanced analytics and predictive models to uncover trends and forecast future outcomes, enabling data-driven strategies that enhance performance.",
    imgSrc: "/service4.jpg",
  },
  {
    title: "Data Governance & Compliance Support",
    description:
      "We establish robust data governance frameworks, ensuring data quality, security, and compliance with industry regulations, safeguarding your business’s data assets.",
    imgSrc: "/service5.jpg",
  },
  {
    title: "Training & Data Literacy Programs",
    description:
      "We provide hands-on training to enhance your team’s data skills, ensuring your workforce can effectively use data tools and make informed, data-driven decisions.",
    imgSrc: "/service6.jpg",
  },
  {
    title: "Data Analytics & Insight Generation",
    description:
      "Our team analyzes your data to uncover valuable insights and trends, providing reports and recommendations that drive strategic decisions.",
    imgSrc: "/service7.jpg",
  },
];

const servicesForHomePage = servicesData.slice(0, 3);

const Services = () => {
  return (
    <div id="services" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">
          Our Services
        </h2>
        <p className="text-black text-center text-lg mb-12">
          We offer a range of services designed to help your business leverage
          data and technology effectively.
        </p>
        {/* We now use the SMALL list to create the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesForHomePage.map((service, index) => (
            <AnimatedCard key={index}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-56 w-full">
                  {/* I also fixed your Image tag to the new Next.js style */}
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-black">{service.description}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* --- AND HERE IS THE NEW BUTTON --- */}
        <div className="text-center mt-16">
          <Link
            href="/service"
            className="bg-yellow-700 text-white hover:bg-yellow-500 font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
