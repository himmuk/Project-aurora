import { useState } from "react";

const Telemedicine = () => {
  const [doctorNotes, setDoctorNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Doctor's Personal Recommendations (Static & Uneditable)
  const doctorRecommendations = [
    "Follow up in 2 weeks for re-evaluation.",
    "Maintain a healthy diet and exercise regularly.",
    "Ensure proper medication adherence.",
    "Consult a specialist if symptoms worsen.",
    "Get routine blood tests every 3 months."
  ];

  // Save doctor's notes
  const handleSaveNotes = () => {
    setSavedNotes(doctorNotes);
  };

  // Send message and show in doctor's panel
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <div className="bg-blue-100 text-black p-4 rounded-lg text-xl font-bold">
        Telemedicine Consultation
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 mt-4">
        {/* Doctor's Panel (60%) */}
        <div className="w-3/5 bg-white shadow-md rounded-md p-4">
          <h3 className="font-semibold">Dr. Smith</h3>
          <div className="w-full h-56 bg-gray-300 flex items-center justify-center rounded-md mt-2">
            <p className="text-gray-500">DICOM Image Placeholder</p>
          </div>
          <p className="text-red-600 font-semibold mt-2">⚠ High Risk: Follow-Up Recommended</p>

          {/* Doctor's Notes */}
          <div className="mt-4">
            <h4 className="font-semibold">Doctor’s Notes</h4>
            <textarea
              className="w-full h-16 border rounded-md p-2 mt-2"
              placeholder="Enter doctor's notes here..."
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
            ></textarea>
            <button onClick={handleSaveNotes} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md">
              Save Notes
            </button>

            {/* Saved Notes Display */}
            {savedNotes && (
              <div className="mt-2 p-2 bg-gray-200 rounded-md">
                <strong>Saved Notes:</strong> {savedNotes}
              </div>
            )}
          </div>

          {/* Doctor’s Personal Recommendations (Static & Not Editable) */}
          <div className="mt-4 bg-gray-100 p-3 rounded-md">
            <h4 className="font-semibold">Doctor’s Recommendations</h4>
            <ul className="list-disc pl-5 mt-2">
              {doctorRecommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>

          {/* Doctor's Panel - Received Messages */}
          <div className="mt-4 p-2 bg-gray-100 rounded-md">
            <h4 className="font-semibold">Patient Messages</h4>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <p key={index} className="bg-white p-2 my-1 rounded-md shadow-sm">
                  {msg}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No messages received yet.</p>
            )}
          </div>
        </div>

        {/* Patient's Panel (40%) */}
        <div className="w-2/5 bg-white shadow-md rounded-md p-4">
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Video Feed Placeholder</p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 mt-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">🔇 Mute</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">⛔ End Call</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">📤 Share Screen</button>
          </div>

          {/* Messaging */}
          <div className="mt-4">
            <textarea
              className="w-full h-16 border rounded-md p-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button onClick={handleSendMessage} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
