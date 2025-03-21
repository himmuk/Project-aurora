import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, MapPin, CarFront, HandCoins, Users, Bike, Banknote, HeartHandshake } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SDOHSupportDashboard() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [screeningInfo, setScreeningInfo] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const chatContainerRef = useRef(null);

  // Resource Data
  const resources = [
    {
      icon: <CarFront className="w-6 h-6" />,
      title: "Transportation Support",
      description: "Access local ride-share programs and public transportation options",
      action: "Find Rides"
    },
    {
      icon: <HandCoins className="w-6 h-6" />,
      title: "Financial Aid",
      description: "Apply for financial assistance programs and subsidies",
      action: "Apply Now"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Connect with local community health workers and support groups",
      action: "Connect"
    },
    {
      icon: <Bike className="w-6 h-6" />,
      title: "Local Ride Share",
      description: "Access discounted ride-sharing services in your area",
      action: "View Programs"
    }
  ];

  // Resource Marker Data
  const resourceMarkers = {
    transportation: [
      { position: [51.505, -0.095], title: "Taxi Stand", type: "taxi" },
      { position: [51.51, -0.1], title: "Uber Hub", type: "rideshare" },
      { position: [51.495, -0.09], title: "City Bikes", type: "bikeshare" },
      { position: [51.5, -0.085], title: "Public Transit Hub", type: "transit" },
      { position: [51.507, -0.091], title: "Cancer Patient Shuttle Stop", type: "shuttle" },
      { position: [51.503, -0.089], title: "Non-Emergency Medical Transport", type: "medical_transport" },
      { position: [51.506, -0.087], title: "Hospital Taxi Stand", type: "taxi" },
    { position: [51.510, -0.094], title: "Volunteer Ride Service Hub", type: "volunteer_ride" }

    ],
    financial: [
      { position: [51.508, -0.11], title: "Financial Aid Office" },
      { position: [51.503, -0.09], title: "Credit Union" },
      { position: [51.513, -0.08], title: "Government Assistance Center" }
    ],
    community: [
      { position: [51.505, -0.09], title: "Community Center" },
      { position: [51.51, -0.12], title: "Mental Health Center" },
      { position: [51.499, -0.085], title: "Food Bank" },
      { position: [51.502, -0.095], title: "Cancer Support Group Center" },
      { position: [51.508, -0.1], title: "Palliative Care & Wellness Hub" }
    ],
    rideshare: [
      { position: [51.502, -0.095], title: "Zipcar Location" },
      { position: [51.507, -0.105], title: "Lyft Zone" },
      { position: [51.497, -0.09], title: "Car Share Hub" }
    ]
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [
        ...prev,
        { text: inputMessage, isUser: true },
        { text: "Thank you for messaging. What you want to know cab service, hospital transport, and financial aid programs?.", isUser: false }
      ]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleResourceAction = (resourceType) => {
    setSelectedResource(resourceType);
    switch(resourceType) {
      case 'Transportation Support':
        setCurrentMarkers(resourceMarkers.transportation);
        setScreeningInfo("Transportation risk detected: 78% of patients in your area report transportation barriers. Available options:");
        break;
      case 'Financial Aid':
        setCurrentMarkers(resourceMarkers.financial);
        setScreeningInfo("Financial risk score: 72. Based on your location, these assistance programs are available:");
        break;
      case 'Community Support':
        setCurrentMarkers(resourceMarkers.community);
        setScreeningInfo("Community connection score: 84. Available support networks:");
        break;
      case 'Local Ride Share':
        setCurrentMarkers(resourceMarkers.rideshare);
        setScreeningInfo("Rideshare availability: High. Nearby transportation partners:");
        break;
      default:
        setCurrentMarkers([]);
        setScreeningInfo("");
    }
  };

  // Chart Data
  const riskData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Transportation Risk',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
      },
      {
        label: 'Financial Risk',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.4,
      },
    ],
  };

  // Map Configuration
  const mapCenter = [51.505, -0.09];

  const ResourceCard = ({ icon, title, description, action }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border cursor-pointer"
      onClick={() => handleResourceAction(title)}
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <Button className="mt-4" variant="outline">
            {action}
          </Button>
        </div>
      </div>
    </div>
  );

  const MapMarkers = () => (
    <>
      {currentMarkers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div className="font-semibold">{marker.title}</div>
            {marker.type && (
              <span className="text-sm text-gray-600">
                {marker.type === 'taxi' && '24/7 availability'}
                {marker.type === 'rideshare' && 'App-based service'}
                {marker.type === 'bikeshare' && '50+ bikes available'}
              </span>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-blue-100 text-black p-4 rounded-lg">
        <h1 className="text-xl font-bold">Life Essentials</h1>
      </header>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Screening Results Panel */}
        <Card className="p-6 w-full">
          <div className="text-lg font-semibold">
            Screening Results {selectedResource && `- ${selectedResource}`}
          </div>
          <div className="mt-4 h-48">
            {screeningInfo ? (
              <div className="space-y-4">
                <p className="text-gray-700">{screeningInfo}</p>
                <div className="flex gap-2 flex-wrap">
                  {currentMarkers.map((marker, index) => (
                    <span key={index} className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {marker.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <Line
                data={riskData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: {
                    y: { title: { display: true, text: 'Risk Score' } },
                    x: { title: { display: true, text: 'Month' } }
                  }
                }}
              />
            )}
          </div>
        </Card>
  
        {/* Resource Connection Panel */}
        <Card className="p-6 w-full">
          <div className="text-lg font-semibold mb-4">Resource Connection Panel</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                icon={resource.icon}
                title={resource.title}
                description={resource.description}
                action={resource.action}
              />
            ))}
          </div>
        </Card>
      </div>
  
      {/* Interactive Map */}
      <div className="mt-6">
        <Card className="p-6 w-full">
          <div className="text-lg font-semibold flex items-center gap-2">
            <MapPin size={24} className="text-blue-600" /> 
            {selectedResource ? `${selectedResource} Locations` : "Nearby Support Services"}
          </div>
          <div className="h-96 mt-4 rounded-lg overflow-hidden">
            <MapContainer center={mapCenter} zoom={14} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapMarkers />
            </MapContainer>
          </div>
        </Card>
      </div>
  
      {/* Chatbot Support */}
      <div className="mt-6">
        <Card className="p-6">
          <div className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare size={24} className="text-blue-600" /> Chatbot Support
          </div>
          <div className="h-96 mt-4 flex flex-col">
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-t-lg"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-2 mb-2 rounded-lg max-w-[80%] ${
                    msg.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type your message..."
                aria-label="Type your message"
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 text-white">
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )};