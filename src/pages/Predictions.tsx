import React, { useState } from 'react';
import { Search, Filter, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import { predictSingleJob } from '../utils/fraudDetection';


export function Predictions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [singleJobData, setSingleJobData] = useState({
    title: '',
    description: '',
    company_profile: '',
    salary_range: '',
    requirements: '',
    benefits: '',
    employment_type: 'Full-time',
    telecommuting: false,
    has_company_logo: false,
    has_questions: false,
    required_experience: '',
    required_education: '',
    industry: '',
    function: ''
  });
  const [prediction, setPrediction] = useState<any>(null);

  // Mock data for demonstration
  const mockPredictions = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      risk_score: 0.15,
      risk_level: 'Low',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      posted_date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Make $5000/week from home!',
      company: 'Quick Money LLC',
      risk_score: 0.92,
      risk_level: 'Critical',
      location: 'Remote',
      salary: 'Up to $250,000',
      posted_date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Global Marketing Solutions',
      risk_score: 0.68,
      risk_level: 'High',
      location: 'New York, NY',
      salary: '$70,000 - $90,000',
      posted_date: '2024-01-13'
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      risk_score: 0.25,
      risk_level: 'Low',
      location: 'Chicago, IL',
      salary: '$65,000 - $80,000',
      posted_date: '2024-01-12'
    },
    {
      id: 5,
      title: 'Work from home - No experience needed!',
      company: 'Easy Jobs Inc.',
      risk_score: 0.88,
      risk_level: 'Critical',
      location: 'Remote',
      salary: '$50,000+',
      posted_date: '2024-01-11'
    }
  ];

  const filteredPredictions = mockPredictions.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRisk === 'all') return matchesSearch;
    if (filterRisk === 'high') return matchesSearch && job.risk_score >= 0.6;
    if (filterRisk === 'medium') return matchesSearch && job.risk_score >= 0.3 && job.risk_score < 0.6;
    if (filterRisk === 'low') return matchesSearch && job.risk_score < 0.3;
    
    return matchesSearch;
  });

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return 'text-red-700 bg-red-100';
    if (score >= 0.5) return 'text-orange-700 bg-orange-100';
    if (score >= 0.3) return 'text-yellow-700 bg-yellow-100';
    return 'text-green-700 bg-green-100';
  };

  const handleSinglePrediction = () => {
    const result = predictSingleJob(singleJobData);
    setPrediction(result);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Job Predictions</h1>
        <p className="text-gray-600 mt-2">Analyze individual jobs and view prediction results</p>
      </div>

      {/* Single Job Prediction */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Single Job Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={singleJobData.title}
              onChange={(e) => setSingleJobData({...singleJobData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Profile</label>
            <input
              type="text"
              value={singleJobData.company_profile}
              onChange={(e) => setSingleJobData({...singleJobData, company_profile: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <input
              type="text"
              value={singleJobData.salary_range}
              onChange={(e) => setSingleJobData({...singleJobData, salary_range: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $50,000 - $70,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={singleJobData.industry}
              onChange={(e) => setSingleJobData({...singleJobData, industry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Technology, Healthcare"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            value={singleJobData.description}
            onChange={(e) => setSingleJobData({...singleJobData, description: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job description"
          />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={singleJobData.telecommuting}
              onChange={(e) => setSingleJobData({...singleJobData, telecommuting: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Remote/Telecommuting</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={singleJobData.has_company_logo}
              onChange={(e) => setSingleJobData({...singleJobData, has_company_logo: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Has Company Logo</span>
          </label>
        </div>

        <button
          onClick={handleSinglePrediction}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Analyze Job
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Prediction Result</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.risk_score)}`}>
                Risk Score: {(prediction.risk_score * 100).toFixed(1)}%
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Risk Factors:</h4>
                <ul className="mt-2 space-y-1">
                  {prediction.risk_factors.map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Positive Indicators:</h4>
                <ul className="mt-2 space-y-1">
                  {prediction.positive_factors.map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Batch Predictions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Predictions</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Results</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk (60%+)</option>
              <option value="medium">Medium Risk (30-60%)</option>
              <option value="low">Low Risk (&lt;30%)</option>
            </select>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Job Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Company</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Location</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Salary</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Risk Score</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPredictions.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{job.title}</td>
                  <td className="px-4 py-3 text-gray-600">{job.company}</td>
                  <td className="px-4 py-3 text-gray-600">{job.location}</td>
                  <td className="px-4 py-3 text-gray-600">{job.salary}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(job.risk_score)}`}>
                      {(job.risk_score * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{job.posted_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}