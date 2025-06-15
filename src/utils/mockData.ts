export function generateMockData() {
  // Generate more realistic fraud statistics
  const totalJobs = 15247;
  const fraudRate = 0.12 + Math.random() * 0.08; // 12-20% fraud rate
  const fraudulentJobs = Math.floor(totalJobs * fraudRate);
  
  return {
    totalJobs,
    fraudulentJobs,
    accuracy: 99, 
    f1Score: 0.842, 
    precision:0.95 , 
    recall: 0.76, // 
    lastUpdated: new Date().toISOString()
  };
}

export function generateMockPredictions(count: number = 100) {
  const companies = [
    'TechCorp Inc.', 'Global Solutions', 'Innovation Labs', 'DataFlow Systems',
    'Quick Money LLC', 'Easy Jobs Inc.', 'Work From Home Co.', 'High Pay Ltd.',
    'Marketing Pro', 'Sales Excellence', 'Remote Work Solutions', 'Career Builder',
    'Microsoft', 'Google', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla'
  ];
  
  const legitimateTitles = [
    'Software Engineer', 'Data Analyst', 'Marketing Manager', 'Sales Representative',
    'Customer Service Representative', 'Project Manager', 'Business Analyst', 'Product Manager',
    'UX Designer', 'DevOps Engineer', 'Financial Analyst', 'HR Specialist'
  ];
  
  const fraudulentTitles = [
    'Make $5000/week from home!', 'Work from home - No experience needed!', 
    'Easy money - Apply now!', 'Earn $100/hour working part-time!',
    'Quick cash opportunity!', 'Immediate hiring - High pay!',
    'Work when you want - Unlimited income!', 'No skills required - Big money!'
  ];
  
  const locations = ['San Francisco, CA', 'New York, NY', 'Remote', 'Chicago, IL', 'Austin, TX', 'Various', 'Seattle, WA'];
  
  return Array.from({ length: count }, (_, i) => {
    // Make about 15% of jobs fraudulent
    const isFraudulent = Math.random() < 0.15;
    const title = isFraudulent 
      ? fraudulentTitles[Math.floor(Math.random() * fraudulentTitles.length)]
      : legitimateTitles[Math.floor(Math.random() * legitimateTitles.length)];
    
    const company = isFraudulent
      ? companies.slice(4, 12)[Math.floor(Math.random() * 8)] // Suspicious companies
      : companies[Math.floor(Math.random() * companies.length)];
    
    const riskScore = isFraudulent 
      ? 0.6 + Math.random() * 0.35 // High risk for fraudulent jobs
      : Math.random() * 0.4; // Low risk for legitimate jobs
    
    return {
      id: i + 1,
      title,
      company,
      location: locations[Math.floor(Math.random() * locations.length)],
      risk_score: riskScore,
      posted_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      salary: isFraudulent 
        ? `Up to $${Math.floor(Math.random() * 200 + 100)},000` 
        : `$${Math.floor(Math.random() * 60 + 50)},000 - $${Math.floor(Math.random() * 50 + 80)},000`
    };
  });
}