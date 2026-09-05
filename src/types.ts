export type ProjectStatusType = 'completed' | 'functional' | 'in_development';

export interface ProjectStatus {
  label: string;
  type: ProjectStatusType;
  stageDescription?: string;
}

export interface Repository {
  id: number;
  name: string;
  displayName?: string;
  full_name: string;
  html_url: string;
  codeUrl?: string;
  demoUrl?: string | null;
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

  // Campos obrigatórios de apresentação de projeto
  problemSolved?: string;
  eduardoContribution?: string;
  mainTechnicalDecision?: string;
  technologies?: string[];
  status?: ProjectStatus;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date?: string;
  publishedAt?: string;
  readTime: string;
  category: 'Arquitetura' | 'Carreira' | 'Kotlin' | 'Testes' | 'DevOps' | string;
  tags: string[];
  content: string[];
  status: 'published' | 'draft';
  author?: BlogAuthor;
  seo?: BlogSeo;
  externalUrl?: string;
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

export interface TechnologyCompetency {
  name: string;
  usageContext: string;
  appliedProject: string;
  repoUrl?: string | null;
  secondaryRepoUrl?: string | null;
  secondaryProject?: string | null;
  categoryTag?: string;
}

export interface CompetencyGroup {
  id: 'foco-principal' | 'experiencia-pratica' | 'conhecimento-complementar';
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  technologies: TechnologyCompetency[];
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
