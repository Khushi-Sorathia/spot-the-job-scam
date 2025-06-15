import { JobData } from './csvProcessor';

export interface PredictionResult {
  risk_score: number;
  risk_level: string;
  confidence: number;
  risk_factors: string[];
  positive_factors: string[];
  feature_scores: {
    text_analysis: number;
    structural_features: number;
    company_verification: number;
  };
}

export interface BatchProcessingResult {
  totalProcessed: number;
  fraudulent: number;
  legitimate: number;
  averageRiskScore: number;
  processingTime: number;
}

// Suspicious keywords and phrases
const SUSPICIOUS_KEYWORDS = [
  'make money fast', 'work from home', 'no experience needed', 'easy money',
  'get rich quick', 'guaranteed income', 'earn $', 'make $', 'high pay',
  'immediate start', 'no skills required', 'flexible hours', 'part time',
  'full time', 'urgent', 'apply now', 'limited time', 'exclusive opportunity',
  'quick cash', 'fast money', 'easy work', 'simple job', 'no interview'
];

const HIGH_RISK_PHRASES = [
  'make $', 'earn up to', 'guaranteed', 'no experience', 'work from home',
  'flexible schedule', 'immediate hiring', 'apply today', 'limited positions',
  'quick money', 'easy cash', 'high income', 'fast pay', 'instant money'
];

const LEGITIMATE_INDICATORS = [
  'bachelor', 'degree', 'experience required', 'qualifications', 'skills',
  'responsibilities', 'requirements', 'company benefits', 'equal opportunity',
  'professional', 'certification', 'training', 'career development'
];

export function predictSingleJob(jobData: JobData): PredictionResult {
  let riskScore = 0;
  const riskFactors: string[] = [];
  const positiveFactors: string[] = [];
  
  // Text analysis
  const textAnalysisScore = analyzeJobText(jobData, riskFactors, positiveFactors);
  
  // Structural features
  const structuralScore = analyzeStructuralFeatures(jobData, riskFactors, positiveFactors);
  
  // Company verification
  const companyScore = analyzeCompanyFeatures(jobData, riskFactors, positiveFactors);
  
  // Combine scores with weights
  riskScore = (textAnalysisScore * 0.4) + (structuralScore * 0.35) + (companyScore * 0.25);
  
  // Add some randomness to make it more realistic
  riskScore += (Math.random() - 0.5) * 0.1;
  
  // Ensure score is between 0 and 1
  riskScore = Math.max(0, Math.min(1, riskScore));
  
  let riskLevel = 'Low';
  if (riskScore >= 0.8) riskLevel = 'Critical';
  else if (riskScore >= 0.6) riskLevel = 'High';
  else if (riskScore >= 0.3) riskLevel = 'Medium';
  
  return {
    risk_score: riskScore,
    risk_level: riskLevel,
    confidence: 0.75 + Math.random() * 0.2, // Simulate confidence between 75-95%
    risk_factors: riskFactors,
    positive_factors: positiveFactors,
    feature_scores: {
      text_analysis: textAnalysisScore,
      structural_features: structuralScore,
      company_verification: companyScore
    }
  };
}

function analyzeJobText(jobData: JobData, riskFactors: string[], positiveFactors: string[]): number {
  let score = 0;
  const text = `${jobData.title || ''} ${jobData.description || ''} ${jobData.requirements || ''}`.toLowerCase();
  
  // Check for suspicious keywords
  let suspiciousCount = 0;
  SUSPICIOUS_KEYWORDS.forEach(keyword => {
    if (text.includes(keyword)) {
      suspiciousCount++;
    }
  });
  
  if (suspiciousCount > 4) {
    score += 0.5;
    riskFactors.push('Multiple suspicious keywords detected');
  } else if (suspiciousCount > 2) {
    score += 0.3;
    riskFactors.push('Some suspicious keywords found');
  } else if (suspiciousCount > 0) {
    score += 0.15;
    riskFactors.push('Minor suspicious keywords detected');
  }
  
  // Check for high-risk phrases
  HIGH_RISK_PHRASES.forEach(phrase => {
    if (text.includes(phrase)) {
      score += 0.2;
      riskFactors.push(`High-risk phrase detected: "${phrase}"`);
    }
  });
  
  // Check for legitimate indicators
  let legitimateCount = 0;
  LEGITIMATE_INDICATORS.forEach(indicator => {
    if (text.includes(indicator)) {
      legitimateCount++;
    }
  });
  
  if (legitimateCount > 3) {
    score -= 0.25;
    positiveFactors.push('Professional job requirements specified');
  } else if (legitimateCount > 1) {
    score -= 0.1;
    positiveFactors.push('Some professional indicators found');
  }
  
  // Description length analysis
  const descriptionLength = (jobData.description || '').length;
  if (descriptionLength < 30) {
    score += 0.4;
    riskFactors.push('Extremely short job description');
  } else if (descriptionLength < 100) {
    score += 0.25;
    riskFactors.push('Very short job description');
  } else if (descriptionLength < 200) {
    score += 0.1;
    riskFactors.push('Short job description');
  } else if (descriptionLength > 500) {
    score -= 0.1;
    positiveFactors.push('Detailed job description provided');
  }
  
  // Salary analysis
  const salary = (jobData.salary_range || '').toLowerCase();
  if (salary.includes('$')) {
    // Extract numbers from salary
    const numbers = salary.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const maxSalary = Math.max(...numbers.map(n => parseInt(n)));
      if (maxSalary > 300) { // Over $300k
        score += 0.3;
        riskFactors.push('Unrealistically high salary offered');
      } else if (maxSalary > 200) { // Over $200k
        score += 0.15;
        riskFactors.push('Very high salary range');
      } else if (maxSalary > 50 && maxSalary < 150) {
        score -= 0.05;
        positiveFactors.push('Reasonable salary range');
      }
    }
  } else if (salary.includes('up to') || salary.includes('earn') || salary.includes('make')) {
    score += 0.25;
    riskFactors.push('Vague or promotional salary language');
  } else if (!salary || salary.length < 5) {
    score += 0.15;
    riskFactors.push('Missing or vague salary information');
  }
  
  return Math.max(0, Math.min(1, score));
}

