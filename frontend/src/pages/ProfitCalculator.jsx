import { useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Sprout, 
  Layers, 
  Coins,
  ArrowRight 
} from "lucide-react";

export default function ProfitCalculator() {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [yieldPerAcre, setYieldPerAcre] = useState("");
  const [price, setPrice] = useState("");

  // Expense states managed as strings to allow natural typing/backspacing
  const [seed, setSeed] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [labor, setLabor] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [other, setOther] = useState("");

  // Helper to safely parse inputs to numeric values
  const parseNum = (val) => (val === "" ? 0 : Number(val));

  // Core Calculations
  const numericArea = parseNum(area);
  const numericYield = parseNum(yieldPerAcre);
  const numericPrice = parseNum(price);

  const totalYield = numericArea * numericYield;
  const revenue = totalYield * numericPrice;

  const costSeed = parseNum(seed);
  const costFertilizer = parseNum(fertilizer);
  const costLabor = parseNum(labor);
  const costIrrigation = parseNum(irrigation);
  const costOther = parseNum(other);

  const totalCost = costSeed + costFertilizer + costLabor + costIrrigation + costOther;
  const profit = revenue - totalCost;
  const isProfitable = profit >= 0;
  const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow-sm border border-white dark:border-gray-800">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-inner animate-pulse">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Smart Profit Estimator
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Analyze yields, manage operational investments, and evaluate net crop margins.
            </p>
          </div>
        </div>

        {/* Main Interface Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section 1: Yield Configurations */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-semibold text-lg border-b pb-2 border-gray-100 dark:border-gray-800">
                <Sprout size={20} />
                <h2>Production Parameters</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Crop Identity</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="e.g., Wheat, Paddy, Cotton"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Cultivation Area (Acres)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="Total Acres"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Avg Yield (kg / acre)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="Expected Yield"
                    value={yieldPerAcre}
                    onChange={(e) => setYieldPerAcre(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Target Market Price (₹ / kg)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-gray-400 text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      className="w-full border border-gray-200 rounded-xl p-3 pl-7 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                      placeholder="Selling Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Expenditure Configurations */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400 font-semibold text-lg border-b pb-2 border-gray-100 dark:border-gray-800">
                <Coins size={20} />
                <h2>Cost Breakdown (₹)</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Seeds & Sowing", val: seed, set: setSeed },
                  { label: "Fertilizers & Pesticides", val: fertilizer, set: setFertilizer },
                  { label: "Labor & Machinery", val: labor, set: setLabor },
                  { label: "Irrigation Setup", val: irrigation, set: setIrrigation },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                      placeholder="0"
                      value={item.val}
                      onChange={(e) => item.set(e.target.value)}
                    />
                  </div>
                ))}
                
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Other Miscellaneous Expenses</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="Logistics, storage, lease etc."
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Summary Panel */}
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            
            {/* Visual KPI Cards */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800 space-y-6">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <Layers size={22} className="text-blue-500" /> Output Balance Sheet
              </h2>

              <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                <div className="flex justify-between py-3 transform transition-all hover:translate-x-1">
                  <span className="text-gray-500">Total Production Yield</span>
                  <span className="font-semibold dark:text-gray-200">{totalYield.toLocaleString()} kg</span>
                </div>

                <div className="flex justify-between py-3 transform transition-all hover:translate-x-1">
                  <span className="text-gray-500">Gross Estimated Revenue</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{revenue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-3 transform transition-all hover:translate-x-1">
                  <span className="text-gray-500">Cumulative Operational Cost</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">₹{totalCost.toLocaleString()}</span>
                </div>

                <div className="pt-4 mt-2">
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl shadow-inner group transition-all duration-300">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Estimated Net Income</p>
                      <p className={`text-2xl font-black mt-1 transition-colors duration-300 ${isProfitable ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
                        ₹{profit.toLocaleString()}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${isProfitable ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600" : "bg-rose-100 dark:bg-rose-950 text-rose-600"} transition-all duration-300 group-hover:scale-110`}>
                      {isProfitable ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis & Progress Widget */}
            <div className={`rounded-2xl p-6 shadow-xl text-white transition-all duration-500 transform hover:-translate-y-1 ${isProfitable ? "bg-gradient-to-br from-emerald-600 to-teal-700" : "bg-gradient-to-br from-rose-600 to-orange-700"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={22} className="animate-bounce" />
                  <h3 className="font-bold text-lg">Profitability Analysis</h3>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  Margin: {profitMargin}%
                </span>
              </div>

              <div className="space-y-2 text-sm bg-black/10 p-3 rounded-xl backdrop-blur-xs">
                <p>Crop Focus: <strong className="underline decoration-wavy decoration-white/40">{crop || "Not specified"}</strong></p>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-white h-1.5 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${Math.min(Math.max(parseFloat(profitMargin), 0), 100)}%` }}
                  ></div>
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-white/90 flex items-center gap-1.5">
                <ArrowRight size={14} />
                {isProfitable 
                  ? "Your operations demonstrate positive net metrics. Scaling safely is recommended." 
                  : "Operational losses detected. Re-verify input market pricing parameters or seed-to-scale costs."}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}