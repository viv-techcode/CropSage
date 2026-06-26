import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRobot, FaComments, FaLeaf, FaCloudSunRain } from "react-icons/fa";

function AIAssistant() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <>
      <Navbar />

      <section
        className={`min-vh-100 py-5 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="container">
          <div className="text-center mb-5">
            <FaRobot size={60} className="text-success mb-3" />
            <h1 className="fw-bold">AI Assistant</h1>
            <p className="lead">
              Get instant farming guidance powered by CropSage AI.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                  <FaComments className="text-success fs-2 mb-3" />
                  <h4>Ask Questions</h4>
                  <p>
                    Ask about crops, fertilizers, irrigation, and farming
                    practices in natural language.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                  <FaLeaf className="text-success fs-2 mb-3" />
                  <h4>Crop Recommendations</h4>
                  <p>
                    Receive AI-powered crop suggestions based on your farm
                    conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                  <FaCloudSunRain className="text-success fs-2 mb-3" />
                  <h4>Weather Insights</h4>
                  <p>
                    Understand how weather may impact your crops and farming
                    decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`card h-100 ${darkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                  <FaRobot className="text-success fs-2 mb-3" />
                  <h4>Coming Soon</h4>
                  <p>
                    Interactive AI chatbot with multilingual support and image
                    analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AIAssistant;