import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-5 bg-green-600 text-white">
      <Link
        to="/"
        className="flex items-center gap-3 mb-4 md:mb-0 group"
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
          <img
            src="/icon.png"
            alt="CropSage Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-wide">
          CropSage
        </h1>
      </Link>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-xl font-medium">
        <Link to="/" className="hover:text-green-200 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-green-200 transition-colors">About</Link>
        <Link to="/dashboard" className="hover:text-green-200 transition-colors">Dashboard</Link>
        <Link to="/ai-assistant" className="hover:text-green-200 transition-colors">AI Assistant</Link>
        <Link to="/components" className="hover:text-green-200 transition-colors">Components</Link>

        <div className="relative flex items-center min-w-[80px] justify-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg font-semibold bg-rose-600 hover:bg-rose-700 px-4 py-1.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md animate-fade-in"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="hover:text-green-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 animate-fade-in"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 border border-transparent rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-white text-lg transition-transform duration-300 rotate-0 hover:-rotate-12" />
          ) : (
            <FaSun className="text-yellow-400 text-lg transition-transform duration-500 rotate-0 hover:rotate-90" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;