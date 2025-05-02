import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import SensorPage from "./components/SensorPage.jsx";
import AnalyticsPage from "./components/AnalyticsPage";
import SettingsPage from "./components/SettingsPage";

function App() {
  const [predictionData, setPredictionData] = useState(null);
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sensors" element={<SensorPage setPredictionData={setPredictionData}/>} />
           <Route path="/analytics" element={<AnalyticsPage predictionData={predictionData}/>} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;