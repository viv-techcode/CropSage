import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Wheat } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 border-b border-slate-200/60 dark:border-slate-900 py-24 lg:py-32">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-green-200 bg-green-50/80 dark:border-emerald-800/60 dark:bg-emerald-950/30 backdrop-blur-sm px-4 py-2 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-emerald-400 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI-Powered Agriculture Platform
                </div>

                <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                  Smarter Farming with
                  <span className="block mt-2 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                    CropSage
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                  Intelligent crop recommendations, real-time market prices,
                  weather alerts, profit estimation and AI-powered farming
                  guidance—all from one simple platform.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="group rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 dark:shadow-none hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    View Dashboard
                  </button>

                  <Link
                    to="/register"
                    className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-7 py-3.5 font-semibold text-slate-800 shadow-sm hover:shadow-md hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>

              <div className="relative group lg:ml-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-[2rem] blur-2xl opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                
                <div className="overflow-hidden rounded-[2rem] shadow-2xl border border-slate-200/50 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900 transition-transform duration-500 group-hover:scale-[1.01]">
                  <img
                    src="/images.jpg"
                    alt="CropSage Agriculture"
                    className="h-[460px] w-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-6 left-6 right-6 sm:right-auto sm:w-80 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-black/50 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Recommendation</p>
                  <h3 className="mt-1.5 text-xl font-extrabold text-green-700 dark:text-emerald-400 tracking-tight flex items-center gap-1.5">
                    Best Crop: Wheat <Wheat className="animate-bounce duration-1000 h-5 w-5 inline-block" />
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    Estimated Profit <span className="text-emerald-600 dark:text-emerald-400 font-bold">+18%</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-28">
          <div className="mb-16 text-center sm:text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-md">Capabilities</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-3 tracking-tight">Core Features</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full mt-3 mx-auto sm:mx-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="hover:-translate-y-1.5 transition-transform duration-300">
              <Card
                title="Smart Crop Planner"
                description="Suggests suitable crops based on location, season, land size, and weather conditions."
              />
            </div>
            <div className="hover:-translate-y-1.5 transition-transform duration-300">
              <Card
                title="Market Price Intelligence"
                description="Tracks mandi prices and market trends to help farmers find better selling opportunities."
              />
            </div>
            <div className="hover:-translate-y-1.5 transition-transform duration-300">
              <Card
                title="Harvest Profit Calculator"
                description="Estimates profits using cultivation costs, expected yields, and market prices."
              />
            </div>
            <div className="hover:-translate-y-1.5 transition-transform duration-300">
              <Card
                title="AI Farm Assistant"
                description="Provides simple answers and personalized guidance on farming decisions."
              />
            </div>
            <div className="hover:-translate-y-1.5 transition-transform duration-300">
              <Card
                title="Weather Risk Alerts"
                description="Sends alerts about weather risks such as heavy rain, heatwaves, and storms."
              />
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 dark:from-slate-900 dark:via-emerald-950 dark:to-teal-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-emerald-900/10 dark:shadow-none hover:-translate-y-1.5 transition-transform duration-300 group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">
                  Get Started Today
                </h3>
                <p className="text-emerald-50/80 font-light leading-relaxed">
                  Join thousands of farmers already using CropSage to maximize
                  productivity and seasonal profits.
                </p>
              </div>

              <Link
                to="/register"
                className="mt-8 inline-block bg-white text-green-700 dark:bg-slate-950 dark:text-emerald-400 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-center"
              >
                Create Free Account →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-100/60 to-white dark:from-slate-900/30 dark:to-transparent border-y border-slate-200/50 dark:border-slate-900 py-24 transition-all duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center tracking-tight text-slate-800 dark:text-white mb-16">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="group bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.06)] dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1">
                <span className="text-5xl font-black bg-gradient-to-br from-green-600 to-emerald-400 bg-clip-text text-transparent opacity-80 group-hover:scale-105 inline-block transition-transform duration-300">01</span>
                <h3 className="font-bold text-xl mt-5 text-slate-800 dark:text-white tracking-tight">
                  Enter your farm details
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  Provide your location, land size, soil type and available
                  resources through a simplified dashboard interface.
                </p>
              </div>

              <div className="group bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.06)] dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1">
                <span className="text-5xl font-black bg-gradient-to-br from-green-600 to-emerald-400 bg-clip-text text-transparent opacity-80 group-hover:scale-105 inline-block transition-transform duration-300">02</span>
                <h3 className="font-bold text-xl mt-5 text-slate-800 dark:text-white tracking-tight">
                  Get AI Recommendations
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  Receive verified custom crop options computed directly via local atmospheric, history, and real-time parameters.
                </p>
              </div>

              <div className="group bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.06)] dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1">
                <span className="text-5xl font-black bg-gradient-to-br from-green-600 to-emerald-400 bg-clip-text text-transparent opacity-80 group-hover:scale-105 inline-block transition-transform duration-300">03</span>
                <h3 className="font-bold text-xl mt-5 text-slate-800 dark:text-white tracking-tight">
                  Track & Optimize
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  Continuously track dynamic wholesale updates, local weather risk systems, and seasonal strategy parameters.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-28">
          <div className="mb-14 text-center md:text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-md">Impact</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-3 tracking-tight">Farmer Stories</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <p className="italic text-slate-700 dark:text-slate-300 text-lg font-light leading-relaxed">
                "CropSage recommended switching from cotton to groundnut. My net business profits increased by 34% this past seasonal stretch."
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white tracking-tight">Ramesh Patel</h4>
                  <span className="text-sm text-slate-400 dark:text-slate-500">Anand, Gujarat</span>
                </div>
                <span className="text-xs font-semibold bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-100 dark:border-green-900/30">+34% Yield</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <p className="italic text-slate-700 dark:text-slate-300 text-lg font-light leading-relaxed">
                "Market price alerts helped me sell my lychee load at the perfect local time structural mark instead of settling for a low baseline dealer offer."
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white tracking-tight">Sunita Devi</h4>
                  <span className="text-sm text-slate-400 dark:text-slate-500">Muzaffarpur, Bihar</span>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">Market Guard</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;