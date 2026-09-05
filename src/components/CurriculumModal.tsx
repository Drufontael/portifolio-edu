import { useState, useEffect, useCallback } from 'react';
import { X, Printer, Copy, Check, ArrowLeft } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurriculumModal({ isOpen, onClose }: CurriculumModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCloseSafe = useCallback(() => {
    if (window.history.state?.modalOpen === 'curriculum') {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseSafe();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Push state so mobile/browser back button ("retorno") closes modal instead of closing/exiting the site
    window.history.pushState({ modalOpen: 'curriculum' }, '');
    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose, handleCloseSafe]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
EDUARDO ESTIGARRIBIA OLIVEIRA
DESENVOLVEDOR BACKEND JAVA | ANALISTA DE SISTEMAS
Goiânia/GO • Disponível: Presencial, Remoto e Híbrido • ${PERSONAL_INFO.phone} • ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}
GitHub: ${PERSONAL_INFO.githubUrl}

RESUMO PROFISSIONAL
${PERSONAL_INFO.summary}

COMPETÊNCIAS TÉCNICAS
Backend: Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, APIs REST, JWT
Dados e testes: PostgreSQL, MySQL, H2, MongoDB, Redis, JUnit 5, Mockito
Arquitetura e integração: Arquitetura Hexagonal, MVC, Ktor Client, Koin, OpenFeign, Swagger/OpenAPI
Frontend e mobile: Kotlin, Compose Multiplatform, Next.js, React, TypeScript, Angular
Ferramentas: Git, GitHub, Docker, Docker Compose, Maven, Gradle, Linux, Postman

EXPERIÊNCIA PROFISSIONAL
Assistente de Vendas & Desenvolvedor | MM Motors · 2023 – fev. 2026
Técnico Especialista Mecânico | STEMAC S/A · 2000 – 2019 (19 anos)

FORMAÇÃO
Tecnólogo em Análise e Desenvolvimento de Sistemas | Anhanguera Educacional (2025)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseSafe();
      }}
      aria-labelledby="curriculum-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Centering wrapper with min-h-full and items-start to prevent top clipping */}
      <div className="min-h-full w-full flex items-start justify-center p-3 sm:p-6 py-6 sm:py-10">
        <div 
          className="relative w-full max-w-4xl rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-5 sm:p-8 space-y-6 text-left animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky Action Header bar - Always visible at top of modal */}
          <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-md pt-1 pb-4 -mt-1 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCloseSafe}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700/60"
                title="Fechar visualização"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Currículo Oficial 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                title="Copiar texto do currículo"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copiar Texto</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20"
                title="Imprimir ou salvar como PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Salvar PDF</span>
              </button>

              <button
                onClick={handleCloseSafe}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
                aria-label="Fechar currículo"
                title="Fechar currículo (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Container */}
          <div className="bg-zinc-950 p-6 sm:p-8 rounded-lg border border-zinc-800 text-zinc-200 space-y-6 font-sans text-xs sm:text-sm">
            
            {/* Header of Resume */}
            <div className="border-b border-zinc-800 pb-5 space-y-2 text-center sm:text-left">
              <h2 id="curriculum-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                EDUARDO ESTIGARRIBIA OLIVEIRA
              </h2>
              <p className="text-blue-400 font-mono font-bold text-sm sm:text-base tracking-wider uppercase">
                DESENVOLVEDOR BACKEND JAVA | ANALISTA DE SISTEMAS
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-zinc-400 text-xs font-mono pt-1">
                <span>Goiânia/GO (Presencial, Remoto e Híbrido)</span>
                <span>•</span>
                <a href={`tel:${PERSONAL_INFO.cleanPhone}`} className="hover:text-blue-400">{PERSONAL_INFO.phone}</a>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-blue-400">{PERSONAL_INFO.email}</a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
                <span>•</span>
                <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>
              </div>
            </div>

            {/* Resumo Profissional */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                RESUMO PROFISSIONAL
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                Desenvolvedor backend Java e Analista de Sistemas, em transição consolidada para tecnologia após 19 anos de atuação técnica especializada. Experiência prática na construção de APIs REST e aplicações web com Java, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL e Docker, incluindo autenticação, modelagem de domínio e integração entre backend e frontend. Combina raciocínio analítico, diagnóstico de falhas e comunicação com clientes com foco atual em arquitetura limpa, qualidade de código e evolução contínua de produtos de software.
              </p>
            </div>

            {/* Competências Técnicas */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                COMPETÊNCIAS TÉCNICAS
              </h3>
              <div className="space-y-1.5 text-zinc-300">
                <p><strong className="text-white font-mono">Backend:</strong> Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, APIs REST, JWT</p>
                <p><strong className="text-white font-mono">Dados e testes:</strong> PostgreSQL, MySQL, H2, MongoDB, Redis, JUnit 5, Mockito</p>
                <p><strong className="text-white font-mono">Arquitetura e integração:</strong> Arquitetura Hexagonal, MVC, Ktor Client, Koin, OpenFeign, Swagger/OpenAPI</p>
                <p><strong className="text-white font-mono">Frontend e mobile:</strong> Kotlin, Compose Multiplatform, Next.js, React, TypeScript, Angular</p>
                <p><strong className="text-white font-mono">Ferramentas:</strong> Git, GitHub, Docker, Docker Compose, Maven, Gradle, Linux, Postman</p>
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                EXPERIÊNCIA PROFISSIONAL
              </h3>

              {/* MM Motors */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap justify-between font-medium">
                  <span className="text-white font-bold">Assistente de Vendas e Desenvolvedor de Software | MM Motors</span>
                  <span className="text-zinc-500 font-mono text-xs">2023 – fev. 2026</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-300 pl-1">
                  <li>Atuação no processo comercial e administrativo de veículos seminovos, com contato direto com as rotinas e necessidades operacionais do negócio.</li>
                  <li>Concepção e desenvolvimento de solução interna (API Carshop) para gestão de veículos, clientes e consignações, transformando processos do dia a dia em requisitos de software.</li>
                  <li>Construção de API REST em Java/Spring Boot, persistência com PostgreSQL, documentação com Swagger/OpenAPI e ambiente conteinerizado com Docker Compose.</li>
                  <li>Desenvolvimento e integração de interfaces para uso administrativo, mantendo o código versionado no GitHub.</li>
                </ul>
              </div>

              {/* STEMAC S/A */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap justify-between font-medium">
                  <span className="text-white font-bold">Técnico Especialista Mecânico | STEMAC S/A</span>
                  <span className="text-zinc-500 font-mono text-xs">2000 – 2019 (19 anos)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-300 pl-1">
                  <li>Diagnóstico e solução de falhas em grupos geradores, com análise sistemática de causas e tomada de decisão em campo.</li>
                  <li>Atendimento técnico a clientes, elaboração de orientações e coordenação com equipes de diferentes áreas para restabelecer a operação.</li>
                  <li><strong className="text-white">Experiência transferível para desenvolvimento de software:</strong> investigação, depuração, documentação, responsabilidade e atuação sob pressão.</li>
                </ul>
              </div>
            </div>

            {/* Projetos Selecionados */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                PROJETOS SELECIONADOS NO GITHUB
              </h3>

              <div className="space-y-2 text-zinc-300">
                <div>
                  <p className="font-bold text-white">
                    Our Recipes — <span className="font-normal text-zinc-500">Java, Spring Boot, Next.js, PostgreSQL, Docker • 57 commits</span>
                  </p>
                  <p className="text-zinc-400">Aplicação full stack organizada em arquitetura hexagonal, separando domínio, portas e adaptadores. Autenticação Spring Security JWT e orquestração Docker Compose.</p>
                </div>

                <div>
                  <p className="font-bold text-white">
                    Carshop — <span className="font-normal text-zinc-500">Java, Spring Boot, PostgreSQL, Docker, HATEOAS</span>
                  </p>
                  <p className="text-zinc-400">API funcional para gestão de veículos e clientes inspirada na rotina comercial da MM Motors, com documentação Swagger/OpenAPI e hipermídia HATEOAS.</p>
                </div>

                <div>
                  <p className="font-bold text-white">
                    MykytaDu (API & App) — <span className="font-normal text-zinc-500">Kotlin, REST API, Compose Multiplatform, Ktor</span>
                  </p>
                  <p className="text-zinc-400">Ecossistema composto por API RESTful backend (mykytadu-api) para gestão de catálogo e persistência de dados, integrado ao aplicativo multiplataforma Android/Desktop (mykytadu-app) com Compose Multiplatform e Koin.</p>
                </div>
              </div>
            </div>

            {/* Formação & Especializações */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                FORMAÇÃO E CERTIFICAÇÕES
              </h3>
              <div className="space-y-1 text-zinc-300">
                <p><strong className="text-white">Tecnólogo em Análise e Desenvolvimento de Sistemas</strong> — Anhanguera Educacional (Concluído em 2025)</p>
                <p className="text-zinc-400">• Java e Spring Boot — Digital Innovation One (DIO)</p>
                <p className="text-zinc-400">• Testes em Java com JUnit e Mockito — Digital Innovation One (DIO)</p>
              </div>
            </div>

          </div>

          {/* Bottom Action Bar - Extra reassurance for easy closing */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
            <span className="text-xs font-mono text-zinc-500">
              Eduardo Estigarribia • Currículo Oficial
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Salvar PDF</span>
              </button>
              <button
                onClick={handleCloseSafe}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20"
              >
                <X className="w-3.5 h-3.5" />
                <span>Fechar Currículo</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

