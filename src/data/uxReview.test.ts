import { describe, it, expect } from 'vitest';
import { EXPERIENCES, CURATED_PROJECTS } from './portfolioData';

describe('UX Review Directives Validation', () => {
  it('should ensure each professional experience has at most 4 bullets', () => {
    for (const exp of EXPERIENCES) {
      expect(exp.bullets.length).toBeLessThanOrEqual(4);
      expect(exp.bullets.length).toBeGreaterThan(0);
    }
  });

  it('should verify MM Motors has exactly 4 bullets', () => {
    const mmMotors = EXPERIENCES.find((exp) => exp.id === 'mm-motors');
    expect(mmMotors).toBeDefined();
    expect(mmMotors?.bullets.length).toBe(4);
  });

  it('should verify STEMAC S/A has exactly 4 bullets', () => {
    const stemac = EXPERIENCES.find((exp) => exp.id === 'stemac');
    expect(stemac).toBeDefined();
    expect(stemac?.bullets.length).toBe(4);
  });

  it('should ensure MykytaDu App does not claim MVI or 85% shared code', () => {
    const app = CURATED_PROJECTS.find((p) => p.name === 'mykytadu-app');
    expect(app).toBeDefined();
    const appText = JSON.stringify(app);
    expect(appText).not.toContain('MVI');
    expect(appText).not.toContain('85%');
    expect(app?.status?.type).toBe('in_development');
    expect(app?.status?.label).toBe('Em desenvolvimento');
  });

  it('should ensure MykytaDu API does not claim microsserviços', () => {
    const api = CURATED_PROJECTS.find((p) => p.name === 'mykytadu-api');
    expect(api).toBeDefined();
    const apiText = JSON.stringify(api);
    expect(apiText.toLowerCase()).not.toContain('microsserviço');
  });

  it('should ensure Carshop has verified origin and problemLabel', () => {
    const carshop = CURATED_PROJECTS.find((p) => p.name === 'carshop');
    expect(carshop).toBeDefined();
    expect(carshop?.problemLabel).toBeDefined();
    expect(carshop?.problemLabel).toContain('Problema');
  });

  it('should ensure all curated projects have problemLabel', () => {
    for (const project of CURATED_PROJECTS) {
      expect(project.problemLabel).toBeDefined();
      expect(typeof project.problemLabel).toBe('string');
    }
  });
});

