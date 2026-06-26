import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRobot } from "react-icons/fa";

function AIAssistant() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <>
      <Navbar />

      <section
  className={`flex h-[calc(100vh-80px)] ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
  }`}
>
  {/* Sidebar */}
  <aside
    className={`w-72 p-5 border-r ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
      + New Conversation
    </button>

    <h3 className="mt-6 mb-3 font-semibold">Recent</h3>

    <div className="space-y-2">
      <div className="p-3 rounded-lg hover:bg-green-100 cursor-pointer">
        Kharif crop selection
      </div>

      <div className="p-3 rounded-lg hover:bg-green-100 cursor-pointer">
        Pest control for soybean
      </div>

      <div className="p-3 rounded-lg hover:bg-green-100 cursor-pointer">
        Monsoon sowing timing
      </div>

      <div className="p-3 rounded-lg hover:bg-green-100 cursor-pointer">
        Groundnut market prices
      </div>
    </div>
  </aside>

  {/* Chat Area */}
  <main className="flex flex-1 flex-col">

    {/* Header */}
    <div
      className={`flex justify-between items-center px-6 py-4 border-b ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <FaRobot className="text-green-600 text-2xl" />

        <div>
          <h2 className="font-bold">AI Farm Assistant</h2>
          <p className="text-green-600 text-sm">● Online</p>
        </div>
      </div>

      <p className="text-sm">Model: CropSage-v2</p>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      <div className="max-w-xl bg-white text-black rounded-xl p-4 shadow">
        Namaste! I am your CropSage AI Farm Assistant.
        Ask me about crop selection, pest control,
        irrigation or market prices.
      </div>

      <div className="flex justify-end">
        <div className="bg-green-600 text-white rounded-xl p-4 max-w-md">
          What crops should I plant this Kharif season?
        </div>
      </div>

      <div className="max-w-xl bg-white text-black rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-2">Recommended Crops</h3>

        <ul className="list-disc ml-5">
          <li>Groundnut (94%)</li>
          <li>Soybean (88%)</li>
          <li>Cotton (74%)</li>
        </ul>
      </div>

    </div>

    {/* Suggestions */}
    <div className="px-6 py-3 flex gap-3 flex-wrap">
      {[
        "Kharif crops",
        "Harvest timing",
        "Soybean disease",
        "Cotton prices",
      ].map((item) => (
        <button
          key={item}
          className="border border-green-600 text-green-600 rounded-full px-4 py-2 hover:bg-green-600 hover:text-white"
        >
          {item}
        </button>
      ))}
    </div>

    {/* Input */}
    <div
      className={`border-t p-4 flex gap-3 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <input
        className="flex-1 border rounded-lg px-4 py-3 text-black"
        placeholder="Ask about crops, weather, pests..."
      />

      <button className="bg-green-600 text-white px-6 rounded-lg">
        Send
      </button>
    </div>
  </main>
</section>

      <Footer />
    </>
  );
}

export default AIAssistant;