import { CloudSun, Leaf, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const featureCards = [
  {
    icon: Leaf,
    title: "Smart crop planning",
    text: "Plan by land, season, and risk.",
  },
  {
    icon: TrendingUp,
    title: "Live mandi prices",
    text: "Track market movement before selling.",
  },
  {
    icon: CloudSun,
    title: "Weather risk alerts",
    text: "Get actionable warnings early.",
  },
];

const stats = [
  { value: "12K+", label: "Farmers" },
  { value: "150+", label: "Mandis" },
  { value: "24/7", label: "AI Support" },
];

function AuthShell({ badge = "AI-Powered Agriculture", title, description, children }) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <main
      className={`relative flex-1 overflow-hidden px-4 py-8 transition-all duration-500 md:py-12 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-black to-slate-900"
          : "bg-gradient-to-br from-green-50 via-white to-emerald-100"
      }`}
    >
      <div className={`absolute top-20 left-20 h-72 w-72 rounded-full blur-3xl ${darkMode ? "bg-emerald-500/10" : "bg-green-400/30"}`} />
      <div className={`absolute bottom-20 right-20 h-96 w-96 rounded-full blur-3xl ${darkMode ? "bg-green-500/5" : "bg-emerald-300/30"}`} />

      <div className={`relative z-10 mx-auto grid w-full max-w-7xl overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500 lg:grid-cols-2 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}>
        <section
          className={`order-2 flex flex-col justify-center gap-8 p-6 sm:p-8 md:p-10 lg:order-1 lg:p-12 ${
            darkMode ? "bg-slate-950 text-white" : "bg-gradient-to-br from-green-700 to-emerald-800 text-white"
          }`}
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-green-300" />
            {badge}
          </span>

          <div className="max-w-xl">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">CropSage</h1>
            <p className={`mt-4 text-lg ${darkMode ? "text-slate-300" : "text-green-50"}`}>{description}</p>
          </div>

          <div className="grid gap-4">
            {featureCards.map((item) => (
              <div key={item.title} className={`flex items-center gap-4 rounded-2xl border p-5 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white/15 border-white/20"}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className={`text-sm ${darkMode ? "text-slate-400" : "text-green-100/90"}`}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className={`rounded-2xl border p-5 ${darkMode ? "border-slate-800 bg-slate-950/60" : "border-white/20 bg-white/10"}`}>
                <div className="text-3xl font-black">{item.value}</div>
                <div className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-green-100"}`}>{item.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_18px_50px_-24px_rgba(16,185,129,0.8)]">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-50/90">
              <Sparkles className="h-4 w-4" />
              Built for farmers
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/95 sm:text-base">
              Clean onboarding, sharp visuals, and an experience that feels premium on mobile and desktop.
            </p>
          </div>
        </section>

        <section className={`order-1 p-5 sm:p-6 lg:order-2 lg:p-8 ${darkMode ? "bg-slate-950/80 text-white" : "bg-white/85 text-slate-900"}`}>
          {children}
        </section>
      </div>
    </main>
  );
}

export default AuthShell;