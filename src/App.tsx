import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { Predictions } from './pages/Predictions';
import { API } from './pages/API';
import { Documentation } from './pages/Documentation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 dark:from-gray-200 dark:via-gray-100 dark:to-gray-500">

        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/upload" element={<Upload />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/api" element={<API />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;