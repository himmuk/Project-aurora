import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaTrophy, FaMedal, FaGift, FaClock, FaCheckCircle, FaHospital, FaHandsHelping } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const GamificationDashboard = () => {
  const [activities, setActivities] = useState([
    { id: 1, text: "Completed 5th chemotherapy session", date: "2023-07-20", type: "milestone" },
    { id: 2, text: "Joined daily mindfulness challenge", date: "2023-07-19", type: "achievement" }
  ]);

  const [rewards, setRewards] = useState([
    { id: 1, title: "Therapy Dog Visit", claimed: false },
    { id: 2, title: "Massage Session", claimed: false },
    { id: 3, title: "Nutrition Consultation", claimed: false }
  ]);

  const [treatmentProgress] = useState({
    completed: 5,
    total: 12,
    phase: "Treatment Phase 2",
    nextSession: "2025-03-25"
  });

  // Treatment Progress Chart Data
  const progressData = [
    { name: "Completed", value: treatmentProgress.completed, color: "#4caf50" },
    { name: "Remaining", value: treatmentProgress.total - treatmentProgress.completed, color: "#e0e0e0" }
  ];

  // Support Network (Leaderboard)
  const supportNetwork = [
    { name: "Dr. Smith", role: "Oncologist", points: "⭐ 4.9/5" },
    { name: "Nurse Sarah", role: "Care Coordinator", points: "💖 98% Satisfaction" },
    { name: "Patient Group", role: "Support Community", points: "👥 150 Members" }
  ];

  const handleClaimReward = (rewardId) => {
    setRewards(rewards.map(reward => 
      reward.id === rewardId ? { ...reward, claimed: true } : reward
    ));
    
    const claimedReward = rewards.find(r => r.id === rewardId);
    setActivities([...activities, {
      id: Date.now(),
      text: `Claimed Reward: ${claimedReward.title}`,
      date: new Date().toISOString(),
      type: "reward"
    }]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-100 text-black p-4 rounded-lg shadow-md text-xl font-bold">
        <span>Gamification</span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {/* Treatment Progress */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
            <FaHospital className="text-2xl" />
            Treatment Progress
          </h2>
          <div className="text-center">
            <PieChart width={240} height={240}>
              <Pie
                data={progressData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold"
              >
                {((treatmentProgress.completed / treatmentProgress.total) * 100).toFixed(0)}%
              </text>
              <Tooltip />
              <Legend />
            </PieChart>
            <p className="text-gray-600">
              Next Session: {new Date(treatmentProgress.nextSession).toLocaleDateString()}
            </p>
          </div>
        </Card>

        {/* Care Team Leaderboard */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-600">
            <FaHandsHelping className="text-2xl" />
            Care Team
          </h2>
          <div className="space-y-4">
            {supportNetwork.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <span className="text-lg">{member.points}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Challenges */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-600">
            <FaTrophy className="text-2xl" />
            Daily Challenges
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <div>
                <span>Complete symptom tracker</span>
                <span className="ml-2 bg-blue-100 px-2 py-1 rounded-full text-sm">+200 pts</span>
              </div>
              <FaCheckCircle className="text-green-500" />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <div>
                <span>15-minute mindfulness exercise</span>
                <span className="ml-2 bg-blue-100 px-2 py-1 rounded-full text-sm">+50 pts</span>
              </div>
              <FaClock className="text-yellow-500" />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <div>
                <span>Share encouragement post</span>
                <span className="ml-2 bg-blue-100 px-2 py-1 rounded-full text-sm">+100 pts</span>
              </div>
              <FaGift className="text-purple-500" />
            </div>
          </div>
        </Card>
{/* Rewards Center */}
    <Card className="p-6 bg-white shadow-lg col-span-2">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
        <FaGift className="text-2xl" />
        Wellness Rewards
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map(reward => (
          <div
            key={reward.id}
            className={`p-4 rounded-lg transition-all ${
              reward.claimed 
                ? 'bg-gray-200 opacity-75' 
                : 'bg-white hover:shadow-md cursor-pointer border-2 border-transparent hover:border-blue-200'
            }`}
            onClick={() => !reward.claimed && handleClaimReward(reward.id)}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${reward.claimed ? 'text-gray-500' : 'text-gray-900'}`}>
                {reward.title}
              </span>
              {reward.claimed ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Claim Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Activity Feed */}
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-600">
        <FaMedal className="text-2xl" />
        Achievement Log
      </h2>
      <div className="space-y-4 h-64 overflow-y-auto">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
            <div className="w-2 h-2 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
            <div>
              <p className="font-medium">{activity.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
    <Card className="p-6 bg-white shadow-lg">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-600">
<FaTrophy className="text-2xl" />
Hope Heroes
  </h2>
  <div className="space-y-4">
    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-purple-600">🥇</span>
        <div>
          <p className="font-semibold">Sarah Warrior</p>
          <p className="text-sm text-gray-600">Completed 8/10 milestones</p>
        </div>
      </div>
      <span className="text-lg bg-purple-100 px-3 py-1 rounded-full">💖 1200 Hope Points</span>
    </div>
<div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
  <div className="flex items-center gap-4">
    <span className="font-bold text-gray-600">🥈</span>
    <div>
      <p className="font-semibold">John Fighter</p>
      <p className="text-sm text-gray-600">Active 25 days streak</p>
    </div>
  </div>
  <span className="text-lg bg-blue-100 px-3 py-1 rounded-full">🌟 950 Points</span>
</div>

<div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
  <div className="flex items-center gap-4">
    <span className="font-bold text-yellow-600">🥉</span>
    <div>
      <p className="font-semibold">Emma Champion</p>
      <p className="text-sm text-gray-600">Completed all challenges</p>
    </div>
  </div>
  <span className="text-lg bg-green-100 px-3 py-1 rounded-full">✨ 880 Points</span>
</div>
  </div>
  </Card>
      </div>
    </div>
  );
};
export default GamificationDashboard; 