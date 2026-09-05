import { describe, it, expect } from 'vitest';
import { EXPERIENCES } from './portfolioData';

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
});
