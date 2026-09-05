import { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowUpRight,
  MapPin,
  Clock
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Contato Direto</span>
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Canais de Contato
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-3 leading-relaxed">
            Disponível para contratação e novos desafios em desenvolvimento backend Java. Escolha o canal de sua preferência para iniciar a conversa:
          </p>
        </div>

        {/* Three Preserved Channels: E-mail, LinkedIn, WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10">
          
          {/* E-mail Card */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5 shadow-md shadow-black/40">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">E-mail</h3>
                <p className="text-xs text-zinc-400 mt-0.5 font-mono break-all select-all">
                  {PERSONAL_INFO.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
              <a
                id="contact-email-link"
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <span>Enviar E-mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                id="contact-copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer"
                title="Copiar endereço de e-mail"
                aria-label="Copiar endereço de e-mail"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5 shadow-md shadow-black/40">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">LinkedIn</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Perfil profissional completo, conexões e recomendações
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <a
                id="contact-linkedin-link"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-zinc-700 font-semibold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <span>Conectar no LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5 shadow-md shadow-black/40">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">WhatsApp</h3>
                <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80">
              <a
                id="contact-whatsapp-link"
                href={`https://wa.me/${PERSONAL_INFO.cleanPhone}?text=${encodeURIComponent(
                  'Olá Eduardo, vi seu portfólio backend e gostaria de conversar sobre uma oportunidade.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-zinc-700 font-semibold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <span>Conversar no WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Availability & Location Callout */}
        <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-300 font-mono">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Goiânia, GO • Disponível para modelos Presencial, Remoto e Híbrido</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Horário comercial de Brasília (UTC-3)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
