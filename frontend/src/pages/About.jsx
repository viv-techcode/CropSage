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
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-500 selection:bg-emerald-500 selection:text-white">
        
        <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800 dark:from-slate-900 dark:via-emerald-950 dark:to-teal-950 text-white py-28 px-6 transition-all duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/10 dark:bg-emerald-500/20 text-emerald-200 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/15 dark:border-emerald-500/30 shadow-inner">
              Empowering Agriculture
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
              About CropSage
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-emerald-50/80 font-light leading-relaxed">
              Farming decisions, backed by data — <span className="font-medium text-emerald-200">not guesswork.</span>
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="group bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 lg:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-4 tracking-tight text-green-700 dark:text-emerald-400">
                What We Do
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-light">
                CropSage transforms weather forecasts, soil conditions, and
                market intelligence into clear, practical recommendations that
                help farmers make better decisions throughout the season.
              </p>
            </div>

            <div className="group bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 lg:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-4 tracking-tight text-green-700 dark:text-emerald-400">
                Why It Matters
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-light">
                Many crop losses happen because critical decisions are made with
                limited information. CropSage helps bridge that gap by putting
                reliable insights directly into farmers' hands.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-100/70 to-white dark:from-slate-900/40 dark:to-transparent py-24 border-y border-slate-200/50 dark:border-slate-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center tracking-tight mb-4 text-slate-800 dark:text-white">
              Who It's For
            </h2>
            <p className="text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
              Built for the realities of rural and semi-urban farming — low
              connectivity, mixed literacy levels, and decisions that cannot wait.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.08)] dark:hover:shadow-black/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl text-emerald-600 dark:text-emerald-400 mb-5 bg-emerald-50 dark:bg-emerald-950/50 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500 transition-all duration-300">
                    {user.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 tracking-tight">
                    {user.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    {user.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center tracking-tight mb-4 text-slate-800 dark:text-white">
              Five Tools. One Smarter Growing Season.
            </h2>
            <p className="text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
              From crop selection to harvest planning, CropSage combines
              intelligent recommendations, market insights, and weather awareness into one unified farming platform.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] dark:shadow-none p-8 border border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.08)] dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="text-3xl text-emerald-600 dark:text-emerald-400 mb-6 bg-slate-50 dark:bg-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-tr from-emerald-800 to-green-700 dark:from-emerald-950 dark:to-slate-900 text-white py-24 px-6 transition-colors duration-500">
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[2px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-4xl text-emerald-300/40 font-serif block mb-2 pointer-events-none select-none">“</span>
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed italic tracking-wide text-emerald-50">
              "Every season brings critical decisions. CropSage helps farmers make 
              them with confidence through data-driven insights, market intelligence, 
              and timely guidance."
            </blockquote>
            <p className="mt-6 text-emerald-300 font-semibold uppercase tracking-wider text-sm">
              — The CropSage Team
            </p>
          </div>
        </section>

        <section className="py-24 text-center max-w-4xl mx-auto px-6">
          <div className="inline-block p-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 mb-6 shadow-inner">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-green-700 dark:text-emerald-400">
            CropSage
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-light">
            AI-powered farming for smarter agricultural decisions.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;