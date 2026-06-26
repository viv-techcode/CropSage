import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

function Dashboard() {
  return (
    <>
      <Navbar />

      {/* 1. dashboard-layout -> styles.dashboardLayout */}
      <main className={styles.dashboardLayout}>

        <aside className={styles.sidebar}>

  <div>

    <h3 className={styles.sidebarTitle}>Navigation</h3>

    <ul className={styles.menu}>
      <li className={styles.active}>📊 Dashboard</li>
      <li>🌱 Crop Planner</li>
      <li>💰 Market Prices</li>
      <li>🧮 Profit Calculator</li>
      <li>🤖 AI Assistant</li>
      <li>🌦 Weather</li>
    </ul>

  </div>

  {/* Bottom Profile */}
  <div className={styles.profile}>

    <div className={styles.avatar}>
      RP
    </div>

    <div className={styles.profileInfo}>
      <h4>Ramesh P.</h4>
      <p>Anand, GJ</p>
    </div>

  </div>

</aside>

        {/* 6. dashboard -> styles.dashboard */}
        <section className={styles.dashboard}>

          {/* 7. welcome -> styles.welcome */}
          <div className={styles.welcome}>
            <h1>Good Morning, Ramesh 👋</h1>
            <p>Kharif Season • Saturday, 21 June 2026</p>
          </div>

          {/* 8. stats -> styles.stats */}
          <section className={styles.stats}>
            {stats.map((item) => (
              /* 9. stat-card -> styles.statCard */
              <div className={styles.statCard} key={item.title}>
                <span>{item.title}</span>
                <h2>{item.value}</h2>
                <small>{item.info}</small>
              </div>
            ))}
          </section>

          {/* 10. grid -> styles.grid */}
          <section className={styles.grid}>

            {/* Left Column */}
            <div>

              {/* 11. card -> styles.card */}
              <div className={styles.card}>
                <h3>Recommended Crops</h3>

                {crops.map((crop) => (
                  /* 12. crop -> styles.crop */
                  <div className={styles.crop} key={crop.name}>

                    <div>
                      <h4>{crop.name}</h4>
                      <p>{crop.area}</p>
                    </div>

                    {/* 13. progress -> styles.progress */}
                    <div className={styles.progress}>
                      {/* 14. fill -> styles.fill */}
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

                {/* 15. chart -> styles.chart */}
                <div className={styles.chart}>
                  Chart.js / Recharts
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div>

              <div className={styles.card}>
                <h3>Weather Alerts</h3>

                {alerts.map((alert) => (
                  /* 16. alert -> styles.alert */
                  <div className={styles.alert} key={alert.title}>

                    {/* 17. top -> styles.top */}
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