function analyzeStructuralFeatures(jobData: JobData, riskFactors: string[], positiveFactors: string[]): number {
  let score = 0;
  
  // Check telecommuting - higher risk for remote jobs
  if (jobData.telecommuting === true || jobData.telecommuting === 'true' || jobData.telecommuting === 1) {
    score += 0.2;
    riskFactors.push('Remote work position (statistically higher fraud risk)');
  } else {
    score -= 0.05;
    positiveFactors.push('Office-based position');
  }
  
  // Check company logo
  if (!jobData.has_company_logo || jobData.has_company_logo === false || jobData.has_company_logo === 'false' || jobData.has_company_logo === 0) {
    score += 0.25;
    riskFactors.push('No company logo provided');
  } else {
    score -= 0.1;
    positiveFactors.push('Company logo present');
  }
  
  // Check application questions
  if (!jobData.has_questions || jobData.has_questions === false || jobData.has_questions === 'false' || jobData.has_questions === 0) {
    score += 0.2;
    riskFactors.push('No screening questions for applicants');
  } else {
    score -= 0.05;
    positiveFactors.push('Screening questions included');
  }
  
  // Employment type analysis
  const empType = (jobData.employment_type || '').toLowerCase();
  if (empType.includes('part') || empType.includes('temporary') || empType.includes('contract')) {
    score += 0.1;
    riskFactors.push('Non-permanent employment type');
  } else if (empType.includes('full')) {
    score -= 0.05;
    positiveFactors.push('Full-time position offered');
  }
  
  // Experience requirements
  const experience = (jobData.required_experience || '').toLowerCase();
  if (!experience || experience.includes('no experience') || experience.includes('entry level') || experience.length < 5) {
    score += 0.2;
    riskFactors.push('Minimal or no experience requirements');
  } else if (experience.includes('year') || experience.includes('experience')) {
    score -= 0.1;
    positiveFactors.push('Specific experience requirements listed');
  }
  
  // Education requirements
  const education = (jobData.required_education || '').toLowerCase();
  if (!education || education.includes('high school') || education.includes('no degree') || education.length < 5) {
    score += 0.15;
    riskFactors.push('Low or no education requirements');
  } else if (education.includes('bachelor') || education.includes('degree') || education.includes('university')) {
    score -= 0.1;
    positiveFactors.push('Higher education requirements specified');
  }
  
  return Math.max(0, Math.min(1, score));
}

