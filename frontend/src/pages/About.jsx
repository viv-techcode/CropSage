import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-[76vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">About</h1>
        <p className="text-xl">
          <p className="text-xl">
  This is the About page for CropSage.
</p>
        </p>
      </main>
      <Footer />
    </>
  );
}

export default About;