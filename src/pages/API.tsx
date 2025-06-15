import React, { useState } from 'react';
import { Code, Key, Send, CheckCircle, Copy } from 'lucide-react';

export function API() {
  const [apiKey, setApiKey] = useState('');
  const [testPayload, setTestPayload] = useState(`{
  "title": "Software Engineer",
  "description": "We are looking for a skilled software engineer...",
  "company_profile": "TechCorp is a leading software company...",
  "salary_range": "$80,000 - $120,000",
  "requirements": "Bachelor's degree in Computer Science...",
  "benefits": "Health insurance, 401k, flexible hours...",
  "telecommuting": false,
  "has_company_logo": true,
  "has_questions": true,
  "employment_type": "Full-time",
  "required_experience": "3-5 years",
  "required_education": "Bachelor's degree",
  "industry": "Technology",
  "function": "Engineering"
}`);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateApiKey = () => {
    const key = 'fg_' + Math.random().toString(36).substr(2, 32);
    setApiKey(key);
  };

  const testApi = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 'success',
        data: {
          risk_score: 0.23,
          risk_level: 'Low',
          confidence: 0.89,
          features: {
            text_analysis: 0.15,
            structural_features: 0.31,
            company_verification: 0.12
          },
          recommendations: [
            'Job posting appears legitimate',
            'Company profile is well-established',
            'Salary range is reasonable for the role'
          ]
        }
      });
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600 mt-2">Integrate fraud detection into your applications</p>
      </div>

      {/* API Key Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">API Authentication</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          Generate an API key to authenticate your requests to the FraudGuard API.
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={apiKey}
              readOnly
              placeholder="Click 'Generate API Key' to create a new key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
            />
          </div>
          <button
            onClick={generateApiKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Generate API Key
          </button>
          {apiKey && (
            <button
              onClick={() => copyToClipboard(apiKey)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Endpoints */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
        
        <div className="space-y-6">
          {/* Single Prediction */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
              <code className="text-sm font-mono">/api/v1/predict</code>
            </div>
            <p className="text-gray-600 mb-3">Analyze a single job posting for fraud detection</p>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">Headers:</p>
              <code className="text-xs text-gray-600 block">
                Authorization: Bearer {apiKey || 'YOUR_API_KEY'}<br/>
                Content-Type: application/json
              </code>
            </div>
          </div>

          {/* Batch Prediction */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
              <code className="text-sm font-mono">/api/v1/predict/batch</code>
            </div>
            <p className="text-gray-600 mb-3">Analyze multiple job postings in a single request</p>
            
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">Rate Limits:</p>
              <code className="text-xs text-gray-600 block">
                1000 requests per hour<br/>
                Maximum 100 jobs per batch request
              </code>
            </div>
          </div>

          {/* Model Info */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">GET</span>
              <code className="text-sm font-mono">/api/v1/model/info</code>
            </div>
            <p className="text-gray-600">Get information about the current model version and performance metrics</p>
          </div>
        </div>
      </div>

      {/* API Testing */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">API Testing</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Payload</label>
            <textarea
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={testApi}
            disabled={loading || !apiKey}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Testing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Test API</span>
              </>
            )}
          </button>
          
          {response && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SDKs and Examples */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">JavaScript/Node.js</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm">
{`const response = await fetch('https://api.fraudguard.com/v1/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Software Engineer',
    description: 'Job description...',
    // ... other fields
  })
});

const result = await response.json();
console.log('Risk Score:', result.data.risk_score);`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Python</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm">
{`import requests

headers = {
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}',
    'Content-Type': 'application/json'
}

data = {
    'title': 'Software Engineer',
    'description': 'Job description...',
    # ... other fields
}

response = requests.post(
    'https://api.fraudguard.com/v1/predict',
    headers=headers,
    json=data
)

result = response.json()
print(f"Risk Score: {result['data']['risk_score']}")`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}