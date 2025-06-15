import Papa from 'papaparse';

export interface JobData {
  title?: string;
  description?: string;
  company_profile?: string;
  salary_range?: string;
  requirements?: string;
  benefits?: string;
  telecommuting?: boolean;
  has_company_logo?: boolean;
  has_questions?: boolean;
  employment_type?: string;
  required_experience?: string;
  required_education?: string;
  industry?: string;
  function?: string;
  location?: string;
  department?: string;
  job_id?: string;
  fraudulent?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_COLUMNS = [
  'salary_range',
  'company_profile',
  'description',
  'requirements',
  'benefits',
  'telecommuting',
  'has_company_logo',
  'has_questions',
  'employment_type',
  'required_experience',
  'required_education',
  'industry',
  'function'
];

export function parseCSV(file: File): Promise<JobData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().trim(),
      transform: (value, header) => {
        // Handle boolean columns
        if (['telecommuting', 'has_company_logo', 'has_questions', 'fraudulent'].includes(header)) {
          return value.toLowerCase() === 'true' || value === '1';
        }
        return value.trim();
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
        } else {
          resolve(results.data as JobData[]);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

export function validateJobData(data: JobData[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (data.length === 0) {
    errors.push('CSV file is empty');
    return { isValid: false, errors, warnings };
  }

  // Check for required columns
  const firstRow = data[0];
  const presentColumns = Object.keys(firstRow);
  const missingColumns = REQUIRED_COLUMNS.filter(col => !presentColumns.includes(col));

  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Check data quality
  let emptyDescriptions = 0;
  let missingSalaries = 0;
  let invalidEmploymentTypes = 0;

  const validEmploymentTypes = ['full-time', 'part-time', 'contract', 'temporary', 'internship', 'other'];

  data.forEach((row, index) => {
    if (!row.description || row.description.length < 10) {
      emptyDescriptions++;
    }
    
    if (!row.salary_range || row.salary_range.length < 3) {
      missingSalaries++;
    }
    
    if (row.employment_type && !validEmploymentTypes.includes(row.employment_type.toLowerCase())) {
      invalidEmploymentTypes++;
    }
  });

  if (emptyDescriptions > data.length * 0.1) {
    warnings.push(`${emptyDescriptions} rows have very short or missing descriptions`);
  }

  if (missingSalaries > data.length * 0.2) {
    warnings.push(`${missingSalaries} rows have missing salary information`);
  }

  if (invalidEmploymentTypes > 0) {
    warnings.push(`${invalidEmploymentTypes} rows have invalid employment types`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function cleanJobData(data: JobData[]): JobData[] {
  return data.map(job => ({
    ...job,
    description: job.description?.trim() || '',
    company_profile: job.company_profile?.trim() || '',
    requirements: job.requirements?.trim() || '',
    benefits: job.benefits?.trim() || '',
    salary_range: job.salary_range?.trim() || '',
    industry: job.industry?.trim() || '',
    function: job.function?.trim() || '',
    employment_type: job.employment_type?.toLowerCase().trim() || 'full-time'
  }));
}