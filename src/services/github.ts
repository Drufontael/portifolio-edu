import { Repository, GitHubUserProfile } from '../types';
import { CURATED_PROJECTS } from '../data/portfolioData';

const GITHUB_USERNAME = 'Drufontael';
const CACHE_KEY = `github_repos_${GITHUB_USERNAME}_v4`;
const CACHE_PROFILE_KEY = `github_profile_${GITHUB_USERNAME}_v4`;
const CACHE_TIME_KEY = `github_cache_time_${GITHUB_USERNAME}_v4`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export interface GitHubEnrichmentOptions {
  timeoutMs?: number;
  fetchFn?: typeof fetch;
  username?: string;
  bypassCache?: boolean;
}

export type EnrichmentStatus = 'success' | 'cached' | 'timeout' | 'rate_limit' | 'network_error' | 'http_error';

export interface EnrichmentDetailedResult {
  projects: Repository[];
  status: EnrichmentStatus;
  httpStatus?: number;
  errorMessage?: string;
}

/**
 * Enriches curated projects with non-essential dynamic metrics from GitHub
 * (stars, forks, updated_at). Local curated fields (problem solved,
 * Eduardo's contribution, technical decision, technologies, status, etc.)
 * are ALWAYS preserved.
 *
 * Never throws and never returns an empty list on API failures.
 */
export async function enrichProjectsWithGitHubDetailed(
  curatedProjects: Repository[] = CURATED_PROJECTS,
  options?: GitHubEnrichmentOptions
): Promise<EnrichmentDetailedResult> {
  const username = options?.username || GITHUB_USERNAME;
  const timeoutMs = options?.timeoutMs ?? 5000;
  const fetchImpl = options?.fetchFn || (typeof window !== 'undefined' ? window.fetch.bind(window) : fetch);

  // Check cache unless bypassed
  if (!options?.bypassCache && typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
        const cachedMetrics: Array<{ name: string; stargazers_count: number; forks_count: number; updated_at: string }> = JSON.parse(cached);
        const merged = curatedProjects.map((project) => {
          const metric = cachedMetrics.find((m) => m.name.toLowerCase() === project.name.toLowerCase());
          if (!metric) return { ...project };
          return {
            ...project,
            stargazers_count: metric.stargazers_count ?? project.stargazers_count,
            forks_count: metric.forks_count ?? project.forks_count,
            updated_at: metric.updated_at || project.updated_at,
          };
        });
        return {
          projects: merged,
          status: 'cached',
        };
      }
    } catch {
      // Safe fallback on localStorage errors
    }
  }

  // Set up abort controller for timeout handling
  const controller = new AbortController();
  let timer: any = null;
  if (timeoutMs > 0) {
    timer = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
  }

  try {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`;
    const response = await fetchImpl(url, { signal: controller.signal });

    if (timer) clearTimeout(timer);

    // Handle Rate Limit specifically
    if (response.status === 403 || response.status === 429) {
      return {
        projects: curatedProjects.map((p) => ({ ...p })),
        status: 'rate_limit',
        httpStatus: response.status,
        errorMessage: `Rate limit hit (${response.status})`,
      };
    }

    // Handle other non-200 responses
    if (!response.ok) {
      return {
        projects: curatedProjects.map((p) => ({ ...p })),
        status: 'http_error',
        httpStatus: response.status,
        errorMessage: `GitHub returned status ${response.status}`,
      };
    }

    const apiRepos: any[] = await response.json();

    // Enrich only non-essential metrics, preserving 100% of curated content
    const metricsToCache: Array<{ name: string; stargazers_count: number; forks_count: number; updated_at: string }> = [];
    const enrichedProjects: Repository[] = curatedProjects.map((project) => {
      const match = Array.isArray(apiRepos)
        ? apiRepos.find((r) => r.name && r.name.toLowerCase() === project.name.toLowerCase())
        : undefined;

      if (!match) {
        return { ...project };
      }

      const updatedStargazers = typeof match.stargazers_count === 'number' ? match.stargazers_count : project.stargazers_count;
      const updatedForks = typeof match.forks_count === 'number' ? match.forks_count : project.forks_count;
      const updatedDate = match.updated_at || project.updated_at;

      metricsToCache.push({
        name: project.name,
        stargazers_count: updatedStargazers,
        forks_count: updatedForks,
        updated_at: updatedDate,
      });

      return {
        ...project,
        stargazers_count: updatedStargazers,
        forks_count: updatedForks,
        updated_at: updatedDate,
      };
    });

    if (typeof localStorage !== 'undefined' && metricsToCache.length > 0) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(metricsToCache));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch {
        // Safe ignore
      }
    }

    return {
      projects: enrichedProjects,
      status: 'success',
    };
  } catch (error: any) {
    if (timer) clearTimeout(timer);

    const isAbort = error?.name === 'AbortError' || controller.signal.aborted;
    return {
      projects: curatedProjects.map((p) => ({ ...p })),
      status: isAbort ? 'timeout' : 'network_error',
      errorMessage: error?.message || 'Network/timeout failure',
    };
  }
}

/**
 * Standard enrichment helper returning Repository[] directly.
 * Always resolves to a complete project list, never throws.
 */
export async function enrichProjectsWithGitHub(
  curatedProjects: Repository[] = CURATED_PROJECTS,
  options?: GitHubEnrichmentOptions
): Promise<Repository[]> {
  const result = await enrichProjectsWithGitHubDetailed(curatedProjects, options);
  return result.projects;
}

export const getRepositories = enrichProjectsWithGitHub;
export const fetchGitHubRepositories = enrichProjectsWithGitHub;

export async function refreshRepositories(): Promise<Repository[]> {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIME_KEY);
    } catch {
      // Safe ignore
    }
  }
  return enrichProjectsWithGitHub(CURATED_PROJECTS, { bypassCache: true });
}

export async function fetchGitHubProfile(): Promise<GitHubUserProfile | null> {
  try {
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(CACHE_PROFILE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
        return JSON.parse(cached);
      }
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data: GitHubUserProfile = await response.json();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CACHE_PROFILE_KEY, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return {
      login: 'Drufontael',
      avatar_url: 'https://avatars.githubusercontent.com/u/Drufontael',
      html_url: 'https://github.com/Drufontael',
      name: 'Eduardo Estigarribia Oliveira',
      bio: 'Desenvolvedor Backend Java | Spring Boot | PostgreSQL | Docker | Kotlin Multiplatform',
      public_repos: 12,
      followers: 8,
      following: 15,
      location: 'Goiânia, GO - Brasil',
      created_at: '2023-01-01T00:00:00Z',
    };
  }
}


