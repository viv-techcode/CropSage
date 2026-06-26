import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import {
  FaSeedling,
  FaChartLine,
  FaCalculator,
  FaRobot,
  FaCloudSunRain,
  FaUsers,
  FaTractor,
  FaGlobeAsia,
} from "react-icons/fa";

function About() {
  const { theme } = useTheme();
const darkMode = theme === "dark";

console.log("About Theme:", theme);
  const features = [
    {
      icon: <FaSeedling />,
      title: "Smart Crop Planner",
      description:
        "Recommends the most suitable crops based on your location, land size, season, weather patterns, and historical agricultural data.",
    },
    {
      icon: <FaChartLine />,
      title: "Market Price Intelligence",
      description:
        "Real-time mandi and market prices help you compare markets, track trends, and identify the best selling opportunities.",
    },
    {
      icon: <FaCalculator />,
      title: "Harvest Profit Calculator",
      description:
        "Estimate expected earnings by combining cultivation costs, projected yield, and market prices across multiple crop options.",
    },
    {
      icon: <FaRobot />,
      title: "AI Farm Assistant",
      description:
        "Get simple answers and personalized farming guidance on crops, market trends, farming practices, and risk management.",
    },
    {
      icon: <FaCloudSunRain />,
      title: "Weather Risk Alerts",
      description:
        "Receive alerts for heavy rainfall, storms, heatwaves, and other weather risks along with preventive recommendations.",
    },
  ];

  const users = [
    {
      icon: <FaTractor />,
      title: "Individual Farmers",
      description:
        "From smallholders to larger landowners planning crops, harvests, and market timing.",
    },
    {
      icon: <FaUsers />,
      title: "Agricultural Cooperatives",
      description:
        "Coordinate planning, production, and market access across multiple member farms.",
    },
    {
      icon: <FaSeedling />,
      title: "Small-Scale Farm Owners",
      description:
        "Manage costs, improve profitability, and reduce risks with data-driven decisions.",
    },
    {
      icon: <FaGlobeAsia />,
      title: "Rural & Semi-Urban Communities",
      description:
        "Access reliable agricultural information where every decision can impact seasonal income.",
    },
  ];

  return (
    <div>
      <Navbar />
      
      

      {/* Main Content Wrapper */}
      <div className="bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-700 to-emerald-600 dark:from-emerald-900 dark:to-teal-950 text-white py-20 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">About CropSage</h1>
            <p className="text-xl max-w-3xl mx-auto text-green-50 dark:text-emerald-200">
              Farming decisions, backed by data — not guesswork.
            </p>
          </div>
        </section>
        

        {/* Intro Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-green-700 dark:text-emerald-400">What We Do</h2>
              <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
                CropSage transforms weather forecasts, soil conditions, and
                market intelligence into clear, practical recommendations that
                help farmers make better decisions throughout the season.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-green-700 dark:text-emerald-400">Why It Matters</h2>
              <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
                Many crop losses happen because critical decisions are made with
                limited information. CropSage helps bridge that gap by putting
                reliable insights directly into farmers' hands.
              </p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-white dark:bg-slate-800/50 py-20 border-y border-gray-100 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 dark:text-white">
              Who It's For
            </h2>

            <p className="text-center text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
              Built for the realities of rural and semi-urban farming — low
              connectivity, mixed literacy levels, and decisions that cannot
              wait.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-black/30 border border-transparent dark:border-slate-700/50 transition-all"
                >
                  <div className="text-3xl text-green-600 dark:text-emerald-400 mb-4">
                    {user.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                    {user.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-300">{user.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Tools Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 dark:text-white">
              Five Tools. One Smarter Growing Season.
            </h2>

            <p className="text-center text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-14">
              From crop selection to harvest planning, CropSage combines
              intelligent recommendations, market insights, and weather awareness
              into one unified farming platform.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-8 border border-transparent dark:border-slate-700/50 hover:shadow-lg dark:hover:shadow-black/40 transition-all"
                >
                  <div className="text-4xl text-green-600 dark:text-emerald-400 mb-4">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-green-700 dark:bg-emerald-900 text-white py-20 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-3xl font-medium leading-relaxed italic">
              "Every season brings critical decisions. CropSage helps farmers make 
              them with confidence through data-driven insights, market intelligence, 
              and timely guidance."
            </blockquote>

            <p className="mt-6 text-green-100 dark:text-emerald-200 text-lg">
              — The CropSage Team
            </p>
          </div>
        </section>

        {/* Closing Title Wrapper */}
        <section className="py-20 text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-green-700 dark:text-emerald-400">
            CropSage
          </h2>

          <p className="text-xl text-gray-600 dark:text-slate-300">
            AI-powered farming for smarter agricultural decisions.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;