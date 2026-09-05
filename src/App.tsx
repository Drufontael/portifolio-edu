import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompetenciesSection from './components/CompetenciesSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CurriculumModal from './components/CurriculumModal';
import { MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-blue-500/25 selection:text-blue-300">
      {/* Navigation Header */}
      <Navbar onOpenCurriculum={() => setCurriculumModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCurriculum={() => setCurriculumModalOpen(true)} />

        {/* Matriz de Competências Técnicas (posicionada acima dos projetos conforme solicitado) */}
        <CompetenciesSection />

        {/* GitHub Projects Section */}
        <ProjectsSection />

        {/* About Me & Professional Profile */}
        <AboutSection />

        {/* Experience Timeline (MM Motors & STEMAC S/A) */}
        <ExperienceTimeline />

        {/* Engineering Blog */}
        <BlogSection />

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

      {/* Floating Fast WhatsApp Conversion Button */}
      <aside aria-label="Ações Rápidas de Contato">
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${PERSONAL_INFO.cleanPhone}?text=${encodeURIComponent(
            'Olá Eduardo, vi seu portfólio backend e gostaria de conversar sobre uma oportunidade.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-2 group border border-blue-400/30"
          title="Falar diretamente no WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-mono pr-1">
            Falar no WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
}
