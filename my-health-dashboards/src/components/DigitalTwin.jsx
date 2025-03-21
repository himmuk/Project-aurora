import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DigitalTwin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const vitalsRef = useRef(null);
  const navigate = useNavigate();

  const availableDates = ["March 20, 2025", "March 22, 2025", "March 25, 2025"];

  const handleViewVitals = () => {
    vitalsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
   // Health Metrics - Real-time updates every 5 seconds
   const [metrics, setMetrics] = useState([
    { label: "Heart Rate", value: "72 bpm" },
    { label: "Blood Pressure", value: "120/80 mmHg" },
    { label: "Temperature", value: "98.6°F" },
    { label: "Oxygen Saturation", value: "98%" },
    { label: "Respiratory Rate", value: "16 breaths/min" },
    { label: "Blood Glucose", value: "90 mg/dL" },
  ]);

  useEffect(() => {
    const updateVitals = () => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          let newValue;
          switch (metric.label) {
            case "Heart Rate":
              newValue = `${Math.floor(Math.random() * (90 - 60 + 1)) + 60} bpm`;
              break;
            case "Blood Pressure":
              newValue = `${Math.floor(Math.random() * (130 - 110 + 1)) + 110}/${Math.floor(
                Math.random() * (90 - 70 + 1)
              ) + 70} mmHg`;
              break;
            case "Temperature":
              newValue = `${(Math.random() * (99.5 - 97.0) + 97.0).toFixed(1)}°F`;
              break;
            case "Oxygen Saturation":
              newValue = `${Math.floor(Math.random() * (100 - 95 + 1)) + 95}%`;
              break;
            case "Respiratory Rate":
              newValue = `${Math.floor(Math.random() * (20 - 12 + 1)) + 12} breaths/min`;
              break;
            case "Blood Glucose":
              newValue = `${Math.floor(Math.random() * (110 - 70 + 1)) + 70} mg/dL`;
              break;
            default:
              newValue = metric.value;
          }
          return { ...metric, value: newValue };
        })
      );
    };

    const interval = setInterval(updateVitals, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-blue-100 text-black p-4 text-lg font-bold rounded-lg shadow-md w-full">
        Digital Twin
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-md mt-4 w-full">
        {["overview", "radiology", "engagement"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md w-full flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">Patient Overview</h2>

            {/* Patient Summary */}
            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md text-gray-600 font-medium text-center">
              Patient Summary & Insights
            </div>

            {/* Vitals & Health Status */}
            <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-700">
                <strong>Health Status:</strong> Stable | <strong>Last Check-up:</strong> 10 days ago
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition duration-200"
                onClick={handleViewVitals}
              >
                View Vitals
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-700">
                <strong>Next Appointment:</strong> March 23, 2025 - Oncology Consultation
              </span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md transition duration-200"
                onClick={() => navigate("/appointments")}
              >
                Manage Appointments
              </button>
            </div>

            {/* AI Alert */}
            <div className="mt-4 flex justify-between items-center bg-red-100 p-3 rounded-lg">
              <span className="text-red-700">
                <strong>AI Alert:</strong> Elevated risk detected - follow-up recommended!
              </span>
              <button className="bg-red-500 text-white text-sm px-3 py-1 rounded-md opacity-50 cursor-not-allowed">
                High Priority
              </button>
            </div>
          </div>
        )}

        {/* Radiology Tab */}
        {activeTab === "radiology" && (
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">Radiology Findings</h2>

            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md text-gray-600 font-medium text-center">
              Radiology Image & Analysis
            </div>

            <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-700">
                Suspicious lesion detected - further imaging recommended.
              </span>
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-md">
                High Risk
              </span>
            </div>
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === "engagement" && (
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">Patient Engagement</h2>

            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md text-gray-600 font-medium text-center">
              Engagement Metrics & Insights
            </div>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/appointments")}
              >
                Schedule Appointment
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowTelemedicineModal(true)}
              >
                Update Symptoms
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/sdoh-support")}
              >
                Community Resources
              </button>
            </div>

            {/* Treatment Progress */}
            <div className="mt-6">
              <div className="bg-gray-300 h-2 rounded-full">
                <div className="bg-black h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Treatment Progress: 70% completed</p>
            </div>
          </div>
        )}
      </div>

      {/* Health Metrics */}
      <div ref={vitalsRef} className="mt-4 bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4">Health Metrics</h2>
        <div className="grid grid-cols-3 gap-6 w-full">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-6 bg-gray-100 rounded-md w-full text-center">
              <h3 className="font-semibold">{metric.label}</h3>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {showTelemedicineModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-4">Book a Telemedicine Session</h2>
                <p className="text-gray-700">Consult with your doctor about new symptoms.</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setShowTelemedicineModal(false)}>
                    Close
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setStep(2)}>
                    Book
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-4">Booking for What?</h2>
                <div className="space-y-3">
                  {["Update Symptoms", "Follow-up Consultation", "New Consultation"].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className={`w-full p-2 rounded-lg ${
                        selectedReason === reason ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${selectedReason ? "" : "opacity-50 cursor-not-allowed"}`} disabled={!selectedReason} onClick={() => setStep(3)}>
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-semibold mb-4">Select Appointment Date</h2>
                <div className="space-y-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full p-2 rounded-lg ${
                        selectedDate === date ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button className={`bg-green-500 text-white px-4 py-2 rounded-lg ${selectedDate ? "" : "opacity-50 cursor-not-allowed"}`} disabled={!selectedDate} onClick={() => {
                    alert(`Appointment Confirmed for ${selectedDate} - ${selectedReason}`);
                    setShowTelemedicineModal(false);
                    setStep(1);
                    setSelectedReason("");
                    setSelectedDate("");
                  }}>
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTwin;
