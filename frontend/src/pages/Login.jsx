import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-[76vh] flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold mb-6">Login</h1>

        <form className="flex flex-col gap-4 w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded text-base"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded text-base"
          />

          <button className="bg-green-600 text-white text-base p-3 rounded">
            Login
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Login;