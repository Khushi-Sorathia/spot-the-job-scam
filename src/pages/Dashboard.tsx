import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Shield } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { SuspiciousListings } from '../components/SuspiciousListings';
import { FeatureImportance } from '../components/FeatureImportance';
import { generateMockData } from '../utils/mockData';

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const fraudData = [
    { name: 'Legitimate', value: data.totalJobs - data.fraudulentJobs, color: '#22c55e' },
    { name: 'Fraudulent', value: data.fraudulentJobs, color: '#ef4444' }
  ];

  const riskDistribution = [
    { range: '0-20%', count: 1250 },
    { range: '21-40%', count: 890 },
    { range: '41-60%', count: 340 },
    { range: '61-80%', count: 180 },
    { range: '81-100%', count: 95 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fraud Detection Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring and analysis of job posting fraud</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Jobs Analyzed"
          value={data.totalJobs.toLocaleString()}
          change=""
          trend="up"
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Fraudulent Jobs Detected"
          value={data.fraudulentJobs.toLocaleString()}
          change=""
          trend="up"
          icon={AlertTriangle}
          color="red"
        />
        <MetricCard
          title="Detection Accuracy"
          value={`${data.accuracy}%`}
          change=""
          trend="up"
          icon={Shield}
          color="green"
        />
        <MetricCard
          title="F1 Score"
          value={data.f1Score}
          change=""
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fraud Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Posting Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fraudData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {fraudData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {fraudData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SuspiciousListings />
        <FeatureImportance />
      </div>
    </div>
  );
}