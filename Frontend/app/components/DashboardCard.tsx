// components/DashboardCard.js
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Animation variant for the card itself
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

type Stat = {
  value: string | number;
  label: string;
};

type DashboardCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: Stat[];
  color: string;
};

const DashboardCard = ({ icon, title, description, stats, color }: DashboardCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl border border-gray-100"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-lg mr-4 bg-${color}-100`}>{icon}</div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>

      {/* --- Mini Dashboard Preview --- */}
      <div className="bg-gray-50 p-4 mt-auto border-t border-gray-200">
        <div className="flex justify-around text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className={`text-xl font-bold text-${color}-600`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#" // Replace with actual link to the dashboard
        className={`group block bg-${color}-600 text-white text-center font-semibold py-3 px-6 transition-colors duration-300 hover:bg-${color}-700`}
      >
        <span className="inline-flex items-center">
          Explore Dashboard
          <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>
    </motion.div>
  );
};

export default DashboardCard;
