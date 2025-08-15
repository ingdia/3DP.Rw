// lib/dummy-data.ts

export interface Capability {
  id: string;
  name: string;
  weighting: number;
}

export interface Question {
  id: string;
  text: string;
  capabilityId: string;
  capabilityName: string; // For display purposes
}

export interface CompanyResult {
  id: string;
  companyName: string;
  score: number;
  maturityLevel: 'Nascent' | 'Developing' | 'Mature' | 'Advanced';
  assessmentDate: string;
}

export const dummyCapabilities: Capability[] = [
  { id: 'cap1', name: 'Technology', weighting: 40 },
  { id: 'cap2', name: 'Process', weighting: 35 },
  { id: 'cap3', name: 'People', weighting: 25 },
];

export const dummyQuestions: Question[] = [
  { id: 'q1', text: 'How automated are your data collection processes?', capabilityId: 'cap1', capabilityName: 'Technology' },
  { id: 'q2', text: 'Is there a defined data governance framework in place?', capabilityId: 'cap2', capabilityName: 'Process' },
  { id: 'q3', text: 'Are employees trained on data literacy?', capabilityId: 'cap3', capabilityName: 'People' },
  { id: 'q4', text: 'Do you use modern data warehousing solutions?', capabilityId: 'cap1', capabilityName: 'Technology' },
];

export const dummyResults: CompanyResult[] = [
  { id: 'res1', companyName: 'DataCorp', score: 85, maturityLevel: 'Advanced', assessmentDate: '2025-07-20' },
  { id: 'res2', companyName: 'InfoSolutions', score: 65, maturityLevel: 'Mature', assessmentDate: '2025-07-18' },
  { id: 'res3', companyName: 'Analytics LLC', score: 45, maturityLevel: 'Developing', assessmentDate: '2025-07-15' },
];