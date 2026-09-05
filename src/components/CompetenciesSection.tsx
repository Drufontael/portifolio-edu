import { useState } from 'react';
import { Cpu, CheckCircle2, Terminal, Code2, Server, Database, ShieldCheck, Box } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export default function CompetenciesSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Server className="w-4 h-4 text-blue-400" />;
      case 1:
        return <Database className="w-4 h-4 text-blue-400" />;
      case 2:
        return <ShieldCheck className="w-4 h-4 text-blue-400" />;
      case 3:
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 4:
        return <Box className="w-4 h-4 text-blue-400" />;
      default:
        return <Terminal className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="competencias" className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Matriz de Competências Técnicas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stack Tecnológica & Domínio de Engenharia
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
            Tecnologias, linguagens, frameworks e boas práticas aplicadas na construção de ecossistemas backend robustos, seguros e escaláveis.
          </p>
        </div>

        {/* Technical Competencies Container */}
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 border border-zinc-800 text-left shadow-xl shadow-black/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                {getCategoryIcon(activeCategory)}
                <span>{SKILL_CATEGORIES[activeCategory].category}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Selecione uma categoria para visualizar as ferramentas e o nível de proficiência.
              </p>
            </div>

            {/* Category selection tabs */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === idx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {cat.category.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Active category skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800/90 flex items-center justify-between gap-3 hover:border-blue-500/50 hover:bg-zinc-950 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-zinc-200 truncate">{skill.name}</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-800 text-blue-400 border border-zinc-700 shrink-0">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Technical Highlights Bar */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-zinc-500 font-semibold uppercase">Foco Principal:</span>
              <span className="text-zinc-300">Java 21</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">Spring Boot</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">PostgreSQL</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">Docker</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">Hexagonal Architecture</span>
            </div>
            <span className="text-blue-400 font-sans text-xs">
              Total de 30+ tecnologias mapeadas
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
