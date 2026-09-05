import { 
  User, 
  GraduationCap, 
  Award 
} from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Perfil Profissional</span>
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sobre Mim
          </h2>
        </div>

        {/* Bio Narrative: Strictly Summarized into Two Paragraphs */}
        <div className="max-w-3xl mb-14 text-left space-y-5">
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
            Sou <strong className="text-white font-semibold">Eduardo Estigarribia Oliveira</strong>, Desenvolvedor Backend Java e graduado em Análise e Desenvolvimento de Sistemas (Anhanguera), residente em Goiânia/GO. Atuo com foco na construção de APIs RESTful estruturadas em Java 21 e Spring Boot, persistência relacional com PostgreSQL e Spring Data JPA, arquitetura desacoplada (Ports &amp; Adapters) e garantia de qualidade com testes automatizados em JUnit 5 e Mockito.
          </p>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Minha trajetória técnica inclui 19 anos de atuação em manutenção e diagnóstico de grupos geradores industriais em sistemas de operação contínua (hospitais e infraestrutura crítica). Essa vivência consolidou disciplina investigativa para análise metódica de causa-raiz, tomada de decisão orientada à estabilidade e rigor na documentação de rotinas — princípios que aplico diretamente no desenvolvimento backend para criar serviços previsíveis, seguros e fáceis de manter.
          </p>
        </div>

        {/* Education & Certifications: Concrete Academic and Training Evidence */}
        <div className="pt-2">
          <div className="mb-6 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>Formação Acadêmica e Certificações</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Base acadêmica em Análise de Sistemas e programas de qualificação técnica continuada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3 shadow-md shadow-black/30"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    {idx === 0 ? <GraduationCap className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-mono text-blue-400">{edu.period}</span>
                  <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400 font-medium">{edu.institution}</p>
                </div>
                {edu.details && (
                  <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
