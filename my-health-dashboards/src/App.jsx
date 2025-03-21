import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DigitalTwin from "./components/DigitalTwin";
import Appointments from "./components/Appointments";
import Telemedicine from "./components/Telemedicine";
import ImagingReports from "./components/ImagingReports";
import TreatmentForecastDashboard from "./components/TreatmentForecastDashboard";
import SDOHSupportDashboard from "./components/SDOHSupportDashboard";
import GamificationDashboard from "./components/GamificationDashboard";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default route is Digital Twin */}
          <Route index element={<DigitalTwin />} />
          <Route path="digital-twin" element={<DigitalTwin />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="telemedicine" element={<Telemedicine />} />
          <Route path="imaging-reports" element={<ImagingReports />} />
          <Route path="treatment-forecast" element={<TreatmentForecastDashboard />} />
          <Route path="sdoh-support" element={<SDOHSupportDashboard />} />
          <Route path="gamification" element={<GamificationDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
