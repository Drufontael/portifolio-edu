import { Repository, GitHubUserProfile } from '../types';
import { FEATURED_PROJECTS } from '../data/portfolioData';

const GITHUB_USERNAME = 'Drufontael';
const CACHE_KEY = `github_repos_${GITHUB_USERNAME}_v3`;
const CACHE_PROFILE_KEY = `github_profile_${GITHUB_USERNAME}_v3`;
const CACHE_TIME_KEY = `github_cache_time_${GITHUB_USERNAME}_v3`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Clean up any legacy cache entries
try {
  localStorage.removeItem(`github_repos_${GITHUB_USERNAME}`);
  localStorage.removeItem(`github_repos_${GITHUB_USERNAME}_v2`);
  localStorage.removeItem(`github_profile_${GITHUB_USERNAME}`);
} catch {
  // safe ignore in environments where localStorage might be restricted
}

export async function fetchGitHubProfile(): Promise<GitHubUserProfile | null> {
  try {
    const cached = localStorage.getItem(CACHE_PROFILE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data: GitHubUserProfile = await response.json();
    localStorage.setItem(CACHE_PROFILE_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.warn('Could not fetch live GitHub profile, using default:', error);
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

export async function fetchGitHubRepositories(): Promise<Repository[]> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
    if (!response.ok) {
      throw new Error(`GitHub repos error: ${response.status}`);
    }
    const apiRepos: any[] = await response.json();

    // Map and enrich with our detailed architectural knowledge
    const enrichedRepos: Repository[] = apiRepos
      .filter((repo) => !repo.fork && repo.name.toLowerCase() !== 'mykytadu') // prioritize original works and exclude non-existent 'mykytadu'
      .map((apiRepo) => {
        // Check if we have curated highlights for this repository - EXACT MATCH ONLY to avoid cross-pollination between app and api
        const existingCurated = FEATURED_PROJECTS.find(
          (p) => p.name.toLowerCase() === apiRepo.name.toLowerCase()
        );

        return {
          id: apiRepo.id,
          name: apiRepo.name,
          full_name: apiRepo.full_name,
          html_url: apiRepo.html_url,
          description: apiRepo.description || existingCurated?.description || 'Repositório de desenvolvimento de software e soluções backend.',
          language: apiRepo.language || existingCurated?.language || 'Java',
          stargazers_count: apiRepo.stargazers_count,
          forks_count: apiRepo.forks_count,
          open_issues_count: apiRepo.open_issues_count,
          updated_at: apiRepo.updated_at,
          topics: apiRepo.topics && apiRepo.topics.length > 0 ? apiRepo.topics : existingCurated?.topics || [],
          homepage: apiRepo.homepage || null,
          default_branch: apiRepo.default_branch || 'main',
          is_featured: existingCurated ? existingCurated.is_featured : false,
          architecture: existingCurated?.architecture || (apiRepo.language === 'Java' ? 'Spring Boot RESTful' : 'Clean Architecture'),
          highlights: existingCurated?.highlights,
          commits_count: existingCurated?.commits_count,
        };
      });

    // Merge any featured projects that might not have appeared or need priority order
    FEATURED_PROJECTS.forEach((featured) => {
      if (featured.name.toLowerCase() === 'mykytadu') return;
      const alreadyIncluded = enrichedRepos.some((r) => r.name.toLowerCase() === featured.name.toLowerCase());
      if (!alreadyIncluded) {
        enrichedRepos.unshift(featured);
      }
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(enrichedRepos));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return enrichedRepos;
  } catch (error) {
    console.warn('Using curated repository list due to GitHub API rate-limit/network:', error);
    return FEATURED_PROJECTS.filter((p) => p.name.toLowerCase() !== 'mykytadu');
  }
}

export const getRepositories = fetchGitHubRepositories;

export async function refreshRepositories(): Promise<Repository[]> {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIME_KEY);
  return fetchGitHubRepositories();
}

