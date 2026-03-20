export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
  technologies: string[];
  impact?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  repository?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  stars?: number;
  forks?: number;
  language?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Infrastructure"
  | "Tools";

export type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Learning";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  url?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email?: string;
  avatar: string;
  resume: string;
}
