import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaChevronDown, FaMoon, FaSun, FaTimes, FaSignOutAlt } from "react-icons/fa";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ai-assistant", label: "AI Assistant" },
  { to: "/components", label: "Components" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const navLinkClass = 
    "rounded-lg px-3 py-1.5 text-base font-semibold text-white/90 transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white shrink-0";

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 text-white shadow-lg shadow-emerald-950/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          
          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu} className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:rotate-3">
              <img src="/icon.png" alt="CropSage Logo" className="h-full w-full object-cover" />
            </span>
            <span className="text-xl font-bold tracking-wide sm:text-2xl">CropSage</span>
          </Link>

          {/* Desktop Navigation (lg+) */}
          <div className="hidden lg:flex items-center ml-auto gap-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </Link>
              ))}
            </div>

            {user ? (
              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-xl border border-white/15 bg-white/10 text-base font-semibold shadow-sm backdrop-blur-sm transition hover:bg-white/20">
                  <Link to="/profile" className="px-3 py-2" onClick={() => setProfileMenuOpen(false)}>Profile</Link>
                  <button type="button" onClick={() => setProfileMenuOpen((open) => !open)} className="border-l border-white/20 px-2.5 py-2" aria-label="Open profile menu" aria-expanded={profileMenuOpen}>
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${profileMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl shadow-slate-950/15 animate-[fadeIn_180ms_ease-out] dark:border-slate-700 dark:bg-slate-900">
                    <button onClick={handleLogout} className="flex w-full items-center justify-between px-4 py-2.5 font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-white/5">
                      <span>Logout</span>
                      <FaSignOutAlt className="text-base" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="rounded-xl bg-white/10 px-3 py-2 text-base font-semibold transition hover:bg-white/20">Login</Link>
            )}

            <button 
              onClick={toggleTheme} 
              className="flex h-13 w-13 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition duration-200 hover:bg-white/20" 
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="h-5 w-5 text-white" />
              ) : (
                <FaSun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
          </div>

          {/* Horizontally Scrollable Mobile Navigation Container (lg:hidden) */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap px-2 ml-auto max-w-full">
            <Link to="/" onClick={closeMobileMenu} className={navLinkClass}>
              Home
            </Link>

            <Link to="/about" onClick={closeMobileMenu} className={navLinkClass}>
              About
            </Link>

            {user ? (
              <Link to="/profile" onClick={closeMobileMenu} className={navLinkClass}>
                Profile
              </Link>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className={navLinkClass}>
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition duration-200 hover:bg-white/20"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="text-xl text-white" /> : <FaSun className="text-xl text-yellow-300" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition hover:bg-white/20"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-2xl text-white" />
              ) : (
                <FaBars className="text-2xl text-white" />
              )}
            </button>
          </div>

        </div>

        {/* Collapsible Mobile Menu Drawer */}
        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
            mobileMenuOpen
              ? "grid-rows-[1fr] pb-4 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}>
          <div className="min-h-0">
            <div className="space-y-1 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm">

              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-2.5 text-base font-semibold text-white/95 transition hover:translate-x-1 hover:bg-white/15"
              >
                Dashboard
              </Link>

              <Link
                to="/ai-assistant"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-2.5 text-base font-semibold text-white/95 transition hover:translate-x-1 hover:bg-white/15"
              >
                AI Assistant
              </Link>

              <Link
                to="/components"
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-2.5 text-base font-semibold text-white/95 transition hover:translate-x-1 hover:bg-white/15"
              >
                Components
              </Link>

              {user && (
                <>
                  <hr className="border-white/15 my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold text-rose-100 transition hover:translate-x-1 hover:bg-rose-500/20"
                  >
                    <span>Logout</span>
                    <FaSignOutAlt className="text-base" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;