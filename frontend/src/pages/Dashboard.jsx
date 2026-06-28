import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCrops } from "../context/CropContext";

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

const getNavLinkClass = ({ isActive }) =>
  `${styles.menuLink} ${isActive ? styles.active : ""}`;

function Dashboard() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  // Shared crop data from context
  const { crops } = useCrops();

  // Dashboard statistics
  const totalQuantity = crops.reduce(
    (sum, crop) => sum + crop.quantity,
    0
  );

  const estimatedValue = crops.reduce(
    (sum, crop) => sum + crop.quantity * crop.price,
    0
  );

  const locations = new Set(crops.map((c) => c.location)).size;

  const stats = [
    {
      title: "Total Crops",
      value: crops.length,
      info: "Active Crops",
    },
    {
      title: "Total Quantity",
      value: `${totalQuantity} kg`,
      info: "Inventory",
    },
    {
      title: "Estimated Value",
      value: `₹${estimatedValue.toLocaleString()}`,
      info: "Market Value",
    },
    {
      title: "Locations",
      value: locations,
      info: "Farm Locations",
    },
  ];

  return (
    <>
      <Navbar />

      <main
        className={`${styles.dashboardLayout} ${
          darkMode ? styles.darkMode : ""
        }`}
      >
        {/* Sidebar */}
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

          <div className={styles.profile}>
            <div className={styles.avatar}>RP</div>

            <div className={styles.profileInfo}>
              <h4>Ramesh P.</h4>
              <p>Anand, GJ</p>
            </div>
          </div>
        </aside>

        {/* Main Dashboard */}
        <section className={styles.dashboard}>
          <div className={styles.welcome}>
            <h1>Good Morning, Ramesh 👋</h1>
            <p>Kharif Season • Saturday, 21 June 2026</p>
          </div>

          {/* Statistics */}
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
            <div>
              <div className={styles.card}>
                <h3>Crop Inventory</h3>
                                {crops.length === 0 ? (
                  <p>No crops added yet.</p>
                ) : (
                  crops.map((crop) => (
                    <div className={styles.crop} key={crop.id}>
                      <div>
                        <h4>{crop.name}</h4>
                        <p>
                          {crop.location} • {crop.season}
                        </p>
                      </div>

                      <div className={styles.progress}>
                        <div
                          className={styles.fill}
                          style={{
                            width: `${Math.min(
                              (crop.quantity / totalQuantity) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {crop.quantity} {crop.unit}
                      </strong>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.card}>
                <h3>Market Summary</h3>

                <div className={styles.chart}>
                  <h2>₹{estimatedValue.toLocaleString()}</h2>
                  <p>Estimated Total Crop Value</p>

                  <hr style={{ margin: "20px 0" }} />

                  <p>
                    <strong>Total Quantity:</strong> {totalQuantity} kg
                  </p>

                  <p>
                    <strong>Total Locations:</strong> {locations}
                  </p>

                  <p>
                    <strong>Registered Crops:</strong> {crops.length}
                  </p>
                </div>
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

              <div className={styles.card}>
                <h3>Recent Crops</h3>

                {crops
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((crop) => (
                    <div
                      key={crop.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <div>
                        <strong>{crop.name}</strong>

                        <p style={{ margin: 0 }}>
                          {crop.location}
                        </p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <strong>
                          {crop.quantity} {crop.unit}
                        </strong>

                        <p style={{ margin: 0 }}>
                          ₹{crop.price}/kg
                        </p>
                      </div>
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