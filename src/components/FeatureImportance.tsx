import React from 'react';
import { TrendingUp } from 'lucide-react';

export function FeatureImportance() {
  const features = [
    { name: 'Salary Range', importance: 0.85, description: 'Unrealistic salary promises' },
    { name: 'Description Length', importance: 0.72, description: 'Very short or vague descriptions' },
    { name: 'Contact Info', importance: 0.68, description: 'Missing company contact details' },
    { name: 'Company Profile', importance: 0.64, description: 'Incomplete company information' },
    { name: 'Requirements', importance: 0.59, description: 'Vague or minimal requirements' },
    { name: 'Telecommuting', importance: 0.55, description: 'Remote work emphasis' },
    { name: 'Industry', importance: 0.48, description: 'High-risk industry categories' },
    { name: 'Education Level', importance: 0.42, description: 'Minimal education requirements' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Key Risk Indicators</h3>
        <TrendingUp className="h-5 w-5 text-blue-500" />
      </div>
      
      <div className="space-y-3">
        {features.slice(0, 8).map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                <span className="text-xs text-gray-500">{(feature.importance * 100).toFixed(0)}%</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}