import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCrops } from "../context/CropContext";
import { 
  LayoutDashboard, 
  Sprout, 
  CircleDollarSign, 
  Calculator, 
  Bot, 
  CloudSun, 
  AlertTriangle, 
  TrendingUp, 
  History 
} from "lucide-react";

const alerts = [
  {
    title: "Heavy Rain",
    level: "High",
    levelColor: "bg-red-500/10 text-red-500 border-red-500/20",
    date: "24 Jun",
    advice: "Delay sowing for 3 days",
  },
  {
    title: "High Humidity",
    level: "Medium",
    levelColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    date: "26 Jun",
    advice: "Monitor fungal disease",
  },
  {
    title: "Cloudy Weather",
    level: "Low",
    levelColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    date: "28 Jun",
    advice: "Minor impact expected",
  },
];

const getNavLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ease-out group hover:translate-x-1 ${
    isActive
      ? "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] scale-[1.02]"
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
  }`;

function Dashboard() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const { crops, loading } = useCrops();

  const totalQuantity = crops ? crops.reduce((sum, crop) => sum + crop.quantity, 0) : 0;
  const estimatedValue = crops ? crops.reduce((sum, crop) => sum + crop.quantity * crop.price, 0) : 0;
  const locations = crops ? new Set(crops.map((c) => c.location)).size : 0;

  const stats = [
    {
      title: "Total Crops",
      value: crops ? crops.length : 0,
      info: "Active Crops",
      glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    },
    {
      title: "Total Quantity",
      value: `${totalQuantity.toLocaleString()} kg`,
      info: "Inventory",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
    {
      title: "Estimated Value",
      value: `₹${estimatedValue.toLocaleString()}`,
      info: "Market Value",
      glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    },
    {
      title: "Locations",
      value: locations,
      info: "Farm Locations",
      glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-medium tracking-wide animate-pulse">Loading Dashboard...</span>
      </div>
    );
  }

  const glassPanel = `backdrop-blur-md border rounded-2xl transition-all duration-300 ease-in-out ${
    darkMode 
      ? "bg-slate-900/70 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-slate-100" 
      : "bg-white/80 border-slate-200/50 shadow-[0_8px_32px_0_rgba(148,163,184,0.1)] text-slate-800"
  }`;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${darkMode ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}>
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        <aside className={`w-full md:w-64 flex flex-col justify-between p-6 shrink-0 h-fit sticky top-24 ${glassPanel}`}>
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4 px-2">
              Navigation
            </h3>
            <ul className="space-y-1.5">
              {[
                { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
                { to: "/crop-planner", label: "Crop Planner", icon: <Sprout size={18} /> },
                { to: "/market-prices", label: "Market Prices", icon: <CircleDollarSign size={18} /> },
                { to: "/profit-calculator", label: "Profit Calculator", icon: <Calculator size={18} /> },
                { to: "/ai-assistant", label: "AI Assistant", icon: <Bot size={18} /> },
                { to: "/weather", label: "Weather", icon: <CloudSun size={18} /> },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={getNavLinkClass}>
                    <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              RP
            </div>
            <div>
              <h4 className="font-semibold text-sm leading-none text-slate-800 dark:text-slate-100">Ramesh P.</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Anand, GJ</p>
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/10 backdrop-blur-sm">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Good Morning, Ramesh
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Kharif Season • Saturday, 21 June 2026
            </p>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
              <div 
                className={`${glassPanel} ${item.glow} p-5 flex flex-col justify-between hover:scale-[1.03] active:scale-[0.98] cursor-pointer`} 
                key={item.title}
              >
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  {item.title}
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight my-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {item.value}
                </h2>
                <small className="text-xs font-medium text-emerald-500 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit">
                  {item.info}
                </small>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className={`${glassPanel} p-6`}>
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <Sprout className="text-emerald-500" size={20} /> Crop Inventory
                </h3>
                {!crops || crops.length === 0 ? (
                  <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-6">No crops added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {crops.map((crop) => {
                      const percentage = totalQuantity ? Math.min((crop.quantity / totalQuantity) * 100, 100) : 0;
                      return (
                        <div className="group space-y-2 hover:bg-slate-50/50 dark:hover:bg-white/5 p-2 rounded-xl transition-colors duration-200" key={crop._id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-sm group-hover:text-emerald-500 transition-colors duration-200">
                                {crop.cropName}
                              </h4>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                {crop.location} • {crop.season}
                              </p>
                            </div>
                            <strong className="text-sm font-bold tracking-tight">
                              {crop.quantity.toLocaleString()} {crop.unit}
                            </strong>
                          </div>
                          
                          <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className={`${glassPanel} p-6 relative overflow-hidden group`}>
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" size={20} /> Market Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                      ₹{estimatedValue.toLocaleString()}
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Estimated Total Crop Value</p>
                  </div>

                  <hr className="border-slate-200/50 dark:border-white/10" />

                  <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                      <p className="text-slate-400 dark:text-slate-500 mb-1">Total Quantity</p>
                      <strong className="font-semibold">{totalQuantity.toLocaleString()} kg</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                      <p className="text-slate-400 dark:text-slate-500 mb-1">Locations</p>
                      <strong className="font-semibold">{locations}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                      <p className="text-slate-400 dark:text-slate-500 mb-1">Registered</p>
                      <strong className="font-semibold">{crops ? crops.length : 0} Crops</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`${glassPanel} p-6`}>
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <AlertTriangle className="text-red-500" size={20} /> Weather Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div 
                      className="p-4 rounded-xl border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex flex-col gap-1.5 transition-all duration-300 hover:shadow-md hover:scale-[1.01]" 
                      key={alert.title}
                    >
                      <div className="flex justify-between items-center">
                        <strong className="text-sm font-bold tracking-tight">{alert.title}</strong>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 border rounded-md tracking-wider ${alert.levelColor}`}>
                          {alert.level}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{alert.date}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                        {alert.advice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${glassPanel} p-6`}>
                <h3 className="text-lg font-bold mb-4 tracking-tight flex items-center gap-2">
                  <History className="text-emerald-500" size={20} /> Recent Crops
                </h3>
                <div className="divide-y divide-slate-200/50 dark:divide-white/10">
                  {crops &&
                    crops
                      .slice()
                      .reverse()
                      .slice(0, 5)
                      .map((crop) => (
                        <div
                          key={crop._id}
                          className="flex justify-between items-center py-3 first:pt-0 last:pb-0 transition-all duration-200 hover:translate-x-1"
                        >
                          <div>
                            <strong className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {crop.cropName}
                            </strong>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{crop.location}</p>
                          </div>

                          <div className="text-right">
                            <strong className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                              {crop.quantity} {crop.unit}
                            </strong>
                            <p className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-0.5">
                              ₹{crop.price}/kg
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;