import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export function SuspiciousListings() {
  const suspiciousJobs = [
    {
      id: 1,
      title: 'Make $5000/week from home!',
      company: 'Quick Money LLC',
      risk_score: 0.92,
      location: 'Remote',
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'Work from home - No experience needed!',
      company: 'Easy Jobs Inc.',
      risk_score: 0.88,
      location: 'Remote',
      posted: '4 hours ago'
    },
    {
      id: 3,
      title: 'Data Entry Specialist - $80/hour',
      company: 'Global Data Solutions',
      risk_score: 0.85,
      location: 'Remote',
      posted: '6 hours ago'
    },
    {
      id: 4,
      title: 'Marketing Manager - High Pay!',
      company: 'Marketing Pro Ltd',
      risk_score: 0.78,
      location: 'Various',
      posted: '8 hours ago'
    },
    {
      id: 5,
      title: 'Customer Service Rep - Immediate Start',
      company: 'Service Excellence Co.',
      risk_score: 0.72,
      location: 'Remote',
      posted: '12 hours ago'
    },
    {
      id: 6,
      title: 'Easy Money - Apply Now!',
      company: 'Fast Cash Corp',
      risk_score: 0.89,
      location: 'Remote',
      posted: '1 day ago'
    },
    {
      id: 7,
      title: 'Earn $100/hour working part-time!',
      company: 'High Pay Solutions',
      risk_score: 0.84,
      location: 'Various',
      posted: '1 day ago'
    },
    {
      id: 8,
      title: 'No Skills Required - Big Money!',
      company: 'Instant Income LLC',
      risk_score: 0.91,
      location: 'Remote',
      posted: '2 days ago'
    },
    {
      id: 9,
      title: 'Administrative Assistant - Flexible Hours',
      company: 'Remote Work Co.',
      risk_score: 0.67,
      location: 'Remote',
      posted: '2 days ago'
    },
    {
      id: 10,
      title: 'Quick Cash Opportunity!',
      company: 'Money Makers Inc.',
      risk_score: 0.86,
      location: 'Various',
      posted: '3 days ago'
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 0.8) return 'text-red-700 bg-red-100';
    if (score >= 0.6) return 'text-orange-700 bg-orange-100';
    return 'text-yellow-700 bg-yellow-100';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top 10 Suspicious Listings</h3>
        <AlertTriangle className="h-5 w-5 text-red-500" />
      </div>
      
      <div className="space-y-4">
        {suspiciousJobs.map((job, index) => (
          <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                <h4 className="font-medium text-gray-900 flex-1">{job.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">{job.company}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.posted}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(job.risk_score)}`}>
                {(job.risk_score * 100).toFixed(0)}%
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}