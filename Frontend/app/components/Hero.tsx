// components/sections/Hero.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/dash1.jpg",
  "/dash2.jpg",
  "/dash3.jpg",
  "/dash4.jpg",
  "/dash5.jpg",
  "/dash6.jpg",
  "/dash7.jpg",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="container mx-auto px-6 py-12 lg:flex lg:items-center lg:gap-12">
        {/* Left Side: Paragraph and Button */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
            Empowering businesses to discover and harness the full potential of
            data
          </h1>
          <p className="text-lg text-black mb-8">
            Your Partner in Becoming a Data Driven Business.
          </p>
          <a
            href="#services"
            className="bg-yellow-700 text-white hover:bg-yellow-500 font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Right Side: Image Slider */}
        <motion.div
          className="relative lg:w-1/2 mt-10 lg:mt-0 h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt="Showcase of services"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// import {
//   ChartBarIcon,
//   MapIcon,
//   ArrowsRightLeftIcon,
//   ArrowTrendingUpIcon,
//   ShieldCheckIcon,
//   AcademicCapIcon,
//   LightBulbIcon,
// } from "@heroicons/react/24/outline";

// // A reusable component for the section titles
// const SectionTitle = ({ children }: { children: React.ReactNode }) => (
//   <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12 relative inline-block">
//     {children}
//     <span className="block w-16 h-1 bg-primary absolute -bottom-3 left-1/2 -translate-x-1/2"></span>
//   </h2>
// );

// // This component remains reusable as its structure is consistent across all cards.
// const ServiceCard = ({ IconComponent, title, description, addToRefs }: any) => (
//   <div
//     ref={addToRefs}
//     className="animate-on-scroll bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//   >
//     <IconComponent className="w-20 h-20 mx-auto mb-6 text-primary" />
//     <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// // This component also remains reusable.
// const IndustryCard = ({
//   image,
//   title,
//   description,
//   bgColor,
//   addToRefs,
// }: any) => (
//   <div
//     ref={addToRefs}
//     className="animate-on-scroll group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
//   >
//     <Image
//       src={image}
//       alt={title}
//       width={500}
//       height={500}
//       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//     />
//     <div
//       className={`absolute inset-0 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 flex items-center justify-center p-6 ${bgColor}`}
//     >
//       <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//         <h3 className="text-2xl font-bold mb-2">{title}</h3>
//         <p>{description}</p>
//       </div>
//     </div>
//   </div>
// );

// export default function HomePage() {
//   const animatedElementsRef = useRef<(HTMLElement | null)[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const services = [
//     {
//       icon: ChartBarIcon,
//       title:
//         "Business Intelligence (BI) Implementation & Dashboard Development",
//       description:
//         "We implement BI tools and create customized dashboards to visualize and track key metrics, turning data into actionable insights for better decision-making.",
//     },
//     {
//       icon: MapIcon,
//       title: "Data Strategy & Roadmap Development",
//       description:
//         "We help define your data vision, create a clear strategy, and develop a roadmap for implementation, guiding your business towards a data-driven future.",
//     },
//     {
//       icon: ArrowsRightLeftIcon,
//       title: "Data Integration & Automation Services",
//       description:
//         "We integrate data from various sources and automate workflows to streamline operations, ensuring seamless data flow across your organization.",
//     },
//     {
//       icon: ArrowTrendingUpIcon,
//       title: "Advanced Analytics & Predictive Modeling",
//       description:
//         "We leverage advanced analytics and predictive models to uncover trends and forecast future outcomes, enabling data-driven strategies that enhance performance.",
//     },
//     {
//       icon: ShieldCheckIcon,
//       title: "Data Governance & Compliance Support",
//       description:
//         "We establish robust data governance frameworks, ensuring data quality, security, and compliance with industry regulations, safeguarding your business’s data assets.",
//     },
//     {
//       icon: AcademicCapIcon,
//       title: "Training & Data Literacy Programs",
//       description:
//         "We provide hands-on training to enhance your team’s data skills, ensuring your workforce can effectively use data tools and make informed, data-driven decisions.",
//     },
//     {
//       icon: LightBulbIcon,
//       title: "Data Analytics & Insight Generation",
//       description:
//         "Our team analyzes your data to uncover valuable insights and trends, providing reports and recommendations that drive strategic decisions.",
//     },
//   ];

//   const dashboardImages = [
//     "/dash1.jpg",
//     "/dash2.jpg",
//     "/dash3.jpg",
//     "/dash4.jpg",
//     "/dash5.jpg",
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("is-visible");
//           } else {
//             entry.target.classList.remove("is-visible");
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     animatedElementsRef.current.forEach((el) => {
//       if (el) observer.observe(el);
//     });

//     return () =>
//       animatedElementsRef.current.forEach((el) => {
//         if (el) observer.unobserve(el);
//       });
//   }, []);

//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % dashboardImages.length);
//     }, 3000);

//     return () => clearInterval(slideInterval);
//   }, [dashboardImages.length]);

//   const addToRefs = (el: any) => {
//     if (el && !animatedElementsRef.current.includes(el)) {
//       animatedElementsRef.current.push(el);
//     }
//   };

//   return (
//     <div className="bg-light-bg">
//       {/* Hero Section */}
//       <section className="min-h-screen bg-secondary text-white flex items-center">
//         <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
//           <div
//             ref={addToRefs}
//             className="animate-on-scroll md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
//           >
//             <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
//               Transforming Your Data into Actionable Insights
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300 mb-8">
//               We help you unlock the power of your business data with intuitive
//               and powerful dashboards.
//             </p>
//             <a
//               href="#services"
//               className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
//             >
//               Explore Services
//             </a>
//           </div>
//           <div ref={addToRefs} className="animate-on-scroll md:w-5/12 w-full">
//             <div className="relative rounded-lg shadow-2xl overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{
//                   transform: `translateX(-${currentSlide * 100}%)`,
//                 }}
//               >
//                 {dashboardImages.map((src, i) => (
//                   <Image
//                     key={i}
//                     src={src}
//                     alt={`Data Dashboard ${i + 1}`}
//                     width={600}
//                     height={400}
//                     className="w-full flex-shrink-0"
//                   />
//                 ))}
//               </div>
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//                 {dashboardImages.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentSlide(i)}
//                     className={`w-3 h-3 rounded-full ${
//                       currentSlide === i ? "bg-primary" : "bg-gray-400"
//                     }`}
//                   ></button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-20">
//         <div className="container mx-auto px-6 text-center">
//           <div ref={addToRefs} className="animate-on-scroll">
//             <SectionTitle>Our Services</SectionTitle>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
//             {services.map((service, i) => (
//               <ServiceCard
//                 key={i}
//                 IconComponent={service.icon}
//                 title={service.title}
//                 description={service.description}
//                 addToRefs={addToRefs}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Where We Stand Section - MODIFIED FOR EASIER EDITING */}
//       <section className="py-20 bg-light-card">
//         <div className="container mx-auto px-6 text-center">
//           <div ref={addToRefs} className="animate-on-scroll text-black">
//             <SectionTitle>
//               Where Do You Stand In Data For Your Business?
//             </SectionTitle>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
//             {/* Card 1: Data Reactive */}
//             <div
//               ref={addToRefs}
//               className="animate-on-scroll bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center text-center"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-primary mb-3">
//                   Data Reactive
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Limited use of data, primarily reacting to immediate needs or
//                   issues.
//                 </p>
//               </div>
//               <a
//                 href="#contact"
//                 className="mt-auto border-2 border-primary text-primary font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-white transition duration-300"
//               >
//                 Start Your Journey
//               </a>
//             </div>

//             {/* Card 2: Data Literate */}
//             <div
//               ref={addToRefs}
//               className="animate-on-scroll bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center text-center"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-primary mb-3">
//                   Data Literate
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Foundational understanding of data's value, with employees
//                   equipped with basic data skills.
//                 </p>
//               </div>
//               <a
//                 href="#services"
//                 className="mt-auto border-2 border-primary text-primary font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-white transition duration-300"
//               >
//                 Explore Our Services
//               </a>
//             </div>

//             {/* Card 3: Data Ready */}
//             <div
//               ref={addToRefs}
//               className="animate-on-scroll bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center text-center"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-primary mb-3">
//                   Data Ready
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Established data infrastructure and governance, enabling
//                   systematic data utilization for decision-making.
//                 </p>
//               </div>
//               <a
//                 href="#contact"
//                 className="mt-auto border-2 border-primary text-primary font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-white transition duration-300"
//               >
//                 Optimize Your Strategy
//               </a>
//             </div>

//             {/* Card 4: Data Experts */}
//             <div
//               ref={addToRefs}
//               className="animate-on-scroll bg-white p-6 rounded-lg shadow-md flex flex-col justify-between items-center text-center"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-primary mb-3">
//                   Data Experts
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Advanced expertise in data analytics and utilization, driving
//                   innovation and competitive advantage.
//                 </p>
//               </div>
//               <a
//                 href="#contact"
//                 className="mt-auto border-2 border-primary text-primary font-bold py-2 px-6 rounded-full hover:bg-primary hover:text-white transition duration-300"
//               >
//                 Become an Industry Leader
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Who We Help Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-6 text-center">
//           <div ref={addToRefs} className="animate-on-scroll">
//             <SectionTitle>Who We Can Help</SectionTitle>
//           </div>
//           <p
//             ref={addToRefs}
//             className="animate-on-scroll text-lg text-gray-600 max-w-3xl mx-auto -mt-8 mb-12"
//           >
//             We tailor our data solutions to fit the unique needs of various
//             industries, helping you overcome challenges and seize opportunities.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <IndustryCard
//               image="/service1.jpg"
//               title="E-commerce"
//               description="Optimize your sales funnel, understand customer behavior, and increase your online revenue."
//               bgColor="bg-primary"
//               addToRefs={addToRefs}
//             />
//             <IndustryCard
//               image="/service2.jpg"
//               title="Finance"
//               description="Enhance risk management, detect fraud, and gain a competitive edge with financial analytics."
//               bgColor="bg-secondary"
//               addToRefs={addToRefs}
//             />
//             <IndustryCard
//               image="/service3.jpg"
//               title="Healthcare"
//               description="Improve patient outcomes, streamline operations, and unlock insights from clinical data."
//               bgColor="bg-accent"
//               addToRefs={addToRefs}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Contact Footer */}
//       <footer id="contact" className="bg-secondary text-white py-12">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
//           <p>This is where your contact form or details would go.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }
