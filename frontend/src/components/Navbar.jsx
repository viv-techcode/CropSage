import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-4 py-5 bg-green-600 text-white">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">
        CropSage
      </h1>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg md:text-xl font-medium">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/components">Components</Link>

        <button
  onClick={toggleTheme}
  className="px-3 py-1 border rounded bg-white"
>
  {theme === "light" ? (
    <FaMoon className="text-black text-lg" />
  ) : (
    <FaSun className="text-yellow-500 text-lg" />
  )}
</button>
      </div>
    </nav>
  );
}

export default Navbar;