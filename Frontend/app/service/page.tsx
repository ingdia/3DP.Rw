import Image from "next/image";
import AnimatedCard from "@/app/components/ui/AnimatedCard";

// We need the list of services again for this page.
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

// This is a new Page component
const AllServicesPage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Our Comprehensive Services
          </h1>
          <p className="text-lg text-black mt-4">
            Explore all the ways we can help your business grow and succeed.
          </p>
        </div>

        {/* This grid shows ALL 9 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <AnimatedCard key={index}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-black">{service.description}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
