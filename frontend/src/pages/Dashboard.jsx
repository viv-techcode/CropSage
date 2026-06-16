import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-[76vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Dashboard</h1>

        <p className="text-xl">
          This is the Dashboard page.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;