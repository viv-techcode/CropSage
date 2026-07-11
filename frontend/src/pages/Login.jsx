import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Hand, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthShell from "../components/AuthShell";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const darkMode = theme === "dark";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <Navbar />

      <AuthShell
        badge="Trusted farmer access"
        description="Sign in to your CropSage dashboard for crop recommendations, mandi intelligence, and weather alerts."
      >
        {/* Added 'relative z-10' to ensure this card layer sits securely in front on mobile devices */}
        <div className={`relative z-10 rounded-[28px] border p-6 sm:p-8 ${darkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-white/90"}`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${darkMode ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
              <Hand className="h-6 w-6 animate-wave-hand" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Sign in with your email to continue.</p>
            </div>
          </div>

          {errorMessage && <div className="mt-5 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">{errorMessage}</div>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className={`mb-2 flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                <Mail className="h-4 w-4" />
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 ${darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
              />
            </label>

            <label className="block">
              <span className={`mb-2 flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                <LockKeyhole className="h-4 w-4" />
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full rounded-2xl border px-4 py-3.5 pr-12 outline-none transition-all duration-200 ${darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className={darkMode ? "text-slate-300" : "text-slate-600"}>Remember me</span>
              </label>

              <button type="button" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Please wait..." : "Sign in"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <button
            type="button"
            className={`flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-0.5 ${darkMode ? "border-slate-800 bg-slate-900 text-white hover:border-slate-700 hover:bg-slate-800" : "border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:bg-emerald-50"}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white">G</span>
            Continue with Google
          </button>

          <p className={`mt-6 text-center text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200">
              Sign up
            </Link>
          </p>
        </div>
      </AuthShell>

      <Footer />
    </div>
  );
}

export default Login;