import { useState, useEffect } from 'react';
import { Github, Linkedin, Menu, X, FileText, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { hasPublishedArticles } from '../services/blogService';

interface NavbarProps {
  onOpenCurriculum: () => void;
}

export default function Navbar({ onOpenCurriculum }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasBlog = hasPublishedArticles();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Projetos', href: '#projetos' },
    { name: 'Competências', href: '#competencias' },
    { name: 'Sobre Mim', href: '#sobre' },
    { name: 'Trajetória', href: '#trajetoria' },
    ...(hasBlog ? [{ name: 'Blog Técnico', href: '#blog' }] : []),
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-lg shadow-black/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand with Elegant Dark Monogram */}
        <a
          href="#hero"
          id="nav-brand-link"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1 -m-1"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-white text-base group-hover:text-blue-400 transition-colors">
                Eduardo Estigarribia
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Backend
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono hidden md:block">
              Java • Spring Boot • PostgreSQL
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links - Elegant Dark uppercase tracking-widest */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 rounded transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Socials */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            id="nav-curriculum-btn"
            onClick={onOpenCurriculum}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer"
            title="Ver Currículo em PDF"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Currículo</span>
          </button>

          <a
            id="nav-github-link"
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de Eduardo Estigarribia no GitHub"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            title="GitHub @Drufontael"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="nav-linkedin-link"
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de Eduardo Estigarribia no LinkedIn"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            title="LinkedIn Eduardo Estigarribia"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Connect Button inspired by Elegant Dark header */}
          <a
            id="nav-connect-cta"
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-100 text-zinc-950 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Conectar
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            id="mobile-curriculum-btn"
            onClick={onOpenCurriculum}
            className="p-2 text-xs font-medium rounded-lg bg-zinc-900 text-blue-400 border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Visualizar currículo oficial"
            title="Currículo"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="sm:hidden border-b border-zinc-800 bg-zinc-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:bg-zinc-900 hover:text-blue-400 focus-visible:outline-none focus-visible:text-blue-400"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCurriculum();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 text-zinc-200 text-sm font-medium border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Visualizar Currículo Completo
            </button>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Mail className="w-4 h-4" />
              Canais de Contato
            </a>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de Eduardo no GitHub"
                className="p-2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de Eduardo no LinkedIn"
                className="p-2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
