import { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  Check, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BlogPost } from '../types';
import { updateArticleSeo } from '../services/blogService';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ArticlePageProps {
  article: BlogPost;
  onBack: () => void;
}

export default function ArticlePage({ article, onBack }: ArticlePageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Atualiza metadados SEO do artigo (title, description, og:tags) e restaura ao desmontar
    const restoreSeo = updateArticleSeo(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      restoreSeo();
    };
  }, [article]);

  const handleShare = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const authorName = article.author?.name || 'Eduardo Estigarribia';
  const authorRole = article.author?.role || 'Desenvolvedor Backend Java | Analista de Sistemas';
  const displayDate = article.publishedAt || article.date;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Top Navigation & Breadcrumbs */}
        <nav aria-label="Navegação do Artigo" className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <button
              onClick={onBack}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Início
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-500">Artigos</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-blue-400 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="Copiar link permanente deste artigo"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
          </div>
        </nav>

        {/* Semantic Article */}
        <article className="space-y-8">
          
          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {article.category}
              </span>
              {displayDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <time dateTime={displayDate}>{displayDate}</time>
                </span>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed border-l-2 border-blue-500 pl-4 py-1 italic bg-zinc-900/40 rounded-r-lg">
              {article.summary}
            </p>

            {/* Author bar */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                  E
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>{authorName}</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    {authorRole}
                  </div>
                </div>
              </div>

              {article.externalUrl && (
                <a
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 transition-colors"
                >
                  <span>Publicação Externa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </header>

          {/* Article Main Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 text-base leading-relaxed space-y-5 pt-4">
            {article.content.map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-6 pb-2 border-b border-zinc-800 font-mono">
                    {paragraph.replace('### ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white pt-6 pb-2 border-b border-zinc-800 font-mono">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <div key={idx} className="flex items-start gap-2.5 pl-2 text-zinc-300">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{paragraph.replace('- ', '')}</span>
                  </div>
                );
              }
              if (/^\d\.\s/.test(paragraph)) {
                return (
                  <div key={idx} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <p>{paragraph}</p>
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <footer className="pt-8 border-t border-zinc-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-blue-400" />
                <span>Tópicos e Tecnologias Abordadas:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}

          {/* Author Card Footer */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Sobre o Autor</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                  {PERSONAL_INFO.role}. Experiência prática na transição da mecânica industrial de precisão para engenharia de software backend com foco em Java, Spring Boot, arquitetura limpa e testes automatizados.
                </p>
              </div>
              <button
                onClick={onBack}
                className="self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
              >
                Voltar ao Portfólio
              </button>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}
