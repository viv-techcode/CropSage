import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center text-center px-4 md:px-6 py-8">
        <Hero />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-6xl w-full">
          <Card
            title="Smart Crop Planner"
            description="Suggests suitable crops based on location, season, land size, and weather conditions."
          />

          <Card
            title="Market Price Intelligence"
            description="Tracks mandi prices and market trends to help farmers find better selling opportunities."
          />

          <Card
            title="Harvest Profit Calculator"
            description="Estimates profits using cultivation costs, expected yields, and market prices."
          />

          <Card
            title="AI Farm Assistant"
            description="Provides simple answers and personalized guidance on farming decisions."
          />

          <Card
            title="Weather Risk Alerts"
            description="Sends alerts about weather risks such as heavy rain, heatwaves, and storms."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;