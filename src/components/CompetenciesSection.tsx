import { useState } from 'react';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  Server, 
  ShieldCheck, 
  BookOpen,
  Code2
} from 'lucide-react';
import { COMPETENCY_GROUPS } from '../data/portfolioData';

export default function CompetenciesSection() {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | 'all'>(0);

  const activeGroups = activeGroupIndex === 'all' 
    ? COMPETENCY_GROUPS 
    : [COMPETENCY_GROUPS[activeGroupIndex]];

  const getGroupIcon = (id: string) => {
    switch (id) {
      case 'foco-principal':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'experiencia-pratica':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'conhecimento-complementar':
        return <BookOpen className="w-4 h-4 text-zinc-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="competencias" className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Matriz de Competências & Evidências Técnicas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tecnologias e Aplicação em Projetos
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Mapeamento fundamentado em contexto real de uso, aplicação direta em projetos e código-fonte verificável. Sem autoavaliações subjetivas, barras de porcentagem ou rótulos vagos.
          </p>
        </div>

        {/* Group Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-zinc-800/80 pb-4">
          {COMPETENCY_GROUPS.map((group, idx) => {
            const isActive = activeGroupIndex === idx;
            return (
              <button
                key={group.id}
                id={`competency-tab-${group.id}`}
                onClick={() => setActiveGroupIndex(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800'
                }`}
              >
                {getGroupIcon(group.id)}
                <span>{group.shortTitle}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isActive ? 'bg-blue-700 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {group.technologies.length}
                </span>
              </button>
            );
          })}

          <button
            id="competency-tab-all"
            onClick={() => setActiveGroupIndex('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
              activeGroupIndex === 'all'
                ? 'bg-zinc-800 text-white border-zinc-600 shadow-sm'
                : 'bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border-zinc-800/60'
            }`}
          >
            <span>Ver Todos</span>
            <span className="text-[10px] font-mono text-zinc-400">
              ({COMPETENCY_GROUPS.reduce((acc, g) => acc + g.technologies.length, 0)})
            </span>
          </button>
        </div>

        {/* Competencies Render */}
        <div className="space-y-12 text-left">
          {activeGroups.map((group) => (
            <div key={group.id} className="space-y-6">
              
              {/* Group Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getGroupIcon(group.id)}
                    <h3 className="text-lg font-bold text-white font-mono">
                      {group.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      ({group.technologies.length} tecnologias)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                    {group.description}
                  </p>
                </div>
                <div className="shrink-0 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>{group.badge}</span>
                  </span>
                </div>
              </div>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-5 rounded-xl bg-zinc-900 border border-zinc-800/90 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm group"
                  >
                    <div className="space-y-3">
                      
                      {/* Top: Name & Category Tag */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <h4 className="text-base font-bold text-white font-mono tracking-tight">
                            {tech.name}
                          </h4>
                        </div>
                        {tech.categoryTag && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-800 border border-zinc-700/50 shrink-0">
                            {tech.categoryTag}
                          </span>
                        )}
                      </div>

                      {/* Context of Use */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                          Contexto de Uso:
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {tech.usageContext}
                        </p>
                      </div>

                    </div>

                    {/* Bottom: Applied Project & Verified Repo Link */}
                    <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-zinc-500 font-mono text-[11px] shrink-0">
                          Projeto:
                        </span>
                        <span className="text-zinc-200 font-medium text-right truncate">
                          {tech.appliedProject}
                        </span>
                      </div>

                      {/* Repositories Links */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {tech.repoUrl ? (
                          <div className="flex flex-wrap items-center gap-1.5 w-full">
                            <a
                              href={tech.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors shrink-0"
                              title={`Acessar código-fonte no GitHub: ${tech.repoUrl}`}
                            >
                              <Github className="w-3 h-3" />
                              <span>Código no GitHub</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                            </a>

                            {tech.secondaryRepoUrl && (
                              <a
                                href={tech.secondaryRepoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 border border-zinc-700/60 transition-colors shrink-0"
                                title={`Acessar código-fonte do ${tech.secondaryProject || 'projeto secundário'} no GitHub`}
                              >
                                <FolderGit2 className="w-3 h-3 text-zinc-400" />
                                <span>{tech.secondaryProject || 'Projeto Relacionado'}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-800/80">
                            <span>Laboratório de estudos / especialização</span>
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Footer verification summary note */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400 text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Critério de transparência: sem métricas estimadas ou barras arbitrárias. Cada ferramenta está atrelada à sua aplicação comprovada em repositórios ou ambiente de teste.</span>
          </div>
          <a
            href="https://github.com/Drufontael?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold shrink-0 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Explorar todos os repositórios</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
