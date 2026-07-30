import Image from "next/image";
import { BetaSignupForm } from "./beta-signup-form";

const journey = [
  {
    number: "01",
    title: "Seu currículo, do seu jeito",
    text: "Comece do zero com perguntas simples ou importe seu currículo. A Easy Job organiza sua história em modelos profissionais.",
    label: "Criar ou importar CV",
  },
  {
    number: "02",
    title: "Oportunidades na mira",
    text: "Diga que tipo de trabalho procura. A plataforma reúne vagas, empresas e canais de contato em uma lista só sua.",
    label: "Mapear vagas e empresas",
  },
  {
    number: "03",
    title: "E-mails prontos para revisar",
    text: "Prepare apresentações adequadas a cada oportunidade, escolha os contatos e confira tudo antes de começar a campanha.",
    label: "Preparar campanha de e-mail",
  },
  {
    number: "04",
    title: "WhatsApp sem mensagem genérica",
    text: "Monte abordagens objetivas para os contatos certos e acompanhe o que está pronto, enviado ou aguardando resposta.",
    label: "Preparar campanha de WhatsApp",
  },
];

const faqs = [
  {
    question: "A Easy Job já está funcionando?",
    answer:
      "Ainda não. Estamos construindo a primeira versão e esta página existe para formar um grupo pequeno de pessoas que vai testar o produto antes do lançamento.",
  },
  {
    question: "Preciso já ter um currículo?",
    answer:
      "Não. A proposta é justamente permitir que você comece sem nada pronto. Se já tiver um currículo, também poderá importá-lo para ganhar tempo.",
  },
  {
    question: "A Easy Job envia mensagens sozinha?",
    answer:
      "Não sem a sua revisão. A visão do produto é trabalhar com campanhas assistidas: você escolhe as oportunidades, confere os contatos e aprova a lista antes dos envios.",
  },
  {
    question: "A plataforma garante uma contratação?",
    answer:
      "Não. Nenhuma ferramenta pode garantir uma vaga. A Easy Job quer melhorar sua preparação, dar direção à busca e facilitar ações que hoje ficam espalhadas em vários lugares.",
  },
  {
    question: "Como vou saber se fui escolhido para o beta?",
    answer:
      "Os convites e as novidades desta primeira etapa serão enviados somente pelo WhatsApp informado no cadastro.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container nav-shell">
          <a className="wordmark" href="#inicio" aria-label="Easy Job, início">
            <span className="wordmark-lines" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>Easy Job</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#por-dentro">Por dentro</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="button button-small header-cta" href="#beta">
            Quero testar
          </a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Entre <span className="marker">sem nada.</span>
              <br />
              Saia com sua busca de emprego pronta.
            </h1>
            <p className="hero-text">
              Crie ou importe seu currículo, encontre vagas e empresas, prepare
              seus contatos e acompanhe cada tentativa — tudo guiado pelo
              celular.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#beta">
                Quero testar a Easy Job
                <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#como-funciona">
                Ver como funciona <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="trust-note">
              <span aria-hidden="true">✓</span>
              Você revisa tudo antes de qualquer campanha.
            </p>
          </div>

          <div className="hero-preview" aria-label="Demonstração conceitual da jornada Easy Job">
            <div className="paper-tag tag-one" aria-hidden="true">
              tudo em um lugar
            </div>
            <div className="plan-card">
              <div className="plan-topline">
                <span>Seu plano de busca</span>
              </div>
              <div className="mascot-guide">
                <Image
                  src="/easy-job-fox-mascot.png"
                  alt="Mascote da Easy Job: uma raposa tomando café"
                  width={1254}
                  height={1254}
                  priority
                  unoptimized
                  sizes="(max-width: 480px) 92px, 108px"
                />
                <div>
                  <small>Seu guia Easy Job</small>
                  <strong>Um passo de cada vez.</strong>
                  <span>Sempre com o próximo passo à vista.</span>
                </div>
              </div>
              <div className="plan-progress">
                <div>
                  <strong>3 de 4</strong>
                  <span>etapas preparadas</span>
                </div>
                <span className="progress-value">75%</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <span />
              </div>
              <ol className="plan-list">
                <li className="done">
                  <span className="check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Currículo</strong>
                    <small>Modelo Essencial pronto</small>
                  </div>
                  <b>feito</b>
                </li>
                <li className="done">
                  <span className="check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Empresas</strong>
                    <small>12 oportunidades salvas</small>
                  </div>
                  <b>feito</b>
                </li>
                <li className="done">
                  <span className="check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Mensagens</strong>
                    <small>5 aguardam sua revisão</small>
                  </div>
                  <b>feito</b>
                </li>
                <li>
                  <span className="check pending" aria-hidden="true">4</span>
                  <div>
                    <strong>Campanha</strong>
                    <small>Você decide quando começar</small>
                  </div>
                  <b className="pending-text">próximo</b>
                </li>
              </ol>
            </div>
            <div className="paper-tag tag-two" aria-hidden="true">
              você no controle
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <div className="container problem-grid">
          <p className="section-kicker">O problema de hoje</p>
          <div>
            <h2>
              Procurar emprego já dá trabalho.
              <br />
              Montar o processo <em>não deveria.</em>
            </h2>
            <div className="scattered-list" aria-label="Dificuldades comuns ao procurar emprego">
              <span>currículo desatualizado</span>
              <span>vagas em várias abas</span>
              <span>planilha abandonada</span>
              <span>sem saber o que escrever</span>
            </div>
            <p className="problem-summary">
              A Easy Job nasce para juntar os pedaços e mostrar o próximo passo,
              sem exigir que você já saiba por onde começar.
            </p>
          </div>
        </div>
      </section>

      <section className="journey-section" id="como-funciona">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Do zero ao envio</p>
              <h2>Uma busca guiada, etapa por etapa.</h2>
            </div>
            <p>
              Quatro ferramentas conectadas para você parar de improvisar e
              começar a avançar.
            </p>
          </div>

          <ol className="journey-grid">
            {journey.map((item) => (
              <li className="journey-card" key={item.number}>
                <div className="journey-number" aria-hidden="true">
                  {item.number}
                </div>
                <div className="journey-icon" aria-hidden="true">
                  <span>{item.number === "01" ? "CV" : item.number === "02" ? "⌖" : item.number === "03" ? "@" : "···"}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="journey-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="inside-section" id="por-dentro">
        <div className="container inside-grid">
          <div className="inside-copy">
            <p className="section-kicker light">Por dentro da ideia</p>
            <h2>Menos abas abertas. Mais clareza para agir.</h2>
            <p>
              O futuro aplicativo será sua central pessoal de candidaturas:
              simples no celular, organizado por prioridade e sempre deixando a
              decisão final com você.
            </p>

            <ul className="benefit-list">
              <li>
                <span aria-hidden="true">01</span>
                Um perfil que alimenta currículo e mensagens
              </li>
              <li>
                <span aria-hidden="true">02</span>
                Uma lista única para vagas, empresas e contatos
              </li>
              <li>
                <span aria-hidden="true">03</span>
                Histórico para saber onde você já tentou
              </li>
            </ul>
          </div>

          <div className="phone-wrap">
            <div className="phone" aria-label="Exemplo visual do futuro painel da Easy Job">
              <div className="phone-bar">
                <span>9:41</span>
                <span aria-hidden="true">● ●</span>
              </div>
              <div className="phone-content">
                <div className="phone-greeting">
                  <div>
                    <small>Seu plano de busca</small>
                    <strong>Bom dia, Ana.</strong>
                  </div>
                  <span className="avatar" aria-hidden="true">A</span>
                </div>
                <div className="next-action">
                  <small>PRÓXIMA AÇÃO</small>
                  <strong>Revise 5 contatos antes de começar</strong>
                  <div className="next-action-row">
                    <span>Campanha: Assistente administrativo</span>
                    <b aria-hidden="true">→</b>
                  </div>
                </div>
                <div className="mini-stats">
                  <div>
                    <small>Currículo</small>
                    <strong>78%</strong>
                    <span className="mini-line"><i /></span>
                  </div>
                  <div>
                    <small>Empresas</small>
                    <strong>12</strong>
                    <span>na sua lista</span>
                  </div>
                </div>
                <div className="phone-section-title">
                  <strong>Suas oportunidades</strong>
                  <span>ver todas</span>
                </div>
                <div className="opportunity-card">
                  <span className="company-mark">M</span>
                  <div>
                    <strong>Assistente administrativo</strong>
                    <small>Empresa Modelo • Recife, PE</small>
                    <span>Contato encontrado</span>
                  </div>
                  <b aria-hidden="true">›</b>
                </div>
                <div className="opportunity-card">
                  <span className="company-mark alt">P</span>
                  <div>
                    <strong>Auxiliar de escritório</strong>
                    <small>Projeto Exemplo • Olinda, PE</small>
                    <span className="waiting">Aguardando revisão</span>
                  </div>
                  <b aria-hidden="true">›</b>
                </div>
              </div>
              <div className="phone-home" aria-hidden="true" />
            </div>
            <span className="example-stamp">DADOS ILUSTRATIVOS</span>
          </div>
        </div>
      </section>

      <section className="control-section">
        <div className="container control-grid">
          <div className="control-card">
            <div className="control-card-head">
              <span>Campanha #01</span>
              <span className="review-status">aguardando revisão</span>
            </div>
            <h3>Assistente administrativo</h3>
            <p>5 contatos selecionados</p>
            <div className="channel-row">
              <span><b>@</b> 3 por e-mail</span>
              <span><b>···</b> 2 por WhatsApp</span>
            </div>
            <div className="message-preview">
              <small>PRÉVIA DA MENSAGEM</small>
              <p>
                Olá, tudo bem? Meu nome é Ana e estou buscando uma oportunidade
                na área administrativa...
              </p>
            </div>
            <div className="fake-button" aria-hidden="true">
              Revisar antes de começar
              <span>→</span>
            </div>
          </div>

          <div className="control-copy">
            <p className="section-kicker">Campanhas assistidas</p>
            <h2>Automação com freio, contexto e sua aprovação.</h2>
            <p>
              A Easy Job não foi pensada para jogar o mesmo currículo em todo
              lugar. Ela ajuda a preparar uma lista coerente, adaptar a
              apresentação e deixar você conferir antes de qualquer envio.
            </p>
            <ul>
              <li><span aria-hidden="true">✓</span> Escolha quais empresas fazem sentido</li>
              <li><span aria-hidden="true">✓</span> Revise cada contato e cada mensagem</li>
              <li><span aria-hidden="true">✓</span> Acompanhe o que aconteceu depois</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="beta-section" id="beta">
        <div className="container beta-grid">
          <div className="beta-copy">
            <p className="section-kicker">Primeira turma</p>
            <h2>Ajude a construir a Easy Job desde o começo.</h2>
            <p>
              Estamos formando um grupo pequeno para testar a primeira versão e
              contar o que realmente ajuda — ou atrapalha — na hora de procurar
              emprego.
            </p>
            <div className="beta-note">
              <span aria-hidden="true">!</span>
              <p>
                <strong>É um beta fechado.</strong>
                Entrar na lista não garante acesso imediato. O convite será
                enviado pelo WhatsApp.
              </p>
            </div>
          </div>

          <BetaSignupForm />
        </div>
      </section>

      <section className="faq-section" id="duvidas">
        <div className="container faq-grid">
          <div>
            <p className="section-kicker">Sem letra miúda</p>
            <h2>Perguntas honestas, respostas diretas.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="wordmark footer-mark" href="#inicio">
              <span className="wordmark-lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Easy Job</span>
            </a>
            <p>Uma busca de emprego mais guiada, organizada e humana.</p>
          </div>
        </div>
      </footer>

      <div className="mobile-sticky">
        <a className="button button-primary" href="#beta">
          Quero entrar no beta <span aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}
