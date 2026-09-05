import { useState, useEffect, MouseEvent, useTransition } from 'react';
import { 
  Github, 
  Star, 
  Layers, 
  Search, 
  RefreshCw, 
  Check, 
  Copy, 
  Code2, 
  Terminal, 
  ArrowUpRight,
  GitCommit,
  ExternalLink,
  Cpu,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Repository } from '../types';
import { CURATED_PROJECTS } from '../data/portfolioData';
import { enrichProjectsWithGitHub, refreshRepositories } from '../services/github';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  // Renderize imediatamente a lista local curada, sem aguardar API
  const [repositories, setRepositories] = useState<Repository[]>(CURATED_PROJECTS);
  const [isUpdatingMetrics, setIsUpdatingMetrics] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'functional' | 'in_development' | 'java' | 'kotlin'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const syncMetrics = async (forceRefresh = false) => {
    setIsUpdatingMetrics(true);
    try {
      const enriched = forceRefresh ? await refreshRepositories() : await enrichProjectsWithGitHub(CURATED_PROJECTS);
      // Atualização silenciosa sem causar flash visual ou erro
      startTransition(() => {
        setRepositories(enriched);
      });
    } catch {
      // Em erro, mantém integralmente os cards locais e não exibe erro ao visitante
    } finally {
      setIsUpdatingMetrics(false);
    }
  };

  useEffect(() => {
    syncMetrics(false);
  }, []);

  const handleCopyClone = (repo: Repository, e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${repo.codeUrl || repo.html_url}.git`);
    setCopiedId(repo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtragem local baseada na curadoria e busca
  const filteredRepos = repositories.filter((repo) => {
    // Rejeita qualquer repositório fora da curadoria ou que não exista
    if (repo.name.toLowerCase() === 'mykytadu') return false;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      (repo.displayName && repo.displayName.toLowerCase().includes(query)) ||
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      (repo.problemSolved && repo.problemSolved.toLowerCase().includes(query)) ||
      (repo.eduardoContribution && repo.eduardoContribution.toLowerCase().includes(query)) ||
      (repo.mainTechnicalDecision && repo.mainTechnicalDecision.toLowerCase().includes(query)) ||
      (repo.technologies && repo.technologies.some((t) => t.toLowerCase().includes(query))) ||
      (repo.topics && repo.topics.some((t) => t.toLowerCase().includes(query)));

    if (!matchesSearch) return false;

    if (activeTab === 'functional') {
      return repo.status?.type === 'completed' || repo.status?.type === 'functional';
    }
    if (activeTab === 'in_development') {
      return repo.status?.type === 'in_development';
    }
    if (activeTab === 'java') {
      return (repo.language && repo.language.toLowerCase() === 'java') ||
             (repo.technologies && repo.technologies.some((t) => t.toLowerCase().includes('java') || t.toLowerCase().includes('spring')));
    }
    if (activeTab === 'kotlin') {
      return (repo.language && repo.language.toLowerCase() === 'kotlin') ||
             (repo.technologies && repo.technologies.some((t) => t.toLowerCase().includes('kotlin')));
    }
    return true;
  });

  const getLanguageColor = (lang?: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'java':
        return 'bg-amber-500';
      case 'kotlin':
        return 'bg-purple-500';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <section id="projetos" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>Projetos em Destaque e Código Aberto</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projetos em Destaque e Repositórios
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Aplicações estruturadas com foco em arquitetura limpa, regras de negócio isoladas, persistência relacional e conteinerização. Repositórios disponíveis no GitHub <a href="https://github.com/Drufontael" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono">@Drufontael</a>.
            </p>
          </div>

          {/* Quick Profile Link & Silent Metric Refresh */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              id="refresh-metrics-btn"
              onClick={() => syncMetrics(true)}
              disabled={isUpdatingMetrics}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Atualizar métricas de estrelas e commits via GitHub"
              aria-label="Atualizar métricas de estrelas e commits via GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isUpdatingMetrics ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Métricas GitHub</span>
            </button>

            <a
              id="view-full-github-btn"
              href="https://github.com/Drufontael?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white px-4 py-2 rounded-lg text-xs font-medium text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Github className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver no GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Controls: Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Todos ({repositories.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('functional')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                activeTab === 'functional'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Concluídos e Funcionais
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('in_development')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                activeTab === 'in_development'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Em Desenvolvimento
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('java')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                activeTab === 'java'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Java / Spring
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('kotlin')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                activeTab === 'kotlin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Kotlin
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              id="search-projects-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, problema, tech..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid: 2 columns on large screens for readable architectural cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRepos.map((repo) => {
            const isCopied = copiedId === repo.id;
            const isDev = repo.status?.type === 'in_development';
            const projectTitle = repo.displayName || repo.name;

            return (
              <div
                key={repo.id}
                id={`project-card-${repo.id}`}
                className={`bg-zinc-900 border rounded-xl p-6 flex flex-col justify-between text-left transition-all duration-200 shadow-md shadow-black/40 ${
                  isDev 
                    ? 'border-amber-500/30 hover:border-amber-500/60' 
                    : 'border-zinc-800 hover:border-blue-500/50'
                }`}
              >
                {/* Header: Title, Language, Status & Dynamic Metrics */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span className="text-xs font-mono text-zinc-400">
                          {repo.language || 'Java'}
                        </span>

                        {/* Status Badge */}
                        {repo.status && (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                              repo.status.type === 'in_development'
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            {repo.status.type === 'in_development' ? (
                              <Clock className="w-3 h-3 text-amber-400" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            )}
                            <span>{repo.status.label}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white tracking-tight font-mono">
                        {projectTitle}
                      </h3>
                    </div>

                    {/* Dynamic Metrics (Stars, Commits, discreet update indicator) */}
                    <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                      {isUpdatingMetrics && (
                        <span
                          title="Atualizando métricas em segundo plano via GitHub..."
                          className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
                        />
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                      )}
                      {repo.commits_count && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <GitCommit className="w-3.5 h-3.5 text-blue-400" />
                          <span>{repo.commits_count} commits</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Architecture Tag */}
                  {repo.architecture && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{repo.architecture}</span>
                    </div>
                  )}

                  {/* High-level Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {repo.description}
                  </p>

                  {/* Estágio Atual Claro para Projetos em Desenvolvimento */}
                  {isDev && repo.status?.stageDescription && (
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 font-semibold block mb-0.5">
                          Estágio Atual de Desenvolvimento:
                        </strong>
                        <span>{repo.status.stageDescription}</span>
                      </div>
                    </div>
                  )}

                  {/* Decisão Técnica Resumida */}
                  {repo.mainTechnicalDecision && (
                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        <span>Decisão Técnica</span>
                      </div>
                      <p className="line-clamp-2 text-zinc-300">
                        {repo.mainTechnicalDecision}
                      </p>
                    </div>
                  )}

                  {/* Principais Tecnologias */}
                  {repo.technologies && repo.technologies.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                        Tecnologias:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {repo.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={(e) => handleCopyClone(repo, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    title="Copiar comando de clone do repositório"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>git clone</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      id={`project-details-btn-${repo.name}`}
                      onClick={() => setSelectedProject(repo)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      aria-label={`Ver detalhes do projeto ${projectTitle}`}
                    >
                      Detalhes
                    </button>

                    {/* Link para demonstração, SOMENTE se existir */}
                    {Boolean(repo.demoUrl) && (
                      <a
                        href={repo.demoUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Demonstração</span>
                      </a>
                    )}

                    {/* Link para o código (sempre presente) */}
                    <a
                      href={repo.codeUrl || repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-zinc-700 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-blue-400" />
                      <span>Ver Código</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state (quando busca não retorna resultados) */}
        {filteredRepos.length === 0 && (
          <div className="text-center py-16 px-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <Code2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-300 font-medium">Nenhum projeto corresponde ao filtro pesquisado.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline font-mono"
            >
              Restaurar lista de projetos
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

