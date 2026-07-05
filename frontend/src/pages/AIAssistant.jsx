import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRobot } from "react-icons/fa";

const PREDEFINED_QA = {
  "kharif crops": {
    question: "What crops should I plant this Kharif season?",
    answer: (
      <div className="space-y-2">
        <h3 className="font-semibold text-base tracking-wide">Recommended Kharif Crops:</h3>
        <ul className="space-y-2 border-l-2 border-green-500/30 pl-3">
          <li className="transition-all duration-300 hover:translate-x-1">
            <strong className="text-green-500 dark:text-green-400">Groundnut (94% compatibility)</strong>
            <p className="text-xs opacity-80 mt-0.5">Ideal for your current soil moisture.</p>
          </li>
          <li className="transition-all duration-300 hover:translate-x-1">
            <strong className="text-green-500 dark:text-green-400">Soybean (88% compatibility)</strong>
            <p className="text-xs opacity-80 mt-0.5">Good market demand and nitrogen-fixing traits.</p>
          </li>
          <li className="transition-all duration-300 hover:translate-x-1">
            <strong className="text-green-500 dark:text-green-400">Cotton (74% compatibility)</strong>
            <p className="text-xs opacity-80 mt-0.5">Viable if early monsoon rains are steady.</p>
          </li>
        </ul>
      </div>
    ),
  },
  "pest control for soybean": {
    question: "How do I manage pests in my Soybean crop?",
    answer: "For common soybean pests like the girdle beetle or semilooper, monitor your fields early. Use pheromone traps (5/acre) or consider spraying Neem oil (1500 ppm) at early stages before resorting to chemical controls.",
  },
  "soybean disease": {
    question: "What are the common diseases in Soybean?",
    answer: "Soybeans are susceptible to Rust and Yellow Mosaic Virus. Ensure you use disease-resistant seed varieties, maintain proper spacing, and remove infected plants promptly to prevent field-wide spread.",
  },
  "monsoon sowing timing": {
    question: "When is the ideal time for monsoon sowing?",
    answer: "Sowing should ideally begin after the area receives at least 50mm to 60mm of continuous monsoon rainfall and the soil moisture reaches a depth of 10-15 cm.",
  },
  "harvest timing": {
    question: "What is the best timing for harvesting Kharif crops?",
    answer: "Harvesting generally begins post-monsoon around October-November when the leaves turn yellow and dry, and seed moisture drops down to safer margins (under 14% for grains).",
  },
  "groundnut market prices": {
    question: "What are the current groundnut market prices?",
    answer: "Current market trends show Groundnut prices fluctuating between ₹6,500 to ₹7,200 per quintal depending on the grade and moisture content in your nearest APMC mandis.",
  },
  "cotton prices": {
    question: "What are the current Cotton market prices?",
    answer: "Cotton prices are currently trading between ₹7,000 to ₹7,800 per quintal, strongly influenced by regional quality parameters and global export demands.",
  },
};

