import { describe, it, expect, vi, beforeEach } from 'vitest';
import { enrichProjectsWithGitHub, enrichProjectsWithGitHubDetailed } from './github';
import { CURATED_PROJECTS } from '../data/portfolioData';
import { Repository } from '../types';

describe('GitHub Enrichment Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  // 1. SUCESSO
  it('deve enriquecer dados não essenciais com sucesso mantendo os dados curados intactos', async () => {
    const mockApiResponse = [
      {
        name: 'our-recipes',
        stargazers_count: 15,
        forks_count: 5,
        updated_at: '2025-06-01T12:00:00Z',
      },
      {
        name: 'carshop',
        stargazers_count: 8,
        forks_count: 2,
        updated_at: '2025-06-02T15:30:00Z',
      },
    ];

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    } as Response);

    const detailed = await enrichProjectsWithGitHubDetailed(CURATED_PROJECTS, {
      fetchFn: mockFetch,
      bypassCache: true,
    });

    expect(detailed.status).toBe('success');
    expect(detailed.projects.length).toBe(CURATED_PROJECTS.length);

    // Verifica que métricas dinâmicas foram enriquecidas
    const ourRecipes = detailed.projects.find((p) => p.name === 'our-recipes');
    expect(ourRecipes).toBeDefined();
    expect(ourRecipes?.stargazers_count).toBe(15);
    expect(ourRecipes?.forks_count).toBe(5);
    expect(ourRecipes?.updated_at).toBe('2025-06-01T12:00:00Z');

    // Verifica que dados curados foram mantidos rigorosamente intactos
    expect(ourRecipes?.problemSolved).toBe(CURATED_PROJECTS.find((p) => p.name === 'our-recipes')?.problemSolved);
    expect(ourRecipes?.eduardoContribution).toBe(CURATED_PROJECTS.find((p) => p.name === 'our-recipes')?.eduardoContribution);
    expect(ourRecipes?.mainTechnicalDecision).toBe(CURATED_PROJECTS.find((p) => p.name === 'our-recipes')?.mainTechnicalDecision);
    expect(ourRecipes?.technologies).toEqual(CURATED_PROJECTS.find((p) => p.name === 'our-recipes')?.technologies);
    expect(ourRecipes?.status?.label).toBe('Funcional (v1.0)');
    expect(ourRecipes?.codeUrl).toBe('https://github.com/Drufontael/our-recipes');

    // Verifica MykytaDu API em desenvolvimento preservada
    const mykytaduApi = detailed.projects.find((p) => p.name === 'mykytadu-api');
    expect(mykytaduApi?.status?.type).toBe('in_development');
  });

  // 2. TIMEOUT
  it('deve lidar com timeout graciosamente sem lançar erro e preservando os cards locais', async () => {
    const mockFetch = vi.fn().mockImplementation((_url, options) => {
      return new Promise((_resolve, reject) => {
        if (options?.signal) {
          options.signal.addEventListener('abort', () => {
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';
            reject(abortError);
          });
        }
      });
    });

    const detailed = await enrichProjectsWithGitHubDetailed(CURATED_PROJECTS, {
      fetchFn: mockFetch,
      timeoutMs: 30,
      bypassCache: true,
    });

    expect(detailed.status).toBe('timeout');
    expect(detailed.projects.length).toBe(CURATED_PROJECTS.length);

    // Nunca substitui por lista vazia
    expect(detailed.projects.length).toBeGreaterThan(0);
    expect(detailed.projects[0].name).toBe(CURATED_PROJECTS[0].name);

    // Testa a função padrão que retorna apenas o array
    const projects = await enrichProjectsWithGitHub(CURATED_PROJECTS, {
      fetchFn: mockFetch,
      timeoutMs: 30,
      bypassCache: true,
    });
    expect(projects.length).toBe(CURATED_PROJECTS.length);
  });

  // 3. RATE LIMIT
  it('deve lidar com rate limit (403 / 429) mantendo os cards locais intactos e sem exibir erro ao visitante', async () => {
    const mockFetch403 = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden (Rate Limit Exceeded)',
      json: async () => ({ message: 'API rate limit exceeded' }),
    } as Response);

    const detailed403 = await enrichProjectsWithGitHubDetailed(CURATED_PROJECTS, {
      fetchFn: mockFetch403,
      bypassCache: true,
    });

    expect(detailed403.status).toBe('rate_limit');
    expect(detailed403.httpStatus).toBe(403);
    expect(detailed403.projects.length).toBe(CURATED_PROJECTS.length);
    expect(detailed403.projects[0].name).toBe(CURATED_PROJECTS[0].name);

    // Teste com 429 Too Many Requests
    const mockFetch429 = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
      json: async () => ({ message: 'Too Many Requests' }),
    } as Response);

    const detailed429 = await enrichProjectsWithGitHubDetailed(CURATED_PROJECTS, {
      fetchFn: mockFetch429,
      bypassCache: true,
    });

    expect(detailed429.status).toBe('rate_limit');
    expect(detailed429.httpStatus).toBe(429);
    expect(detailed429.projects.length).toBe(CURATED_PROJECTS.length);
  });

  // 4. FALHA DE REDE
  it('deve lidar com falha de rede sem quebrar a aplicação e mantendo integralmente a lista local', async () => {
    const mockNetworkFailure = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    const detailed = await enrichProjectsWithGitHubDetailed(CURATED_PROJECTS, {
      fetchFn: mockNetworkFailure,
      bypassCache: true,
    });

    expect(detailed.status).toBe('network_error');
    expect(detailed.projects.length).toBe(CURATED_PROJECTS.length);
    expect(detailed.projects[0].name).toBe(CURATED_PROJECTS[0].name);

    // Chamada padrão nunca lança exceção
    const result = await enrichProjectsWithGitHub(CURATED_PROJECTS, {
      fetchFn: mockNetworkFailure,
      bypassCache: true,
    });

    expect(result).toBeDefined();
    expect(result.length).toBe(CURATED_PROJECTS.length);
    expect(result.every((p: Repository) => p.problemSolved && p.eduardoContribution)).toBe(true);
  });
});
