import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radar, Upload, BarChart3, Code, BookOpen } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/upload', label: 'Upload Data', icon: Upload },
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/predictions', label: 'Predictions', icon: Radar },
    { path: '/api', label: 'API', icon: Code },
    { path: '/docs', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <>
      <style>
        {`
          @keyframes rotate360 {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .brand:hover .radar-icon {
            animation: rotate360 0.8s linear;
          }
        `}
      </style>
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Brand area */}
            <div
              className="brand flex items-center space-x-3 bg-blue-50 px-3 py-1 rounded-lg shadow-sm cursor-pointer hover:scale-105 transform transition-transform duration-300 ease-in-out"
            >
              <div className="bg-blue-600 p-1 rounded-full">
                <Radar className="radar-icon h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold text-blue-700 tracking-tight">FraudGuard</span>
                <span className="text-sm font-medium text-blue-600 italic">Smarter Job Fraud Detection</span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex space-x-8">
              {links.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
