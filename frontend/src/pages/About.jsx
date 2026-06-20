import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const [lang, setLang] = useState("en");

  const content = {
    en: {
      title: "Farming decisions, backed by data — not guesswork.",
      subtitle:
        "CropSage is an AI-powered farming platform that helps farmers grow more profitably.",
      audienceTitle: "Built for the people who work the land.",
      audience: [
        "Individual Farmers",
        "Agricultural Cooperatives",
        "Small-scale Farm Owners",
        "Rural & Semi-urban Communities",
      ],
      features: [
        {
          title: "Smart Crop Planner",
          desc: "Recommends suitable crops based on location, season, land size and weather.",
        },
        {
          title: "Market Price Intelligence",
          desc: "Real-time mandi and market prices with trend analysis.",
        },
        {
          title: "Harvest Profit Calculator",
          desc: "Estimate earnings using yield, costs and market prices.",
        },
        {
          title: "AI Farm Assistant",
          desc: "Personalized farming guidance in simple language.",
        },
        {
          title: "Weather Risk Alerts",
          desc: "Warnings for heavy rainfall, storms and heatwaves.",
        },
      ],
      quote:
        "Every season, farmers make dozens of decisions with too little information. CropSage exists to put that information back in their hands.",
    },

    hi: {
      title: "खेती के फ़ैसले, अब अंदाज़े पर नहीं — डेटा पर आधारित।",
      subtitle:
        "CropSage किसानों को बेहतर मुनाफ़े के साथ खेती करने में मदद करता है।",
      audienceTitle: "ज़मीन पर मेहनत करने वालों के लिए बनाया गया।",
      audience: [
        "व्यक्तिगत किसान",
        "कृषि सहकारी समितियाँ",
        "छोटे फ़ार्म मालिक",
        "ग्रामीण समुदाय",
      ],
      features: [
        {
          title: "स्मार्ट क्रॉप प्लानर",
          desc: "स्थान, मौसम और ज़मीन के आधार पर फ़सल सुझाव।",
        },
        {
          title: "मार्केट प्राइस इंटेलिजेंस",
          desc: "रियल-टाइम मंडी भाव और बाज़ार विश्लेषण।",
        },
        {
          title: "हार्वेस्ट प्रॉफिट कैलकुलेटर",
          desc: "लागत, उपज और बाज़ार मूल्य से लाभ का अनुमान।",
        },
        {
          title: "AI फ़ार्म असिस्टेंट",
          desc: "सरल भाषा में कृषि मार्गदर्शन।",
        },
        {
          title: "वेदर रिस्क अलर्ट",
          desc: "बारिश, लू और तूफ़ान की चेतावनी।",
        },
      ],
      quote:
        "CropSage किसानों को उनकी भाषा में सही जानकारी पहुँचाने के लिए बनाया गया है।",
    },
  };

  const t = content[lang];

  return (
    <>
      <Navbar />

      <main className="bg-[#F6F1E2] text-[#21261C] min-h-screen">
        {/* Language Switcher */}
        <section className="border-b border-[#D8CBA8] bg-[#EFE6CE]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  lang === "en"
                    ? "bg-green-800 text-white"
                    : "bg-white border"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLang("hi")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  lang === "hi"
                    ? "bg-green-800 text-white"
                    : "bg-white border"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <span className="uppercase tracking-widest text-orange-600 text-sm font-bold">
            About CropSage
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4 max-w-4xl leading-tight text-green-950">
            {t.title}
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-3xl">
            {t.subtitle}
          </p>
        </section>

        {/* Audience */}
        <section className="bg-[#22361F] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              {t.audienceTitle}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.audience.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#2B4327] p-6 border border-green-900"
                >
                  <h3 className="text-white font-semibold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-green-950 mb-12">
            Five tools, one season-long companion.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-[#D8CBA8] p-6 rounded-md shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-green-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-[#EFE6CE] border-y border-[#D8CBA8]">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <blockquote className="text-2xl md:text-3xl font-serif text-green-950 leading-relaxed">
              "{t.quote}"
            </blockquote>

            <p className="mt-6 text-gray-600">— CropSage Team</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;