import React from 'react';
import { BookOpen, FileText, Code, Database, Shield, TrendingUp } from 'lucide-react';

export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600 mt-2">Complete guide to using the FraudGuard system</p>
      </div>

      {/* System Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
        </div>

        <p className="text-gray-600 mb-4">
          FraudGuard is a machine learning system developed to identify fraudulent job postings. It integrates preprocessing, 
          semantic modeling, and classification for fraud detection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Key Features</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Text and metadata-based analysis</li>
              <li>• Feature engineering with NLP</li>
              <li>• Integrated fraud classifier pipeline</li>
              <li>• BERT-based embedding support</li>
              <li>• Multiple model ensembling</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Performance Metrics</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Accuracy: 96%</li>
              <li>• F1-Score: 0.88</li>
              <li>• Precision: 0.91</li>
              <li>• Recall: 0.85</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Requirements */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Data Requirements</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Input Fields</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Field</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-600">title</td>
                    <td className="px-4 py-3 text-gray-600">Text</td>
                    <td className="px-4 py-3 text-gray-600">Job title</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-600">description</td>
                    <td className="px-4 py-3 text-gray-600">Text</td>
                    <td className="px-4 py-3 text-gray-600">Job description body</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-600">company_profile</td>
                    <td className="px-4 py-3 text-gray-600">Text</td>
                    <td className="px-4 py-3 text-gray-600">Company information</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-600">salary_range</td>
                    <td className="px-4 py-3 text-gray-600">String</td>
                    <td className="px-4 py-3 text-gray-600">Compensation details</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-blue-600">requirements</td>
                    <td className="px-4 py-3 text-gray-600">Text</td>
                    <td className="px-4 py-3 text-gray-600">Skills and qualifications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Model Architecture */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Model Architecture</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Feature Engineering Pipeline</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li><strong>Text Cleaning:</strong> Lowercasing, removing special characters</li>
                <li><strong>Text Preprocessing:</strong> Tokenization, stop word removal, stemming</li>
                <li><strong>Feature Extraction:</strong> TF-IDF Vectorizer (unigrams & bigrams)</li>
                <li><strong>Semantic Embeddings:</strong> Sentence-BERT (sBERT)</li>
                <li><strong>Encoding:</strong> Label encoding for categorical features</li>
                <li><strong>Feature Selection:</strong> Correlation thresholding and PCA</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Model Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Primary Classifier</h4>
                <p className="text-sm text-purple-800">
                  Ensemble stack of Random Forest, Gradient Boosting (XGBoost), and SVM for classification.
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Text Analysis</h4>
                <p className="text-sm text-indigo-800">
                  Sentence-BERT model used for extracting contextual embeddings of job descriptions and company details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Data Protection</h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• All user data anonymized</li>
              <li>• Secure CSV upload over HTTPS</li>
              <li>• No long-term storage of raw job data</li>
              <li>• End-to-end encrypted prediction calls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
