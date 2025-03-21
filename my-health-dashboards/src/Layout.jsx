import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Home,
  CalendarDays,
  User,
  FileText,
  Activity,
  ClipboardList,
  Settings,
  Award
} from "lucide-react";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Project Aurora</h1>
        <nav className="space-y-4">
          <Link to="/digital-twin" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <Home className="w-5 h-5" /> Digital Twin
          </Link>
          <Link to="/appointments" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <CalendarDays className="w-5 h-5" /> Appointments
          </Link>
          <Link to="/telemedicine" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <User className="w-5 h-5" /> Telemedicine
          </Link>
          <Link to="/imaging-reports" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <FileText className="w-5 h-5" /> Imaging Reports
          </Link>
          <Link to="/treatment-forecast" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <Activity className="w-5 h-5" /> Treatment Forecast
          </Link>
          <Link to="/sdoh-support" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <ClipboardList className="w-5 h-5" /> Life Essentials
          </Link>

          {/* Gamification link with an Award icon */}
          <Link to="/gamification" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <Award className="w-5 h-5" /> Gamification
          </Link>

          {/* Settings link with the Settings icon */}
          <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

