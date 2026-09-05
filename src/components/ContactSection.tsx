import { useState, FormEvent } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Vaga Backend Java',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    // Save contact message to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
      existing.push({
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving message locally:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const sendViaWhatsApp = () => {
    const text = `*Contato via Portfólio*\n\n*Nome:* ${formData.name || 'Interessado'}\n*Email:* ${formData.email || 'Não informado'}\n*Interesse:* ${formData.type}\n*Mensagem:* ${formData.message || 'Gostaria de conversar sobre uma oportunidade.'}`;
    window.open(`https://wa.me/${PERSONAL_INFO.cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`[Portfólio] ${formData.type} - ${formData.name || 'Contato'}`);
    const body = encodeURIComponent(
      `Olá Eduardo,\n\nMeu nome é ${formData.name}.\nEmail: ${formData.email}\nTipo de interesse: ${formData.type}\n\nMensagem:\n${formData.message}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elegant Dark Eyebrow */}
        <div className="max-w-3xl mb-16 text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>Direct Channels & Inquiries</span>
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Vamos Construir Sistemas Sólidos Juntos?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
            Estou disponível para novos desafios em posições de <strong className="text-white font-medium">Desenvolvedor Backend Java</strong>, Analista de Sistemas ou projetos corporativos. Escolha o canal de sua preferência para um contato rápido e direto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Quick Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
              Canais Diretos de Contato Imediato
            </h3>

            {/* WhatsApp Card */}
            <a
              id="direct-whatsapp-card"
              href={`https://wa.me/${PERSONAL_INFO.cleanPhone}?text=${encodeURIComponent(
                'Olá Eduardo, vi seu portfólio backend e gostaria de bater um papo.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all flex items-center justify-between gap-4 shadow-md shadow-black/40"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      WhatsApp Direto
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Resposta Rápida
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
            </a>

            {/* Email Card with Copy button */}
            <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4 shadow-md shadow-black/40">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white">Email Profissional</h4>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs text-zinc-400 font-mono hover:text-blue-400 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                id="copy-email-card-btn"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shrink-0 border border-zinc-700/60"
                title="Copiar email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social profiles row */}
            <div className="grid grid-cols-2 gap-3">
              <a
                id="contact-linkedin-card"
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors block">
                    LinkedIn
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate block">eduardoestigarribia</span>
                </div>
              </a>

              <a
                id="contact-github-card"
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors block">
                    GitHub
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate block">@Drufontael</span>
                </div>
              </a>
            </div>

            {/* Location & Availability Callout */}
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Goiânia, GO - Brasil (Disponível: Presencial, Remoto e Híbrido)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Horário comercial de Brasília (GMT-3)</span>
              </div>
            </div>

          </div>

          {/* Right: Modern High-Conversion Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl shadow-black/50 text-left">
              
              {submitted ? (
                <div className="py-8 space-y-5 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Mensagem Recebida com Sucesso!</h3>
                    <p className="text-zinc-300 text-sm max-w-md mx-auto">
                      Obrigado pelo contato, <strong className="text-white">{formData.name}</strong>. Responderei ao seu email (<span className="text-blue-400">{formData.email}</span>) o mais breve possível.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-3">
                    <button
                      onClick={sendViaWhatsApp}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Agilizar no WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', type: 'Vaga Backend Java', message: '' });
                      }}
                      className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-zinc-800 pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 font-mono">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span>Formulário de Mensagem Direta</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Preencha os campos abaixo para iniciar um contato formal.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-zinc-300">
                        Seu Nome ou Empresa *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Carlos Silva ou RH Tech"
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-zinc-300">
                        Seu Email de Retorno *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="exemplo@empresa.com"
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-type" className="text-xs font-mono text-zinc-300">
                      Tipo de Oportunidade / Assunto
                    </label>
                    <select
                      id="contact-type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Vaga Backend Java">Vaga Backend Java (CLT / PJ)</option>
                      <option value="Vaga Analista de Sistemas">Vaga Analista de Sistemas / Full Stack</option>
                      <option value="Projeto Freelance / API">Projeto Freelance ou Desenvolvimento de API</option>
                      <option value="Consultoria Técnica">Consultoria em Arquitetura ou Banco de Dados</option>
                      <option value="Networking e Parceria">Networking & Troca de Ideias</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-zinc-300">
                      Mensagem / Detalhes da Proposta *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva brevemente o projeto, escopo da vaga ou necessidade técnica..."
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      id="submit-contact-form"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}</span>
                    </button>

                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={sendViaWhatsApp}
                        className="px-3 py-2 rounded-lg text-xs font-mono text-blue-400 hover:bg-blue-500/10 border border-blue-500/30 transition-colors"
                        title="Preencher no WhatsApp"
                      >
                        Enviar via WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={sendViaMailto}
                        className="px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Abrir no aplicativo de email"
                      >
                        Abrir no Email
                      </button>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