function AIAssistant() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const messagesEndRef = useRef(null);

  const initialGreeting = [
    {
      id: "init-ai",
      sender: "ai",
      content: "Namaste! I am your CropSage AI Farm Assistant. Ask me about crop selection, pest control, irrigation or market prices.",
    },
  ];

  const [messages, setMessages] = useState(initialGreeting);
  const [inputValue, setInputValue] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTriggerQA = (key) => {
    const normalizedKey = key.toLowerCase().trim();
    const qaPair = PREDEFINED_QA[normalizedKey];
    const batchId = Date.now(); 

    if (qaPair) {
      const userMsg = { id: `user-${batchId}`, sender: "user", content: qaPair.question };
      const aiMsg = { id: `ai-${batchId}`, sender: "ai", content: qaPair.answer };
      setMessages((prev) => [...prev, userMsg, aiMsg]);
    } else {
      const userMsg = { id: `user-${batchId}`, sender: "user", content: key };
      const aiMsg = { 
        id: `ai-${batchId}`, 
        sender: "ai", 
        content: "I couldn't find an exact match for that query. Try clicking on one of our quick suggestions or recent topics!" 
      };
      setMessages((prev) => [...prev, userMsg, aiMsg]);
    }
  };

  const handleSendCustomInput = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    handleTriggerQA(inputValue);
    setInputValue("");
  };

  const resetChat = () => {
    setMessages(initialGreeting);
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden antialiased transition-colors duration-500 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      <Navbar />

      {/* Main Viewport Container */}
      <section className="flex flex-1 overflow-hidden relative">
        
        {/* Decorative Ambient Soft Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Sidebar - Glassmorphic Styling */}
        <aside className={`w-72 p-5 border-r hidden md:flex flex-col relative z-10 backdrop-blur-md transition-colors duration-300 ${
          darkMode 
            ? "bg-slate-900/60 border-slate-800/80 shadow-[inset_-1px_0_0_0_rgba(255,255,255,0.05)]" 
            : "bg-white/60 border-slate-200/80 shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.02)]"
        }`}>
          <button 
            onClick={resetChat}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-xl font-medium shadow-md shadow-green-600/10 hover:shadow-lg hover:shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            + New Conversation
          </button>

          <h3 className="mt-8 mb-4 text-xs font-bold uppercase tracking-wider opacity-60">Recent Topics</h3>

          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 scrollbar-thin">
            {[
              { label: "Kharif crop selection", apiKey: "kharif crops" },
              { label: "Pest control for soybean", apiKey: "pest control for soybean" },
              { label: "Monsoon sowing timing", apiKey: "monsoon sowing timing" },
              { label: "Groundnut market prices", apiKey: "groundnut market prices" },
            ].map((topic) => (
              <div
                key={topic.label}
                onClick={() => handleTriggerQA(topic.apiKey)}
                className={`group px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                  darkMode 
                    ? "text-slate-400 hover:text-white hover:bg-slate-800/50" 
                    : "text-slate-600 hover:text-green-700 hover:bg-green-50/60"
                }`}
              >
                {/* Active/Hover line marker micro-interaction */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-green-500 rounded-r transition-all duration-300 group-hover:h-1/2" />
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 inline-block">
                  {topic.label}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex flex-1 flex-col h-full overflow-hidden relative z-10">
          
          {/* Header - Glassmorphic Blur */}
          <div className={`flex justify-between items-center px-6 py-4 border-b backdrop-blur-md transition-colors duration-300 ${
            darkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-white/60 border-slate-200/80"
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl relative overflow-hidden group">
                <FaRobot className="text-green-500 text-xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                <span className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base tracking-wide">AI Farm Assistant</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-green-500 font-medium text-xs tracking-wider uppercase">Online</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase opacity-40 px-2 py-1 rounded-md bg-slate-500/5 border border-slate-500/10">
              CropSage-v2
            </p>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-xl rounded-2xl px-4.5 py-3.5 shadow-sm text-sm sm:text-base leading-relaxed tracking-wide transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md shadow-green-600/10 rounded-br-none hover:shadow-lg hover:shadow-green-600/15"
                      : darkMode
                      ? "bg-slate-900/80 text-slate-100 border border-slate-800/80 backdrop-blur-sm rounded-bl-none shadow-md shadow-slate-950/20"
                      : "bg-white/90 text-slate-900 border border-slate-200/60 backdrop-blur-sm rounded-bl-none shadow-md shadow-slate-200/30"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions - Horizontal Scrolling Micro-chips */}
          <div className="px-6 py-2.5 flex gap-2 overflow-x-auto no-scrollbar mask-image-edges">
            {[
              { text: "🍁 Kharif crops", key: "Kharif crops" },
              { text: "⏱️ Harvest timing", key: "Harvest timing" },
              { text: "🦠 Soybean disease", key: "Soybean disease" },
              { text: "📈 Cotton prices", key: "Cotton prices" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleTriggerQA(item.key)}
                className={`whitespace-nowrap text-xs rounded-full px-4 py-2 font-medium border transition-all duration-300 hover:scale-[1.04] active:scale-[0.96] ${
                  darkMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-green-500/50 hover:bg-green-500/5 hover:text-green-400"
                    : "border-slate-200 bg-white/50 text-slate-600 hover:border-green-500/50 hover:bg-green-50/50 hover:text-green-700"
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Form Input Container */}
          <div className={`p-4 border-t transition-colors duration-300 ${
            darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50/40 border-slate-200/80"
          }`}>
            <form
              onSubmit={handleSendCustomInput}
              className={`max-w-4xl mx-auto border rounded-2xl p-1.5 flex gap-2 shadow-inner group transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500/20 ${
                darkMode 
                  ? "bg-slate-900/90 border-slate-800 focus-within:border-green-500/50 shadow-slate-950" 
                  : "bg-white border-slate-200 focus-within:border-green-500/50 shadow-slate-100"
              }`}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Ask about crops, weather, pests... (e.g. 'Kharif crops')"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 rounded-xl font-medium text-sm tracking-wide shadow-sm hover:shadow-md hover:shadow-green-600/10 transition-all duration-300 active:scale-95"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </section>

      <Footer />
    </div>
  );
}

export default AIAssistant;