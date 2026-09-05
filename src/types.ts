export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
  default_branch?: string;
  is_featured?: boolean;
  architecture?: string;
  highlights?: string[];
  commits_count?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: 'Arquitetura' | 'Carreira' | 'Kotlin' | 'Testes' | 'DevOps';
  tags: string[];
  content: string[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  badge?: string;
  description: string;
  bullets: string[];
  techStack: string[];
  transferableHighlight?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface GitHubUserProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  created_at: string;
}
