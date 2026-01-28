
export interface ResumeAnalysis {
  score: number;
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
  skills: string[];
  domain: string;
}

export interface SkillGapAnalysis {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  prioritizedMissingSkills: { 
    skill: string; 
    priority: 'High' | 'Medium' | 'Low';
    suggestions?: { type: 'course' | 'project'; title: string; provider?: string }[];
  }[];
}

export interface RoadmapStep {
  week: number;
  title: string;
  topics: string[];
  practiceIdeas: string[];
  resources: { name: string; url: string }[];
}

export interface VoiceAnalysis {
  confidenceScore: number;
  fillerWordCount: number;
  speakingSpeed: string;
  hesitationNotes: string;
  tips: string[];
}

export interface InterviewPrep {
  role: string;
  questions: { question: string; focus: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  domain: string;
  type: string;
  location: string;
  duration: string;
  skillsRequired: string[];
  matchScore: number;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  salary: string;
  location: string;
  status: string;
  skillsRequired: string[];
  matchScore: number;
}

export interface ShortlistedCandidate {
  id: string;
  name: string;
  score: number;
  reasoning: string;
  technicalMatch: string[];
  softSkillAnalysis: string;
  requirementGaps: string[];
}

export interface ShortlistResponse {
  candidates: ShortlistedCandidate[];
  summary: string;
}

export interface CandidateData {
  id: string;
  name: string;
  resumeText: string;
  verifiedSkills: string[];
}

export type UserRole = 'student' | 'recruiter' | null;

export type View = 
  | 'home' 
  | 'login' 
  | 'role-selection' 
  | 'dashboard' 
  | 'resume' 
  | 'skillgap' 
  | 'roadmap' 
  | 'jobs' 
  | 'recruiter' 
  | 'about'
  | 'voice-analyzer'
  | 'interview-prep'
  | 'skill-sync'
  | 'recruiter-heatmap'
  | 'auto-shortlist';
