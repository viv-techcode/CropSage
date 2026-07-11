import { useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Sprout, 
  TrendingUp, 
  CloudSun, 
  Bot 
} from "lucide-react";

import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

const ComponentDemo = () => {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Navbar />

      <div className="demo-container">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sprout size={32} /> CropSage UI Library
        </h1>
        <p>AI-Powered Farming Platform</p>

        <div className="demo-grid">
          <div className="demo-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sprout size={20} /> Smart Crop Planner
            </h3>

            <Input placeholder="Enter your location..." />

            <br />
            <br />

            <Button onClick={() => setOpen(true)}>
              View Recommendation
            </Button>
          </div>

          <div className="demo-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} /> Market Price Intelligence
            </h3>

            <p>Check latest mandi prices and trends.</p>

            <Button onClick={() => setShowToast(true)}>
              Check Prices
            </Button>
          </div>

          <div className="demo-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CloudSun size={20} /> Weather Risk Alerts
            </h3>

            <Loader />
          </div>

          <div className="demo-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={20} /> AI Farm Assistant
            </h3>

            <p>
              Ask farming questions and receive AI-powered
              guidance.
            </p>

            <Button>
              Start AI Assistant
            </Button>
          </div>
        </div>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <h2>Crop Recommendation</h2>

          <p>
            <strong>Crop:</strong> Wheat
          </p>

          <p>
            <strong>Season:</strong> Rabi
          </p>

          <p>
            <strong>Yield:</strong> High
          </p>

          <p>
            <strong>Weather:</strong> Excellent
          </p>

          <p>
            <strong>Profit:</strong> ₹72,000
          </p>
        </Modal>

        {showToast && (
          <Toast message="Latest mandi prices updated successfully!" />
        )}
      </div>
    </>
  );
};

export default ComponentDemo;