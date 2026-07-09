import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    password: "",
  });

  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <Navbar />

      <main
        className={`relative flex-1 flex items-center justify-center px-4 py-8 md:py-12 overflow-hidden transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-950 via-black to-slate-900"
            : "bg-gradient-to-br from-green-50 via-white to-emerald-100"
        }`}
      >
        <div
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl ${
            darkMode ? "bg-emerald-500/10" : "bg-green-400/30"
          }`}
        />

        <div
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? "bg-green-500/5" : "bg-emerald-300/30"
          }`}
        />

        <div
          className={`relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl grid md:grid-cols-2 border transition-all duration-500 ${
            darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
          }`}
        >
          <div
            className={`flex items-center justify-center p-6 sm:p-8 md:p-12 order-first md:order-last ${
              darkMode
                ? "bg-slate-900/50 border-l border-slate-800"
                : "bg-slate-50/80 border-l border-slate-100"
            }`}
          >
            <div
              className={`w-full max-w-md rounded-[32px] border p-8 transition-all duration-500 ${
                darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-md"
              }`}
            >
              <div className={`flex p-1 rounded-2xl mb-6 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${
                    !isSignUp
                      ? darkMode
                        ? "bg-slate-700 text-white"
                        : "bg-white text-slate-900 shadow"
                      : "text-slate-500"
                  }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${
                    isSignUp
                      ? darkMode
                        ? "bg-slate-700 text-white"
                        : "bg-white text-slate-900 shadow"
                      : "text-slate-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className={`text-3xl font-bold ${darkMode ? "text-emerald-300" : "text-slate-900"}`}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>

              <p className={`mt-2 mb-6 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                {isSignUp ? "Join CropSage today." : "Login to continue."}
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {isSignUp && (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full rounded-xl px-4 py-3 border ${
                      darkMode ? "bg-slate-800 border-slate-600 text-white" : "bg-slate-50 border-slate-300"
                    }`}
                  />
                )}

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  className={`w-full rounded-xl px-4 py-3 border ${
                    darkMode ? "bg-slate-800 border-slate-600 text-white" : "bg-slate-50 border-slate-300"
                  }`}
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full rounded-xl px-4 py-3 pr-12 border ${
                      darkMode ? "bg-slate-800 border-slate-600 text-white" : "bg-slate-50 border-slate-300"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-600/20 hover:opacity-90 active:scale-[0.98] transition-transform"
                >
                  {isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>

              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
              </div>

              <button
                type="button"
                className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 font-medium active:scale-[0.98] transition-transform ${
                  darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-750" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <FaGoogle />
                Continue with Google
              </button>
            </div>
          </div>

          <div
            className={`p-10 flex flex-col justify-center transition-all duration-500 ${
              darkMode ? "bg-slate-950 text-white" : "bg-gradient-to-br from-green-700 to-emerald-800 text-white"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 w-fit text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              AI-Powered Agriculture
            </span>

            <h1 className="text-5xl font-bold mt-6">CropSage</h1>

            <p className={`mt-4 text-lg ${darkMode ? "text-slate-300" : "text-green-50"}`}>
              Smarter farming decisions through AI, weather intelligence and real-time market insights.
            </p>

            <div className="space-y-4 mt-8">
              <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white/15 border-white/20"}`}>
                🌱 Smart Crop Planning
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white/15 border-white/20"}`}>
                📈 Live Mandi Prices
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white/15 border-white/20"}`}>
                ⛅ Weather Risk Alerts
              </div>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-bold">12K+</h3>
                <p className={darkMode ? "text-slate-400" : "text-green-100"}>Farmers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">150+</h3>
                <p className={darkMode ? "text-slate-400" : "text-green-100"}>Mandis</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className={darkMode ? "text-slate-400" : "text-green-100"}>AI Support</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;