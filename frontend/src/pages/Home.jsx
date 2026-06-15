import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <Card title="Crop Planner" />
      <Card title="Market Prices" />

      <Footer />
    </>
  );
}

export default Home;