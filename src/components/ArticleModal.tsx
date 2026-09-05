import { useState } from 'react';
import { X, Calendar, Clock, Tag, Share2, Check, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function ArticleModal({ post, onClose }: ArticleModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-10 space-y-6 my-8 text-left animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Navigation & close */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Blog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              title="Compartilhar link do artigo"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-blue-400">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium text-[11px]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {post.title}
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base italic border-l-2 border-blue-500 pl-4 py-1">
            {post.summary}
          </p>
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
          {post.content.map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-white pt-3 pb-1 border-b border-zinc-800 font-mono">
                  {paragraph.replace('### ', '')}
                </h3>
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
                <div key={idx} className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                  <p>{paragraph}</p>
                </div>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Tag className="w-3.5 h-3.5" />
            <span>Tópicos relacionados:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author signature footer */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-base font-mono">
              E
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Eduardo Estigarribia</p>
              <p className="text-xs text-zinc-400">Desenvolvedor Backend Java | Analista de Sistemas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            Fechar Artigo
          </button>
        </div>

      </div>
    </div>
  );
}
