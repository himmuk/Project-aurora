import React, { useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-03-10", time: "10:00 AM", doctor: "Dr. Mehta", reason: "Oncology Consultation", status: "Completed", symptoms: "" },
    { id: 2, date: "2025-03-15", time: "02:00 PM", doctor: "Dr. Sharma", reason: "Follow-up Checkup", status: "Completed", symptoms: "" },
    { id: 3, date: "2025-03-25", time: "11:30 AM", doctor: "Dr. Gupta", reason: "Cardiology Review", status: "Booked", symptoms: "Mild Chest Pain" }, // ✅ Pre-Booked Appointment on March 25
  ]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [newAppointment, setNewAppointment] = useState({ doctor: "", reason: "", time: "" });
  const [showSymptomsModal, setShowSymptomsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  // Doctor & Reason Dropdown Options
  const doctors = ["Dr. Mehta", "Dr. Sharma", "Dr. Verma", "Dr. Gupta"];
  const reasons = ["General Checkup", "Oncology Consultation", "Cardiology Review", "Neurology Assessment"];

  // 📌 Open Symptoms Update Modal
  const handleUpdateSymptoms = (id) => {
    const appointment = appointments.find((appt) => appt.id === id);
    if (!appointment) return;

    setSelectedAppointment(id);  // Store the appointment ID
    setSymptoms(appointment.symptoms || "");  // Load existing symptoms or an empty string
    setShowSymptomsModal(true);  // Show the modal
  };

  // 📌 Save Symptoms (Allow free text)
  const handleSaveSymptoms = () => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === selectedAppointment
          ? { ...appt, symptoms }  // Save the manually inputted symptoms
          : appt
      )
    );
    setShowSymptomsModal(false);
    setSymptoms("");  // Clear input field after saving
  };

  // 📌 Cancel Appointment
  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.filter((appt) => appt.id !== id));
    }
  };

  // 📌 Handle Booking Appointment
  const handleBookAppointment = () => {
    if (!newAppointment.doctor || !newAppointment.reason || !newAppointment.time) {
      alert("Please fill in all fields.");
      return;
    }

    const newAppointmentData = {
      ...newAppointment,
      id: appointments.length + 1, // New ID for the new appointment
      date: selectedDate,
      status: "Booked",
      symptoms: "",
    };

    setAppointments([...appointments, newAppointmentData]);
    setShowBookingModal(false); // Close the modal after booking
    setNewAppointment({ doctor: "", reason: "", time: "" }); // Reset fields
  };

  // 📌 Filter Upcoming Appointments
  const upcomingAppointments = appointments.filter((appt) => appt.status === "Booked");

  // 📌 Open Date Selection Modal
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowBookingModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 📌 Header */}
      <div className="bg-blue-100 text-black p-4 rounded-lg shadow-md">
        <h1 className="text-lg font-bold">Appointments</h1>
      </div>

      {/* 📅 Calendar UI */}
      <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const formattedDate = `2025-03-${day.toString().padStart(2, "0")}`;
            const appointment = appointments.find((appt) => appt.date === formattedDate);

            return (
              <button
                key={day}
                className={`w-24 h-10 text-lg font-medium border rounded-md flex items-center justify-center ${
                  appointment?.status === "Completed"
                    ? "bg-green-500 text-white"
                    : appointment?.status === "Booked"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => !appointment && handleDateClick(formattedDate)}
                disabled={appointment?.status !== undefined}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📌 Symptoms Update Modal */}
      {showSymptomsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Update Symptoms</h2>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)} // Capture input changes
              placeholder="Enter symptoms here..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={handleSaveSymptoms}
            >
              Save Symptoms
            </button>
          </div>
        </div>
      )}

      {/* 📌 Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Book Appointment for {selectedDate}</h2>

            <select
              className="w-full p-2 border rounded-md mb-2"
              value={newAppointment.doctor}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded-md mb-2"
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            >
              <option value="">Select Reason</option>
              {reasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>

            <input
              type="time"
              className="w-full p-2 border rounded-md mb-2"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      {/* 📌 Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="p-4 border-l-4 rounded-md flex flex-col bg-gray-100">
                <p className="text-lg font-medium">📅 {appt.date} - ⏰ {appt.time}</p>
                <p className="text-sm text-blue-700">🏥 {appt.doctor}</p>
                <p className="text-sm text-gray-700">🏷️ {appt.reason}</p>
                {appt.symptoms && <p className="text-sm text-yellow-600">⚠️ Symptoms: {appt.symptoms}</p>}

                {/* ✅ Allow symptoms update only for March 25, 2025 */}
                {appt.date === "2025-03-25" && (
                  <button
                    className="bg-yellow-500 text-white px-3 py-2 mt-2 rounded-md w-full"
                    onClick={() => handleUpdateSymptoms(appt.id)}
                  >
                    Update Symptoms
                  </button>
                )}

                <button
                  className="bg-red-500 text-white px-3 py-2 mt-2 rounded-md w-full"
                  onClick={() => handleCancelAppointment(appt.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
