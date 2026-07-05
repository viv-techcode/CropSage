import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-5 bg-green-600 text-white">

      {/* Logo + Brand */}
      <Link
        to="/"
        className="flex items-center gap-3 mb-4 md:mb-0 group"
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
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

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-xl font-medium">
        <Link to="/" className="hover:text-green-200 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-green-200 transition-colors">About</Link>
        <Link to="/dashboard" className="hover:text-green-200 transition-colors">Dashboard</Link>
        <Link to="/ai-assistant" className="hover:text-green-200 transition-colors">AI Assistant</Link>
        <Link to="/login" className="hover:text-green-200 transition-colors">Login</Link>
        <Link to="/components" className="hover:text-green-200 transition-colors">Components</Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 border border-transparent rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-white text-lg" />
          ) : (
            <FaSun className="text-yellow-400 text-lg" />
          )}
        </button>
      </div>

    </nav>
  );
}

export default Navbar;