import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parseCSV, validateJobData } from '../utils/csvProcessor';
import { processJobData } from '../utils/fraudDetection';

export function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please upload a CSV file');
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const csvData = await parseCSV(file);
      const validation = validateJobData(csvData);
      
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        setProcessing(false);
        return;
      }
      
      const processedResults = processJobData(csvData);
      setResults(processedResults);
    } catch (err) {
      setError('Error processing file. Please check the format and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setResults(null);
    setError(null);
  };

  const viewDetailedResults = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Job Data</h1>
        <p className="text-gray-600 mt-2">Upload CSV files to detect fraudulent job postings</p>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your CSV file here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports CSV files up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Selected File */}
          {file && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetUpload}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Process Button */}
          {file && !error && (
            <button
              onClick={processFile}
              disabled={processing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <UploadIcon className="h-5 w-5" />
                  <span>Process File</span>
                </>
              )}
            </button>
          )}

          {/* Required Columns Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Required CSV Columns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Basic Information:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• salary_range</li>
                  <li>• company_profile</li>
                  <li>• description</li>
                  <li>• requirements</li>
                  <li>• benefits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Job Details:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• telecommuting</li>
                  <li>• has_company_logo</li>
                  <li>• has_questions</li>
                  <li>• employment_type</li>
                  <li>• required_experience</li>
                  <li>• required_education</li>
                  <li>• industry</li>
                  <li>• function</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Display */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Processing Complete</h2>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{results.totalProcessed}</div>
                <div className="text-sm text-gray-600">Jobs Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{results.fraudulent}</div>
                <div className="text-sm text-gray-600">Fraudulent Detected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {((results.fraudulent / results.totalProcessed) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Fraud Rate</div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={resetUpload}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Upload New File
            </button>
            <button
              onClick={viewDetailedResults}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Detailed Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}