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
    "rounded-lg px-3 py-1.5 text-base font-semibold text-white/90 transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white";

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 text-white shadow-lg shadow-emerald-950/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          
          <Link to="/" onClick={closeMobileMenu} className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:rotate-3">
              <img src="/icon.png" alt="CropSage Logo" className="h-full w-full object-cover" />
            </span>
            <span className="text-xl font-bold tracking-wide sm:text-2xl">CropSage</span>
          </Link>

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
          </div>

          <div className="flex items-center gap-2 lg:ml-0 ml-auto">
            <button 
  onClick={toggleTheme} 
  className="flex h-13 w-13 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition duration-200 hover:scale-105 hover:bg-white/20" 
  aria-label="Toggle theme"
>
  {theme === "light" ? (
    <FaMoon className="h-10 w-10 text-white" />
  ) : (
    <FaSun className="h-500 w-10 text-yellow-300" />
  )}
</button>
          </div>

        </div>

        <div className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${mobileMenuOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="min-h-0">
            <div className="space-y-1 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
              {navItems.map((item) => <Link key={item.to} to={item.to} onClick={closeMobileMenu} className="block rounded-xl px-3 py-2.5 text-base font-semibold text-white/95 transition hover:translate-x-1 hover:bg-white/15">{item.label}</Link>)}
              {user ? (
                <div className="mt-2 border-t border-white/15 pt-2">
                  <Link to="/profile" onClick={closeMobileMenu} className="block rounded-xl px-3 py-2.5 text-base font-semibold text-white/95 transition hover:translate-x-1 hover:bg-white/15">Profile</Link>
                  <button onClick={handleLogout} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold text-rose-100 transition hover:translate-x-1 hover:bg-rose-500/20">
                    <span>Logout</span>
                    <FaSignOutAlt className="text-base" />
                  </button>
                </div>
              ) : <Link to="/login" onClick={closeMobileMenu} className="mt-2 block rounded-xl bg-white/15 px-3 py-2.5 text-base font-semibold transition hover:bg-white/25">Login</Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;