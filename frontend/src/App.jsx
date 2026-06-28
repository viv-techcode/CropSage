import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import CropPlanner from "./pages/CropPlanner";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import ComponentDemo from "./pages/ComponentDemo";

import { CropProvider } from "./context/CropContext";

function App() {
  return (
    <BrowserRouter>
      <CropProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-planner" element={<CropPlanner />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/components" element={<ComponentDemo />} />
        </Routes>
      </CropProvider>
    </BrowserRouter>
  );
}

export default App;