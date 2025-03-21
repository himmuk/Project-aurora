import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share, CalendarIcon, Clock, Mail, ChevronDown, ChevronUp } from "lucide-react";

export default function ImagingReports() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState("20th Mar 2025");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showSpecialists, setShowSpecialists] = useState(false);
  const [showSecondOpinion, setShowSecondOpinion] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [requestSentTo, setRequestSentTo] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isAnomaliesExpanded, setIsAnomaliesExpanded] = useState(false);
  const [isTrialsExpanded, setIsTrialsExpanded] = useState(false);

  const specialists = [
    { name: "Dr. Sarah Wilson", specialty: "Breast Radiology" },
    { name: "Dr. Michael Chen", specialty: "Oncological Imaging" },
    { name: "Dr. Emily Rodriguez", specialty: "Biopsy Specialist" },
    { name: "Dr. James Thompson", specialty: "Cancer Diagnostics" }
  ];
  const clinicalTrials = [
    {
      title: "Advanced Breast Cancer Immunotherapy Study",
      status: "Recruiting",
      location: "National Cancer Institute, MD",
      criteria: "Stage II-IV, ER/PR+",
      link: "#"
    },
    {
      title: "Targeted Therapy for HER2-Negative Patients",
      status: "Phase III",
      location: "Mayo Clinic, MN",
      criteria: "HER2-Negative, Metastatic",
      link: "#"
    },
    {
      title: "Novel Chemotherapy Combination Trial",
      status: "Active",
      location: "Dana-Farber Cancer Institute, MA",
      criteria: "First-line Treatment",
      link: "#"
    }
  ];
  const handleScheduleClick = () => setShowBooking(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
const [appointmentBooked, setAppointmentBooked] = useState(false);
const [formData, setFormData] = useState({
  date: "",
  time: "",
  email: ""
});
  
  const handleConfirmBooking = () => {
    setShowBooking(false);
    setBookingConfirmed(true);
  };

  const handleShareClick = () => {
    setShowSpecialists(!showSpecialists);
    setRequestSentTo(null);
  };

  const handleRequestSend = (doctorName) => {
    setRequestSentTo(doctorName);
    setTimeout(() => setShowSpecialists(false), 2000);
  };


  const handleSecondOpinionClick = () => {
    setShowSecondOpinion(!showSecondOpinion);
    setConnectionStatus(null);
  };

  const handleConnectDoctor = () => {
    setConnectionStatus("Redirecting to telemedicine...");
    setTimeout(() => {
      setShowAppointmentForm(true);
      setConnectionStatus(null);
    }, 1500);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    setConnectionStatus("Sending email confirmation...");
    
    setTimeout(() => {
      setAppointmentBooked(true);
      setConnectionStatus(null);
      setShowAppointmentForm(false);
      setTimeout(() => setAppointmentBooked(false), 5000);
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <div className="bg-blue-100 text-black p-4 rounded-lg text-xl font-bold">
        Radiology & Imaging Reports
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        {/* Patient Info Section */}
        <Card className="p-4 w-full">
          <div className="text-lg font-semibold">Patient Info</div>
          <p>Name: Jane Doe</p>
          <p>Last Scan: 10th Feb 2025</p>
          <p>Next Scan: 20th Mar 2025</p>
        </Card>

        {/* Recent Imaging Reports Section */}
        <Card className="p-4 w-full">
          <div className="text-lg font-semibold">Recent Imaging Reports</div>
          <div className="flex justify-between gap-4 mt-2">
            <Card className="flex-1 p-3 text-center">
              <span>📷</span>
              <p>Mammogram</p>
              <p className="text-gray-500 text-sm">Feb 10, 2025</p>
            </Card>
            <Card className="flex-1 p-3 text-center">
              <span>📷</span>
              <p>Breast MRI</p>
              <p className="text-gray-500 text-sm">Jan 25, 2025</p>
            </Card>
            <Card className="flex-1 p-3 text-center">
              <span>📷</span>
              <p>Biopsy Report</p>
              <p className="text-gray-500 text-sm">Jan 5, 2025</p>
            </Card>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4 w-full">
        {/* AI Analysis Summary */}
        <Card className="p-4 w-full">
  <div className="text-lg font-semibold">AI Analysis Summary</div>
  <div className="space-y-2">
    <p>🔵 Risk Level: High</p>
    <div 
      className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
      onClick={() => setIsAnomaliesExpanded(!isAnomaliesExpanded)}
    >
      <span>⚠️ Detected Anomalies: 3</span>
      {isAnomaliesExpanded ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4" />
      )}
    </div>
    
    {isAnomaliesExpanded && (
      <div className="ml-4 space-y-2">
        <p className="text-sm">• 1.2cm mass in left upper quadrant</p>
        <p className="text-sm">• Irregular tissue density</p>
        <p className="text-sm">• Suspicious lymph node activity</p>
      </div>
    )}

    <p>📑 AI Suggestion: Biopsy Recommended</p>
    <p>📊 AI Confidence Score: 85%</p>
    <p>📈 Tumor Growth: +10% since last scan</p>
    <div className="mt-2">
  <div 
    className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
    onClick={() => setIsTrialsExpanded(!isTrialsExpanded)}
  >
    <span className="text-blue-600">🔬 Clinical Trial Matching Available →</span>
    {isTrialsExpanded ? (
      <ChevronUp className="ml-2 h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 text-blue-600" />
    )}
  </div>

  {isTrialsExpanded && (
    <div className="mt-2 ml-4 space-y-3">
      {clinicalTrials.map((trial, index) => (
        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900">{trial.title}</h4>
          <div className="mt-1 text-sm space-y-1">
            <p>Status: <span className="text-green-600">{trial.status}</span></p>
            <p>Location: {trial.location}</p>
            <p>Criteria: {trial.criteria}</p>
            <a 
              href={trial.link}
              className="inline-block text-blue-600 hover:underline mt-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  </div>
</Card>

        {/* Follow-Up & Alerts */}
        <Card className="p-4 w-full">
          <div className="text-lg font-semibold">Follow-Up & Alerts</div>
          <p className="text-red-600 font-semibold flex items-center mt-2">
            <span className="mr-2">❗</span> Urgent MRI Needed
          </p>
          <p className="text-blue-600 flex items-center mt-1">
            <span className="mr-2">📅</span> Next Scan: {selectedDate}
          </p>
          <button
            className="w-full mt-3 bg-green-600 text-white text-lg font-semibold py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            onClick={handleScheduleClick}
            style={{ backgroundColor: "#16A34A" }}
          >
            Schedule Scan
          </button>
          <button
            className="w-full mt-3 bg-purple-600 text-white text-lg font-semibold py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            style={{ backgroundColor: "#9333EA" }}
            onClick={handleSecondOpinionClick}
          >
            Request Second Opinion
          </button>
        </Card>
      </div>

      {/* Tumor Characteristics */}
      <Card className="mt-4 p-4 w-full">
        <div className="text-lg font-semibold">Tumor Characteristics</div>
        <p>🧬 Tumor Type: Breast Adenocarcinoma</p>
        <p>📏 Size: 3.2 cm</p>
        <p>📍 Location: Left Breast, Upper Quadrant</p>
        <p>🔬 Metastasis Status: Lymph Node Involvement</p>
      </Card>

      {/* Imaging Report Viewer */}
      <Card className="mt-4 p-4 w-full">
        <div className="text-lg font-semibold">Imaging Report Viewer</div>
        <div className="flex justify-between mt-2">
          <Button className="bg-blue-600 text-white flex items-center gap-2">
            <Download size={16} /> Download Report
          </Button>
          <div className="relative">
            <Button
              className="bg-purple-600 text-white flex items-center gap-2"
              onClick={handleShareClick}
            >
              <Share size={16} /> Share with Specialist
            </Button>
            {showSpecialists && (
              <Card className="absolute top-12 right-0 w-64 z-10 shadow-lg">
                <div className="p-2">
                  <h4 className="font-semibold mb-2">Select Specialist:</h4>
                  {specialists.map((doc) => (
                    <div key={doc.name} className="p-2 hover:bg-gray-100 rounded">
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.specialty}</p>
                      <Button
                        size="sm"
                        className="mt-1 w-full"
                        onClick={() => handleRequestSend(doc.name)}
                        disabled={!!requestSentTo}
                      >
                        {requestSentTo === doc.name ? "Sent ✓" : "Send Request"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button className="bg-gray-600 text-white">DICOM Viewer</Button>
          <Button className="bg-gray-600 text-white">AI Overlay</Button>
          <Button className="bg-gray-600 text-white">Auto-Report</Button>
        </div>
      </Card>

      {/* MRI Scan Booking Panel */}
      {showBooking && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <Card className="p-6 bg-white w-96">
            <div className="text-lg font-semibold mb-4">Book MRI Scan</div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Date</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <CalendarIcon size={16} className="mr-2 text-gray-500" />
                <input
                  type="date"
                  className="w-full outline-none"
                  value="2025-03-20"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <Clock size={16} className="mr-2 text-gray-500" />
                <input
                  type="time"
                  className="w-full outline-none"
                  value="10:00"
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button className="bg-gray-500 text-white" onClick={() => setShowBooking(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 text-white" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Second Opinion Panel */}
      {showSecondOpinion && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
    <Card className="p-6 bg-white w-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Telemedicine Consultation</h3>
        <button 
          onClick={() => setShowSecondOpinion(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {!showAppointmentForm ? (
        <>
          <div className="mb-4">
            <label className="block mb-2">Select Specialist:</label>
            <select className="w-full p-2 border rounded">
              {specialists.map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name} - {doc.specialty}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleConnectDoctor}
          >
            Connect Now
          </Button>
        </>
      ) : (
        <form onSubmit={handleBookAppointment}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <div className="flex items-center border rounded-lg p-2">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                <input
                  type="date"
                  required
                  className="w-full outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Time</label>
              <div className="flex items-center border rounded-lg p-2">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <input
                  type="time"
                  required
                  className="w-full outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div>
      <label className="block mb-1 text-sm font-medium">
        Email Address (for telemedicine link)
      </label>
      <div className="flex items-center border rounded-lg p-2">
        <Mail className="h-4 w-4 mr-2 text-gray-500" />
        <input
          type="email"
          required
          placeholder="jane.doe@example.com"
          className="w-full outline-none"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
      We'll send the telemedicine link to this email address
    </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      )}

      {connectionStatus && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded text-sm">
          {connectionStatus}
        </div>
      )}
    </Card>
  </div>
)}

{appointmentBooked && (
    <div className="fixed bottom-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-lg">
      <p>📧 Email sent to {formData.email}</p>
      <p className="text-sm mt-1">Telemedicine link valid until {formData.date} {formData.time}</p>
    </div>
  )}

      {/* Booking Confirmation */}
      {bookingConfirmed && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          ✅ MRI Scan booked for {selectedDate} at {selectedTime}
        </div>
      )}
    </div>
  );
};