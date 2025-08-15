// app/data/page.js (or pages/data.js)

"use client";

import { motion } from "framer-motion";
import DashboardCard from "../components/DashboardCard"; // Adjust path if needed
import {
  FaBuilding,
  FaMapMarkedAlt,
  FaMapPin,
  FaUsers,
  FaLayerGroup,
  FaWater,
  FaTree,
  FaMountain,
} from "react-icons/fa";

// --- Data for Dashboard Previews ---
// This array now includes stats and a color for each card.
const dashboardData = [
  {
    icon: <FaBuilding className="text-4xl text-black" />,
    color: "",
    title: "Infrastructure",
    description:
      "Analyze transportation networks, energy facilities, communication systems, and public services.",
    stats: [
      { value: "2,500+", label: "Roads (km)" },
      { value: "85%", label: "Energy Access" },
    ],
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-green-500" />,
    color: "green",
    title: "Admin Boundaries",
    description:
      "Visualize national borders down to local districts for powerful spatial analysis and planning.",
    stats: [
      { value: "5", label: "Provinces" },
      { value: "30", label: "Districts" },
    ],
  },
  {
    icon: <FaMapPin className="text-4xl text-red-500" />,
    color: "red",
    title: "Points of Interest",
    description:
      "Leverage a rich database of landmarks, businesses, and amenities to enhance geospatial applications.",
    stats: [
      { value: "10k+", label: "Locations" },
      { value: "15", label: "Categories" },
    ],
  },
  {
    icon: <FaUsers className="text-4xl text-purple-500" />,
    color: "purple",
    title: "Socio-economic",
    description:
      "Gain insights from demographics, economic indicators, and social trends to support research.",
    stats: [
      { value: "13M+", label: "Population" },
      { value: "4.8%", label: "Growth" },
    ],
  },
  {
    icon: <FaLayerGroup className="text-4xl text-yellow-500" />,
    color: "yellow",
    title: "Land",
    description:
      "Access detailed land use, land cover, and property information for urban planning and resource management.",
    stats: [
      { value: "92%", label: "Coverage" },
      { value: "7", label: "Use Types" },
    ],
  },
  {
    icon: <FaWater className="text-4xl text-cyan-500" />,
    color: "cyan",
    title: "Hydrography",
    description:
      "Explore rivers, lakes, and water bodies for environmental modeling and water resource analysis.",
    stats: [
      { value: "1,000+", label: "Rivers" },
      { value: "100+", label: "Lakes" },
    ],
  },
  {
    icon: <FaTree className="text-4xl text-lime-500" />,
    color: "lime",
    title: "Environment",
    description:
      "Utilize climate records and biodiversity data to support sustainability and conservation efforts.",
    stats: [
      { value: "24°C", label: "Avg Temp" },
      { value: "4", label: "Nat. Parks" },
    ],
  },
  {
    icon: <FaMountain className="text-4xl text-indigo-500" />,
    color: "indigo",
    title: "Topography",
    description:
      "Use high-resolution elevation models and contour lines for detailed terrain analysis and visualization.",
    stats: [
      { value: "4,507m", label: "Highest Pt." },
      { value: "10m", label: "Resolution" },
    ],
  },
];

// --- Animation Variant for the container ---
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const DataPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Header Section --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Data Dashboards
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We transform raw data into interactive dashboards, providing clear
            insights to drive better decision-making across all sectors.
          </p>
        </motion.div>

        {/* --- Dashboard Grid --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {dashboardData.map((data, index) => (
            <DashboardCard
              key={index}
              icon={data.icon}
              title={data.title}
              description={data.description}
              stats={data.stats}
              color={data.color}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DataPage;
