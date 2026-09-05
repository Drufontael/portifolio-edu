import { describe, it, expect } from 'vitest';
import { COMPETENCY_GROUPS } from './portfolioData';

describe('Matriz de Competências Baseada em Evidências', () => {
  it('deve conter exatamente os 3 grupos especificados', () => {
    expect(COMPETENCY_GROUPS).toHaveLength(3);
    expect(COMPETENCY_GROUPS[0].id).toBe('foco-principal');
    expect(COMPETENCY_GROUPS[1].id).toBe('experiencia-pratica');
    expect(COMPETENCY_GROUPS[2].id).toBe('conhecimento-complementar');
  });

  it('não deve conter rótulos subjetivos (Avançado, Intermediário, Básico, etc.) em nenhum lugar', () => {
    const rawJson = JSON.stringify(COMPETENCY_GROUPS);
    expect(rawJson).not.toMatch(/Avançado/i);
    expect(rawJson).not.toMatch(/Intermediário/i);
    expect(rawJson).not.toMatch(/Básico/i);
    expect(rawJson).not.toMatch(/Proficiência/i);
  });

  it('o Grupo 1 (Foco Principal) deve conter as 6 tecnologias centrais', () => {
    const focoGroup = COMPETENCY_GROUPS.find((g) => g.id === 'foco-principal');
    expect(focoGroup).toBeDefined();

    const techNames = focoGroup!.technologies.map((t) => t.name);
    expect(techNames).toContain('Java');
    expect(techNames).toContain('Spring Boot');
    expect(techNames).toContain('APIs REST');
    expect(techNames).toContain('Spring Data JPA');
    expect(techNames).toContain('PostgreSQL');
    expect(techNames.some((n) => n.includes('Testes'))).toBe(true);
  });

  it('o Grupo 2 (Experiência Prática) deve conter as 8 tecnologias solicitadas', () => {
    const expGroup = COMPETENCY_GROUPS.find((g) => g.id === 'experiencia-pratica');
    expect(expGroup).toBeDefined();

    const techNames = expGroup!.technologies.map((t) => t.name);
    expect(techNames).toContain('Spring Security');
    expect(techNames.some((n) => n.includes('JWT'))).toBe(true);
    expect(techNames).toContain('Docker Compose');
    expect(techNames).toContain('Arquitetura Hexagonal');
    expect(techNames).toContain('Ktor');
    expect(techNames).toContain('Koin');
    expect(techNames.some((n) => n.includes('Kotlin Multiplatform'))).toBe(true);
    expect(techNames).toContain('Next.js');
  });

  it('todas as tecnologias devem apresentar contexto de uso e projeto no qual foram aplicadas', () => {
    COMPETENCY_GROUPS.forEach((group) => {
      group.technologies.forEach((tech) => {
        expect(tech.name.trim().length).toBeGreaterThan(0);
        expect(tech.usageContext.trim().length).toBeGreaterThan(15);
        expect(tech.appliedProject.trim().length).toBeGreaterThan(2);

        if (tech.repoUrl) {
          expect(tech.repoUrl.startsWith('https://github.com/')).toBe(true);
        }
      });
    });
  });
});
