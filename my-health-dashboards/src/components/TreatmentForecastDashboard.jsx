import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, AlertTriangle, Heart, Calendar } from "lucide-react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TreatmentForecastDashboard() {
  // Chart Data State
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'Tumor Size (cm)',
      data: [4.2, 4.0, 3.8, 3.9, 3.6, 3.4, 3.5, 3.2, 3.0, 2.8, 2.9, 2.7],
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
      tension: 0.4,
    }],
  });

  const [currentWeek, setCurrentWeek] = useState(13);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate tumor size changes
  const simulateTumorChange = (currentSize, weekNumber) => {
    const isTreatmentWeek = (weekNumber % 3) === 0; // Treatment every 3 weeks
    const baseChange = isTreatmentWeek ? -0.4 : 0.15; // Shrink during treatment, grow otherwise
    const variability = (Math.random() * 0.4 - 0.2) * Math.abs(baseChange); // ±20% variability
    const resistance = Math.random() < 0.05 ? 0.3 : 0; // 5% chance of resistance
    return Math.max(currentSize + baseChange + variability + resistance, 0.5); // Never below 0.5cm
  };

  // Handle manual refresh
  const handleRefresh = () => {
    setIsLoading(true);

    // Update chart data
    setChartData(prev => {
      const newData = [...prev.datasets[0].data];
      const newLabels = [...prev.labels];
      const currentWeek = newData.length + 1;

      const lastSize = newData[newData.length - 1];
      const newSize = simulateTumorChange(lastSize, currentWeek);

      newData.push(parseFloat(newSize.toFixed(1)));
      newLabels.push(`Week ${currentWeek + 1}`);

      return {
        labels: newLabels,
        datasets: [{
          ...prev.datasets[0],
          data: newData,
        }],
      };
    });

    setCurrentWeek(prev => prev + 1);

    // Simulate API delay
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="bg-blue-100 text-black p-4 rounded-lg">
        <span className="text-xl font-bold">Treatment Forecast Dashboard</span>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-grow">
        {/* Weekly Tumor Chart */}
        <Card className="p-6 w-full flex flex-col justify-between h-full">
          <div>
            <div className="text-lg font-semibold">Weekly Tumor Measurement</div>
            <p className="text-sm text-gray-500">
              Clinical measurements taken weekly (Current: Week {currentWeek - 1})
            </p>
          </div>
          <div className="h-80">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    title: { display: true, text: 'Tumor Size (cm)' },
                    min: 0,
                    max: 5,
                    ticks: { precision: 1 },
                  },
                  x: {
                    title: { display: true, text: 'Treatment Week' },
                    ticks: { autoSkip: true, maxTicksLimit: 12 },
                  },
                },
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${context.parsed.y} cm`,
                    },
                  },
                },
              }}
            />
          </div>
          <Button
            className="mt-4 bg-blue-600 text-white flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Updating...' : 'Refresh Data'}
          </Button>
        </Card>

        {/* Prediction & Alerts */}
        <Card className="p-6 w-full flex flex-col justify-between h-full">
          <div className="text-lg font-semibold">Prediction & Alerts</div>
          <div className="space-y-4 mt-4">
            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
              <Calendar size={20} className="text-blue-600" />
              <div>
                <strong>Next Chemotherapy Cycle</strong>
                <p className="text-sm text-gray-500">Scheduled for: Week {currentWeek + 2}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
              <Calendar size={20} className="text-blue-600" />
              <div>
                <strong>Follow-Up Consultation</strong>
                <p className="text-sm text-gray-500">Scheduled for: Week {currentWeek + 4}</p>
              </div>
            </div>
            <div className="bg-yellow-200 p-3 rounded-lg flex items-center gap-3">
              <AlertTriangle size={20} className="text-yellow-600" />
              <div>
                <strong>High Risk: Nausea</strong>
                <p className="text-sm text-gray-700">Monitor closely for side effects.</p>
              </div>
            </div>
            <div className="bg-red-200 p-3 rounded-lg flex items-center gap-3">
              <Heart size={20} className="text-red-600" />
              <div>
                <strong>Monitor: Elevated Heart Rate</strong>
                <p className="text-sm text-gray-700">Potential complications need attention.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Treatment Summary Table */}
      <Card className="p-6 w-full flex-grow">
        <div className="text-lg font-semibold flex items-center gap-2">
          📋 Treatment Summary
        </div>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Week</th>
              <th className="border p-2">Treatment</th>
              <th className="border p-2">Response</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">ECOG Score</th>
              <th className="border p-2">RECIST</th>
            </tr>
          </thead>
          <tbody>
            {chartData.labels.map((week, index) => (
              <tr key={week}>
                <td className="border p-2">{week}</td>
                <td className="border p-2">
                  {index % 3 === 0 ? 'Chemotherapy' : 'Monitoring'}
                </td>
                <td className="border p-2">
                  {chartData.datasets[0].data[index] < 3.0 ? 'Positive' : 'Stable'}
                </td>
                <td className="border p-2">
                  {chartData.datasets[0].data[index].toFixed(1)}cm tumor size
                </td>
                <td className="border p-2">{index % 4 === 0 ? 1 : 0}</td>
                <td className="border p-2">
                  {chartData.datasets[0].data[index] < 2.5 ? 'PR' : 'SD'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}