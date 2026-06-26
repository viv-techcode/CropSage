import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const stats = [
  { title: "Crops", value: "7", info: "3 Recommended" },
  { title: "Market Alerts", value: "12", info: "4 New" },
  { title: "Profit", value: "₹2.8L", info: "This Season" },
  { title: "Weather Risk", value: "Medium", info: "Next 7 Days" },
];

const crops = [
  { name: "Groundnut", area: "2.5 Acres", score: 94 },
  { name: "Soybean", area: "1.8 Acres", score: 88 },
  { name: "Turmeric", area: "0.7 Acres", score: 81 },
  { name: "Cotton", area: "2.0 Acres", score: 74 },
];

const alerts = [
  {
    title: "Heavy Rain",
    level: "High",
    date: "24 Jun",
    advice: "Delay sowing for 3 days",
  },
  {
    title: "High Humidity",
    level: "Medium",
    date: "26 Jun",
    advice: "Monitor fungal disease",
  },
  {
    title: "Cloudy Weather",
    level: "Low",
    date: "28 Jun",
    advice: "Minor impact expected",
  },
];

// Helper to handle active styling for NavLink
const getNavLinkClass = ({ isActive }) =>
  `${styles.menuLink} ${isActive ? styles.active : ""}`;

function Dashboard() {
  // Moved hook calls safely above the return statement
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <>
      <Navbar />

      <main
        className={`${styles.dashboardLayout} ${
          darkMode ? styles.darkMode : ""
        }`}
      >
        <aside className={styles.sidebar}>
          <div>
            <h3 className={styles.sidebarTitle}>Navigation</h3>

            <ul className={styles.menu}>
              <li>
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  📊 Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/crop-planner" className={getNavLinkClass}>
                  🌱 Crop Planner
                </NavLink>
              </li>

              <li>
                <NavLink to="/market-prices" className={getNavLinkClass}>
                  💰 Market Prices
                </NavLink>
              </li>

              <li>
                <NavLink to="/profit-calculator" className={getNavLinkClass}>
                  🧮 Profit Calculator
                </NavLink>
              </li>

              <li>
                <NavLink to="/ai-assistant" className={getNavLinkClass}>
                  🤖 AI Assistant
                </NavLink>
              </li>

              <li>
                <NavLink to="/weather" className={getNavLinkClass}>
                  🌦 Weather
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bottom Profile */}
          <div className={styles.profile}>
            <div className={styles.avatar}>RP</div>
            <div className={styles.profileInfo}>
              <h4>Ramesh P.</h4>
              <p>Anand, GJ</p>
            </div>
          </div>
        </aside>

        <section className={styles.dashboard}>
          <div className={styles.welcome}>
            <h1>Good Morning, Ramesh 👋</h1>
            <p>Kharif Season • Saturday, 21 June 2026</p>
          </div>

          <section className={styles.stats}>
            {stats.map((item) => (
              <div className={styles.statCard} key={item.title}>
                <span>{item.title}</span>
                <h2>{item.value}</h2>
                <small>{item.info}</small>
              </div>
            ))}
          </section>

          <section className={styles.grid}>
            {/* Left Column */}
            <div>
              <div className={styles.card}>
                <h3>Recommended Crops</h3>

                {crops.map((crop) => (
                  <div className={styles.crop} key={crop.name}>
                    <div>
                      <h4>{crop.name}</h4>
                      <p>{crop.area}</p>
                    </div>

                    <div className={styles.progress}>
                      <div
                        className={styles.fill}
                        style={{ width: `${crop.score}%` }}
                      ></div>
                    </div>

                    <strong>{crop.score}%</strong>
                  </div>
                ))}
              </div>

              <div className={styles.card}>
                <h3>Market Price Trend</h3>
                <div className={styles.chart}>Chart.js / Recharts</div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className={styles.card}>
                <h3>Weather Alerts</h3>

                {alerts.map((alert) => (
                  <div className={styles.alert} key={alert.title}>
                    <div className={styles.top}>
                      <strong>{alert.title}</strong>
                      <span>{alert.level}</span>
                    </div>

                    <small>{alert.date}</small>
                    <p>{alert.advice}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;