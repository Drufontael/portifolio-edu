import { useState, useEffect, MouseEvent } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  Layers, 
  Search, 
  RefreshCw, 
  Check, 
  Copy, 
  Code2, 
  Terminal, 
  ArrowUpRight,
  GitCommit
} from 'lucide-react';
import { Repository } from '../types';
import { getRepositories, refreshRepositories } from '../services/github';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Agora');
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'java' | 'kotlin'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const loadRepos = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const data = forceRefresh ? await refreshRepositories() : await getRepositories();
      setRepositories(data);
      const now = new Date();
      setLastSyncTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    } catch (err) {
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const handleCopyClone = (repo: Repository, e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${repo.html_url}.git`);
    setCopiedId(repo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter logic
  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (repo.topics && repo.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (activeTab === 'featured') {
      return repo.is_featured || repo.name === 'Our-Recipes' || repo.name === 'Carshop' || repo.name === 'mykytadu';
    }
    if (activeTab === 'java') {
      return (repo.language && repo.language.toLowerCase() === 'java') || 
             (repo.topics && repo.topics.includes('spring-boot')) ||
             (repo.topics && repo.topics.includes('java'));
    }
    if (activeTab === 'kotlin') {
      return (repo.language && repo.language.toLowerCase() === 'kotlin') ||
             (repo.topics && repo.topics.includes('kmp')) ||
             (repo.topics && repo.topics.includes('kotlin-multiplatform'));
    }
    return true;
  });

  const getLanguageColor = (lang?: string) => {
    switch (lang?.toLowerCase()) {
      case 'java':
        return 'bg-amber-500';
      case 'kotlin':
        return 'bg-purple-500';
      case 'typescript':
        return 'bg-blue-500';
      case 'javascript':
        return 'bg-yellow-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <section id="projetos" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elegant Dark Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>Featured Projects & Open Source</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projetos em Destaque & Repositórios GitHub
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Aplicações estruturadas com foco em arquitetura limpa, separação estrita de domínios, persistência relacional e conteinerização. Sincronizado automaticamente com a conta GitHub <a href="https://github.com/Drufontael" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono">@Drufontael</a>.
            </p>
          </div>

          {/* Sync & GitHub Profile link */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              id="refresh-repos-btn"
              onClick={() => loadRepos(true)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all disabled:opacity-50"
              title="Recarregar repositórios do GitHub"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Sincronizando...' : `Sync GitHub (${lastSyncTime})`}</span>
            </button>

            <a
              id="view-full-github-btn"
              href="https://github.com/Drufontael?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg text-xs font-medium text-zinc-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Ver todos os repos →</span>
            </a>
          </div>
        </div>

        {/* Controls: Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Tabs styled with Elegant Dark accents */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'featured'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Destaques
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Todos ({repositories.length})
            </button>
            <button
              onClick={() => setActiveTab('java')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'java'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Java / Spring
            </button>
            <button
              onClick={() => setActiveTab('kotlin')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'kotlin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Kotlin Multiplatform
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
              placeholder="Buscar repositório, tecnologia..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid: Exactly in line with Elegant Dark's cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRepos.map((repo) => {
            const isCopied = copiedId === repo.id;

            return (
              <div
                key={repo.id}
                id={`project-card-${repo.id}`}
                className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex flex-col justify-between hover:border-blue-500/50 group transition-all duration-200 text-left shadow-md shadow-black/40"
              >
                {/* Top Badge & Language */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span className="text-xs font-mono text-blue-400">
                        {repo.language || 'Code'}
                      </span>
                      {repo.commits_count && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
                          <GitCommit className="w-3 h-3" />
                          {repo.commits_count} commits
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Architecture Tag */}
                  {repo.architecture && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Layers className="w-3 h-3" />
                        {repo.architecture}
                      </span>
                    </div>
                  )}

                  {/* Title with hover:text-blue-400 */}
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors font-mono mb-2 flex items-center justify-between">
                    <span>{repo.name}</span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white p-1 transition-colors"
                      title="Abrir no GitHub"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
                    {repo.description || 'Repositório focado em soluções backend e arquitetura limpa.'}
                  </p>

                  {/* Highlights preview */}
                  {repo.highlights && repo.highlights.length > 0 && (
                    <div className="mb-4 pt-3 border-t border-zinc-800 space-y-1.5">
                      {repo.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-700/50"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleCopyClone(repo, e)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Copiar comando de clone"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-blue-400">Copiado</span>
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
                      onClick={() => setSelectedProject(repo)}
                      className="px-2.5 py-1.5 rounded text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      Detalhes
                    </button>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredRepos.length === 0 && (
          <div className="text-center py-16 px-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <Code2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-300 font-medium">Nenhum repositório encontrado para este filtro.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline font-mono"
            >
              Limpar filtros de busca
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
