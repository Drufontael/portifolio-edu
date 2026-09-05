import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompetenciesSection from './components/CompetenciesSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import BlogSection from './components/BlogSection';
import ArticlePage from './components/ArticlePage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CurriculumModal from './components/CurriculumModal';
import { 
  hasPublishedArticles, 
  getArticleBySlug, 
  parseArticleSlugFromHash 
} from './services/blogService';
import { BlogPost } from './types';

export default function App() {
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const hasBlog = hasPublishedArticles();

  // Gerenciamento de rotas de artigos via hash (#artigo/:slug)
  useEffect(() => {
    const handleHashRouting = () => {
      const slug = parseArticleSlugFromHash(window.location.hash);
      if (slug) {
        const found = getArticleBySlug(slug);
        if (found) {
          setActiveArticle(found);
          return;
        }
      }
      setActiveArticle(null);
    };

    // Avalia a rota no carregamento inicial
    handleHashRouting();

    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  const handleBackFromArticle = () => {
    setActiveArticle(null);
    if (window.location.hash.startsWith('#artigo/')) {
      window.location.hash = hasBlog ? '#blog' : '';
    }
  };

  // Se houver um artigo ativo com URL própria, renderiza a página individual do artigo
  if (activeArticle) {
    return (
      <ArticlePage
        article={activeArticle}
        onBack={handleBackFromArticle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-blue-500/25 selection:text-blue-300">
      {/* Navigation Header */}
      <Navbar onOpenCurriculum={() => setCurriculumModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCurriculum={() => setCurriculumModalOpen(true)} />

        {/* GitHub Projects Section */}
        <ProjectsSection />

        {/* Matriz de Competências Técnicas */}
        <CompetenciesSection />

        {/* About Me & Professional Profile */}
        <AboutSection />

        {/* Experience Timeline (MM Motors & STEMAC S/A) */}
        <ExperienceTimeline />

        {/* Blog de Engenharia & Tecnologia (ativo apenas quando há artigos completos publicados) */}
        {hasBlog && <BlogSection onSelectArticle={(post) => setActiveArticle(post)} />}

        {/* Conversion-Focused Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Curriculum Vitae Modal */}
      <CurriculumModal
        isOpen={curriculumModalOpen}
        onClose={() => setCurriculumModalOpen(false)}
      />
    </div>
  );
}