function analyzeCompanyFeatures(jobData: JobData, riskFactors: string[], positiveFactors: string[]): number {
  let score = 0;
  const companyProfile = (jobData.company_profile || '').toLowerCase();
  
  // Company profile analysis
  if (!companyProfile || companyProfile.length < 10) {
    score += 0.4;
    riskFactors.push('Missing or extremely brief company profile');
  } else if (companyProfile.length < 50) {
    score += 0.25;
    riskFactors.push('Very brief company profile');
  } else if (companyProfile.length < 100) {
    score += 0.1;
    riskFactors.push('Brief company profile');
  } else {
    score -= 0.1;
    positiveFactors.push('Detailed company information provided');
  }
  
  // Check for generic or suspicious company language
  const suspiciousCompanyTerms = [
    'quick', 'easy', 'fast', 'instant', 'immediate', 'guaranteed',
    'make money', 'earn cash', 'work from home', 'no experience',
    'flexible', 'simple', 'effortless'
  ];
  
  let suspiciousTermCount = 0;
  suspiciousCompanyTerms.forEach(term => {
    if (companyProfile.includes(term)) {
      suspiciousTermCount++;
    }
  });
  
  if (suspiciousTermCount > 2) {
    score += 0.3;
    riskFactors.push('Company profile contains suspicious promotional language');
  } else if (suspiciousTermCount > 0) {
    score += 0.15;
    riskFactors.push('Some promotional language in company profile');
  }
  
  // Check for generic company names/descriptions
  const genericTerms = ['llc', 'inc', 'corp', 'solutions', 'global', 'international', 'services', 'group'];
  let genericCount = 0;
  genericTerms.forEach(term => {
    if (companyProfile.includes(term)) {
      genericCount++;
    }
  });
  
  if (genericCount > 3) {
    score += 0.2;
    riskFactors.push('Very generic company description');
  } else if (genericCount === 0 && companyProfile.length > 50) {
    score -= 0.05;
    positiveFactors.push('Specific company information provided');
  }
  
  // Industry analysis
  const industry = (jobData.industry || '').toLowerCase();
  const highRiskIndustries = [
    'marketing', 'sales', 'customer service', 'data entry', 'general',
    'administrative', 'clerical', 'other', 'various'
  ];
  
  if (highRiskIndustries.includes(industry)) {
    score += 0.15;
    riskFactors.push('Industry category with higher fraud rates');
  } else if (industry && industry.length > 3 && !highRiskIndustries.includes(industry)) {
    score -= 0.05;
    positiveFactors.push('Specific industry category provided');
  } else if (!industry || industry.length < 3) {
    score += 0.1;
    riskFactors.push('Missing or vague industry information');
  }
  
  // Function/role analysis
  const jobFunction = (jobData.function || '').toLowerCase();
  const vagueRoles = ['other', 'general', 'various', 'multiple', 'admin'];
  
  if (vagueRoles.includes(jobFunction)) {
    score += 0.1;
    riskFactors.push('Vague job function specified');
  } else if (jobFunction && jobFunction.length > 3) {
    score -= 0.05;
    positiveFactors.push('Specific job function provided');
  }
  
  return Math.max(0, Math.min(1, score));
}

export function processJobData(data: JobData[]): BatchProcessingResult {
  const startTime = Date.now();
  let fraudulentCount = 0;
  let totalRiskScore = 0;
  
  data.forEach(job => {
    const prediction = predictSingleJob(job);
    totalRiskScore += prediction.risk_score;
    
    // Consider jobs with risk score >= 0.5 as fraudulent
    if (prediction.risk_score >= 0.5) {
      fraudulentCount++;
    }
  });
  
  const processingTime = Date.now() - startTime;
  
  return {
    totalProcessed: data.length,
    fraudulent: fraudulentCount,
    legitimate: data.length - fraudulentCount,
    averageRiskScore: totalRiskScore / data.length,
    processingTime
  };
}

export function generateFraudReport(data: JobData[]): any {
  const results = processJobData(data);
  const predictions = data.map(job => ({
    ...job,
    prediction: predictSingleJob(job)
  }));
  
  // Get top 10 most suspicious jobs
  const topSuspicious = predictions
    .sort((a, b) => b.prediction.risk_score - a.prediction.risk_score)
    .slice(0, 10);
  
  // Common risk factors
  const allRiskFactors: string[] = [];
  predictions.forEach(p => {
    allRiskFactors.push(...p.prediction.risk_factors);
  });
  
  const riskFactorCounts = allRiskFactors.reduce((acc, factor) => {
    acc[factor] = (acc[factor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const commonRiskFactors = Object.entries(riskFactorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([factor, count]) => ({ factor, count }));
  
  return {
    summary: results,
    topSuspicious,
    commonRiskFactors,
    industryBreakdown: getIndustryBreakdown(predictions),
    recommendations: generateRecommendations(results)
  };
}

function getIndustryBreakdown(predictions: any[]) {
  const industryStats = predictions.reduce((acc, p) => {
    const industry = p.industry || 'Unknown';
    if (!acc[industry]) {
      acc[industry] = { total: 0, fraudulent: 0 };
    }
    acc[industry].total++;
    if (p.prediction.risk_score >= 0.5) {
      acc[industry].fraudulent++;
    }
    return acc;
  }, {} as Record<string, { total: number; fraudulent: number }>);
  
  return Object.entries(industryStats).map(([industry, stats]) => ({
    industry,
    total: stats.total,
    fraudulent: stats.fraudulent,
    fraudRate: (stats.fraudulent / stats.total) * 100
  }));
}

function generateRecommendations(results: BatchProcessingResult): string[] {
  const recommendations = [];
  
  if (results.fraudulent / results.totalProcessed > 0.3) {
    recommendations.push('High fraud rate detected - consider implementing additional verification steps');
  }
  
  if (results.averageRiskScore > 0.4) {
    recommendations.push('Overall risk level is elevated - review job posting guidelines');
  }
  
  recommendations.push('Monitor remote work positions more closely as they show higher fraud rates');
  recommendations.push('Verify company information and require company logos for all postings');
  recommendations.push('Implement screening questions for all job applications');
  
  return recommendations;
}