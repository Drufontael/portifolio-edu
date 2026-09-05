import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  GitCommit, 
  Target, 
  UserCheck, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Repository } from '../types';

interface ProjectModalProps {
  project: Repository | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedClone, setCopiedClone] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleCloseSafe = useCallback(() => {
    if (window.history.state?.modalOpen === 'project') {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Trap focus and handle Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseSafe();
        return;
      }

      if (e.key === 'Tab' && modalContentRef.current) {
        const focusableElements: HTMLElement[] = Array.from(
          modalContentRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Push state so mobile/browser back button closes modal safely
    window.history.pushState({ modalOpen: 'project' }, '');
    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [project, onClose, handleCloseSafe]);

  if (!project) return null;

  const cloneCommand = `git clone ${project.codeUrl || project.html_url}.git`;
  const isDev = project.status?.type === 'in_development';
  const projectTitle = project.displayName || project.name;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseSafe();
      }}
      aria-labelledby="project-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Centering wrapper with min-h-full and items-start to prevent top clipping */}
      <div className="min-h-full w-full flex items-start justify-center p-3 sm:p-6 py-6 sm:py-10">
        <div 
          ref={modalContentRef}
          className="relative w-full max-w-3xl rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-5 sm:p-8 space-y-6 text-left animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={handleCloseSafe}
            className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Fechar modal de detalhes do projeto"
            title="Fechar modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-3 pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.language || 'Java'}
              </span>

              {/* Status Badge */}
              {project.status && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    isDev
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {isDev ? <Clock className="w-3 h-3 text-amber-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  <span>{project.status.label}</span>
                </span>
              )}

              {project.architecture && (
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {project.architecture}
                </span>
              )}
              {project.commits_count && (
                <span className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60">
                  <GitCommit className="w-3 h-3 text-blue-400" />
                  {project.commits_count}+ commits
                </span>
              )}
            </div>

            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
              {projectTitle}
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Estágio Atual de Desenvolvimento */}
          {isDev && project.status?.stageDescription && (
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold block mb-0.5">Estágio Atual de Desenvolvimento:</strong>
                <span>{project.status.stageDescription}</span>
              </div>
            </div>
          )}

          {/* Git Clone box */}
          <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                Clonar Repositório
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-1.5 py-0.5"
              >
                {copiedClone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar comando</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-xs sm:text-sm text-blue-400 select-all overflow-x-auto whitespace-nowrap">
              {cloneCommand}
            </div>
          </div>

          {/* Blocos Estruturados: Problema, Contribuição, Decisão Técnica */}
          <div className="space-y-3 pt-2">
            {project.problemSolved && (
              <div className="space-y-1 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-red-400" />
                  <span>{project.problemLabel || 'Problema abordado'}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {project.eduardoContribution && (
              <div className="space-y-1 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Contribuição de Eduardo</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.eduardoContribution}
                </p>
              </div>
            )}

            {project.mainTechnicalDecision && (
              <div className="space-y-1 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Principal Decisão Técnica</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.mainTechnicalDecision}
                </p>
              </div>
            )}
          </div>

          {/* Highlights / Architectural decisions */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Decisões de Engenharia e Arquitetura
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologias */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Tecnologias Utilizadas:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 text-xs font-mono border border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
            <div className="text-xs font-mono text-zinc-500">
              {project.updated_at ? `Última atualização: ${new Date(project.updated_at).toLocaleDateString('pt-BR')}` : ''}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCloseSafe}
                className="px-4 py-2 rounded-lg text-sm text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                Fechar
              </button>

              {/* Link para demonstração somente se existir */}
              {Boolean(project.demoUrl) && (
                <a
                  href={project.demoUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demonstração</span>
                </a>
              )}

              <a
                href={project.codeUrl || project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>Ver Código no GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
