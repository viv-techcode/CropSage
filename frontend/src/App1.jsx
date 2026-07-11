import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CropPlanner from "./pages/CropPlanner";
import MarketPrices from "./pages/MarketPrices";
import ProfitCalculator from "./pages/ProfitCalculator";
import Profile from "./pages/Profile";
import AIAssistant from "./pages/AIAssistant";
import ComponentDemo from "./pages/ComponentDemo";

// Provider & Wrapper Imports
import ProtectedRoute from "./components/ProtectedRoute";
import { CropProvider } from "./context/CropContext";

function App() {
  return (
    <BrowserRouter>
      <CropProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/components" element={<ComponentDemo />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-planner"
            element={
              <ProtectedRoute>
                <CropPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-prices"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profit-calculator"
            element={
              <ProtectedRoute>
                <ProfitCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <AIAssistant />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CropProvider>
    </BrowserRouter>
  );
}

export default App;