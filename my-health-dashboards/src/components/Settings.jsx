import React, { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaStethoscope, 
  FaExclamationTriangle, 
  FaLock 
} from "react-icons/fa";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const Settings = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    address: "456 Healing Lane, Care City, CC 12345",
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    oncologist: "Dr. Michael Chen",
    diagnosisDate: "2023-03-15",
    diagnosisType: "Breast Cancer",
    stage: "II",
    avatar: "https://via.placeholder.com/150",
    notificationPreferences: {
      medication: true,
      appointment: true,
      supportGroups: false
    }
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (type) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type]
      }
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Patient Settings</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editMode ? <MdSave /> : <MdEdit />}
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaUser className="text-blue-500" />
            Personal Information
          </h2>
          
          <div className="flex flex-col items-center mb-4">
            <img 
              src={profile.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mb-4"
            />
            {editMode && (
              <label className="cursor-pointer bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="space-y-4">
            <InputField 
              label="Full Name"
              icon={<FaUser />}
              value={profile.name}
              editMode={editMode}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <InputField 
              label="Email"
              icon={<FaEnvelope />}
              value={profile.email}
              type="email"
              editMode={editMode}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <InputField 
              label="Phone Number"
              icon={<FaPhone />}
              value={profile.phone}
              type="tel"
              editMode={editMode}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <InputField 
              label="Address"
              icon={<FaMapMarkerAlt />}
              value={profile.address}
              editMode={editMode}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaStethoscope className="text-green-500" />
            Medical Details
          </h2>
          <div className="space-y-4">
            <InputField 
              label="Primary Oncologist"
              value={profile.oncologist}
              editMode={editMode}
              onChange={(e) => handleInputChange("oncologist", e.target.value)}
            />
            <InputField 
              label="Diagnosis Date"
              type="date"
              value={profile.diagnosisDate}
              editMode={editMode}
              onChange={(e) => handleInputChange("diagnosisDate", e.target.value)}
            />
            <InputField 
              label="Cancer Type"
              value={profile.diagnosisType}
              editMode={editMode}
              onChange={(e) => handleInputChange("diagnosisType", e.target.value)}
            />
            <InputField 
              label="Stage"
              value={profile.stage}
              editMode={editMode}
              onChange={(e) => handleInputChange("stage", e.target.value)}
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-red-500" />
            Emergency Contact
          </h2>
          <div className="space-y-4">
            <InputField 
              label="Name"
              value={profile.emergencyContact.name}
              editMode={editMode}
              onChange={(e) => handleEmergencyContactChange("name", e.target.value)}
            />
            <InputField 
              label="Relationship"
              value={profile.emergencyContact.relationship}
              editMode={editMode}
              onChange={(e) => handleEmergencyContactChange("relationship", e.target.value)}
            />
            <InputField 
              label="Phone Number"
              type="tel"
              value={profile.emergencyContact.phone}
              editMode={editMode}
              onChange={(e) => handleEmergencyContactChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Privacy & Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaLock className="text-purple-500" />
            Privacy & Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Medication Reminders</span>
              <ToggleSwitch
                checked={profile.notificationPreferences.medication}
                onChange={() => handleNotificationChange("medication")}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Appointment Alerts</span>
              <ToggleSwitch
                checked={profile.notificationPreferences.appointment}
                onChange={() => handleNotificationChange("appointment")}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Support Group Updates</span>
              <ToggleSwitch
                checked={profile.notificationPreferences.supportGroups}
                onChange={() => handleNotificationChange("supportGroups")}
              />
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={() => setEditMode(false)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <MdCancel /> Cancel
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <MdSave /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, icon, value, type = "text", editMode, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-500">{icon}</span>}
      {editMode ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-lg"
        />
      ) : (
        <span className="p-2 text-gray-900">{value}</span>
      )}
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round"></span>
  </label>
);

export default Settings;
