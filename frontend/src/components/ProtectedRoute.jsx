import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AlarmClock, LoaderCircle, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const bubbleStyles = [
  "left-[6%] top-[12%] h-20 w-20 animate-bubble-one",
  "right-[8%] top-[14%] h-28 w-28 animate-bubble-two",
  "left-[14%] bottom-[14%] h-24 w-24 animate-bubble-three",
  "right-[18%] bottom-[16%] h-16 w-16 animate-bubble-four",
  "left-[50%] top-[10%] h-12 w-12 animate-bubble-five",
  "left-[40%] bottom-[10%] h-36 w-36 animate-bubble-six",
];

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  const routeLabel = useMemo(() => {
    const routeMap = {
      "/dashboard": "Dashboard",
      "/crop-planner": "Crop Planner",
      "/profit-calculator": "Profit Calculator",
      "/market-prices": "Market Prices",
      "/profile": "Profile",
      "/ai-assistant": "AI Assistant",
    };

    return routeMap[location.pathname] || "this page";
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      return undefined;
    }

    setSecondsLeft(5);

    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => (current > 1 ? current - 1 : 0));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950/55 via-slate-900/45 to-emerald-950/35 px-4 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.14),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(250,204,21,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_28%)]" />
          {bubbleStyles.map((bubbleClass, index) => (
            <span
              key={`${bubbleClass}-${index}`}
              className={`bubble-orb absolute rounded-full border border-white/20 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)] ${bubbleClass}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/60 p-6 text-center shadow-[0_30px_80px_-24px_rgba(15,23,42,0.85)] shadow-black/30 sm:p-8 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(16,185,129,0.08))]" />

            <div className="relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300 shadow-lg shadow-amber-500/10">
                <ShieldAlert className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-white">Not logged in</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                You cannot view {routeLabel}. Redirecting to the login page in {secondsLeft} sec.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  <AlarmClock className="h-4 w-4" />
                  Redirect timer
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="access-countdown-bar h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-200">
                  <LoaderCircle className="h-4 w-4 animate-spin text-emerald-300" />
                  Redirecting in {secondsLeft} seconds
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  Login now
                </Link>
                <Link
                  to="/register"
                  className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;