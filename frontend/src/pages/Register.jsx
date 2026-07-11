import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthShell from "../components/AuthShell";
import { useTheme } from "../context/ThemeContext";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Track errors for each field individually in real-time
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    api: "",
  });

  const { theme } = useTheme();
  const navigate = useNavigate();
  const darkMode = theme === "dark";

  // Validate fields in real-time as the data changes
  useEffect(() => {
    const newErrors = { name: "", email: "", mobile: "", password: "", confirmPassword: "", api: "" };

    if (formData.name && formData.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      } else if (formData.password.length > 20) {
        newErrors.password = "Password cannot exceed 20 characters.";
      }
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if there are any validation errors or empty required fields
  const isFormInvalid = 
    Object.values(errors).some(error => error !== "") || 
    !formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    setSuccessMessage("");

    try {
      setSubmitting(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      setSuccessMessage("Registration successful. Please sign in to continue.");
      setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        api: err.response?.data?.message || "Something went wrong. Please try again."
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <Navbar />

      <AuthShell
        badge="Create your account"
        description="Join CropSage to unlock AI crop planning, market trends, and weather intelligence in one dashboard."
      >
        <div className={`rounded-[28px] border p-6 sm:p-8 ${darkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-white/90"}`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${darkMode ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Create account</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Set up your profile in a few steps.</p>
            </div>
          </div>

          {errors.api && <div className="mt-5 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">{errors.api}</div>}
          {successMessage && <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">{successMessage}</div>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <label className="block">
              <span className={`mb-2 flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                <UserRound className="h-4 w-4" />
                Full name
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 ${errors.name ? "border-rose-500 focus:ring-rose-500/20" : darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.name}</p>}
            </label>

            {/* Email Address */}
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
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 ${errors.email ? "border-rose-500 focus:ring-rose-500/20" : darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>}
            </label>

            {/* Mobile Number */}
            <label className="block">
              <span className={`mb-2 flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                <Phone className="h-4 w-4" />
                Mobile number
              </span>
              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                required
                className={`w-full rounded-2xl border px-4 py-3.5 outline-none transition-all duration-200 ${errors.mobile ? "border-rose-500 focus:ring-rose-500/20" : darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
              />
              {errors.mobile && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.mobile}</p>}
            </label>

            {/* Password */}
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
                  placeholder="Create a password"
                  required
                  minLength={6}
                  maxLength={20}
                  className={`w-full rounded-2xl border px-4 py-3.5 pr-12 outline-none transition-all duration-200 ${errors.password ? "border-rose-500 focus:ring-rose-500/20" : darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.password}</p>}
            </label>

            {/* Confirm Password */}
            <label className="block">
              <span className={`mb-2 flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                <LockKeyhole className="h-4 w-4" />
                Confirm password
              </span>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repeat your password"
                  required
                  minLength={6}
                  maxLength={20}
                  className={`w-full rounded-2xl border px-4 py-3.5 pr-12 outline-none transition-all duration-200 ${errors.confirmPassword ? "border-rose-500 focus:ring-rose-500/20" : darkMode ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.confirmPassword}</p>}
            </label>

            <button
              type="submit"
              disabled={submitting || isFormInvalid}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating account..." : "Create account"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className={`mt-6 text-center text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200">
              Login
            </Link>
          </p>
        </div>
      </AuthShell>

      <Footer />
    </div>
  );
}

export default Register;