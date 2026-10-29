import Head from "next/head";
import { useState } from "react";

const ABAS = ["Inicio", "Mídias", "Diretório"];

export default function Home() {
  const [aba, setAba] = useState(0);

  function aoTeclar(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const passo = e.key === "ArrowRight" ? 1 : -1;
    const proxima = (aba + passo + ABAS.length) % ABAS.length;
    setAba(proxima);
    document.getElementById(`aba-${proxima}`)?.focus();
  }

  return (
    <>
      <Head>
        <title>Monarquista | Uma história que atravessa gerações</title>
        <meta
          name="description"
          content="A trajetória dos monarquistas brasileiros desde 1889: instituições, iniciativas, divergências e reencontros."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/brasao.png"></link>
      </Head>

      <main className="page">
        <article className="texto">
          <div className="abas" role="tablist" onKeyDown={aoTeclar}>
            {ABAS.map((titulo, i) => (
              <button
                key={titulo}
                id={`aba-${i}`}
                role="tab"
                type="button"
                aria-selected={aba === i}
                aria-controls={`painel-${i}`}
                tabIndex={aba === i ? 0 : -1}
                className={aba === i ? "aba ativa" : "aba"}
                onClick={() => setAba(i)}
              >
                {titulo}
              </button>
            ))}
          </div>

          <img
            className="brasao"
            src="/brasao.png"
            alt="Brasão do Império do Brasil"
            width="784"
            height="1000"
          />

          <h1>Uma história que atravessa gerações</h1>

          <div
            id="painel-0"
            role="tabpanel"
            aria-labelledby="aba-0"
            hidden={aba !== 0}
          >

          <p>
            Em novembro de 1889, a queda do Império abriu um longo capítulo de
            reorganização para os monarquistas brasileiros. A Coroa deixava o
            governo, mas sua defesa continuaria nas páginas dos jornais, na
            correspondência do exílio, nas associações e nos livros. Desde
            então, diferentes gerações procuraram preservar uma memória e
            formular uma proposta política para o país. Essa história reúne
            instituições duradouras, iniciativas breves, divergências e
            reencontros: uma tradição que encontrou muitas maneiras de
            permanecer.
          </p>

          <p>
            Nos primeiros anos republicanos, o Visconde de Ouro Preto, João
            Alfredo, Joaquim Nabuco e Eduardo Prado figuraram entre os
            protagonistas dessa reorganização. O Partido Monarquista de São
            Paulo, constituído em 1895, o Diretório Monarquista do Rio de
            Janeiro e o Centro dos Estudantes Monarquistas de São Paulo deram
            expressão política, intelectual e estudantil à causa. O manifesto
            À Nação Brasileira, publicado em janeiro de 1896, pertence a esse
            esforço de apresentar ao Brasil as razões dos defensores da
            monarquia.
          </p>

          <p>
            No início do século XX, D. Luís de Orléans e Bragança procurou
            renovar esse horizonte. Seus manifestos de 1909 e 1913 discutiram
            os caminhos da organização nacional diante de uma sociedade em
            transformação. Em 1928, o Centro Monarquista de Cultura Social e
            Política Pátria Nova, liderado por Arlindo Veiga dos Santos,
            inaugurou a trajetória que daria origem à Ação Imperial
            Patrianovista Brasileira. Com orientação corporativa e antiliberal,
            o patrianovismo constituiu uma vertente própria, que precisa ser
            compreendida em seu contexto. A memória do movimento registra
            também a Ação Monarquista Brasileira e a militância de Sebastião
            Pagano.
          </p>

          <p>
            Outras iniciativas atravessaram as décadas seguintes. A União
            Nacional dos Universitários Monarquistas, organizada por Otto de
            Alencar Sá Pereira, levou a discussão ao ambiente estudantil. Mais
            tarde, o Instituto Brasileiro de Estudos Monárquicos — IBEM, ao qual
            Fernando Baptista Bolzoni se vinculou desde jovem, e o Instituto
            Brasileiro de Pesquisas Monárquicas — IBRAPEM contribuíram para os
            estudos e para a articulação de diferentes posições monarquistas.
            Debatiam-se a sucessão dinástica, a organização do Estado e as
            possibilidades de apresentar essas ideias à sociedade.
          </p>

          <p>
            A redemocratização ampliou esse espaço. O Movimento Parlamentarista
            Monárquico, articulado por Cunha Bueno, participou da mobilização
            que desembocou no plebiscito de 21 de abril de 1993. O Círculo
            Monárquico do Rio de Janeiro e a Pró Monarquia também passaram a
            integrar esse cenário de participação pública. Mais de seis milhões
            de brasileiros escolheram a monarquia naquela consulta. A República
            e o presidencialismo venceram; aos monarquistas coube reconhecer a
            decisão popular e continuar defendendo suas convicções pelos
            caminhos do debate democrático.
          </p>

          <p>
            Após o plebiscito em 1993, o Instituto Brasil Imperial reuniu
            participantes de diferentes grupos e preservou espaços de
            convivência, divulgação e produção cultural. A Confederação
            Monárquica do Brasil — CONFEMBRAS, a Causa Imperial, o Círculo
            Monárquico do Brasil e Círculos Monárquicos locais, como os do Rio
            de Janeiro, de Minas Gerais e de Alagoas, compõem outros capítulos
            dessa trajetória. São organizações com percursos, dimensões e
            orientações próprios, cuja história merece ser registrada sem
            apagar suas diferenças ou presumir uma direção única.
          </p>

          <p>
            É nesse percurso que se insere a atuação contemporânea de Carlos
            Egert, escritor, autor de dois livros sobre a temática monárquica
            (O Guia do Monarquista vol.1 e Terceiro Reinado pela editora Filos)
            e presidente do Diretório Monárquico do Brasil. Seu trabalho de
            reorganização do Diretório se soma às iniciativas de gerações
            anteriores. Ao lado do Ativismo Monarquista Brasileiro, de círculos
            de diversas cidades, de grupos independentes e de outros autores,
            essa atuação procura aproximar a produção intelectual da
            participação cívica.
          </p>

          <p>
            O movimento monarquista se mantém firme e retorna para dar espaço a
            essa pluralidade. Queremos preservar documentos, apresentar livros,
            ouvir pesquisadores, divulgar encontros e tornar conhecidas as
            pessoas que trabalham pela causa em suas comunidades. Este é um
            registro aberto: cada grupo poderá acrescentar sua trajetória, seus
            acervos e suas contribuições, ajudando a construir uma memória mais
            completa do movimento brasileiro.
          </p>

          <p>
            Defender a monarquia constitucional parlamentar no presente exige
            conhecer essa herança e responder às perguntas do nosso tempo: como
            limitar o poder, assegurar a representação popular, proteger
            direitos e organizar governos responsáveis perante o Parlamento. É a
            esse trabalho de estudo, diálogo e participação que convidamos
            nossos leitores.
          </p>

          <blockquote>
            Uma causa atravessa o tempo quando cada geração recebe a memória com
            cuidado e acrescenta a ela o próprio trabalho.
          </blockquote>

          </div>

          {ABAS.slice(1).map((_, k) => (
            <div
              key={k + 1}
              id={`painel-${k + 1}`}
              role="tabpanel"
              aria-labelledby={`aba-${k + 1}`}
              hidden={aba !== k + 1}
            >
              <p className="vazio">Conteúdo em breve.</p>
            </div>
          ))}

          <footer>
            <p>
              Para apresentar seu círculo, divulgar uma obra, compartilhar
              documentos ou conhecer formas de participação:
            </p>
            <p>
              <a href="mailto:contato@monarquista.com">
                contato@monarquista.com
              </a>
            </p>
          </footer>
        </article>
      </main>

      <style jsx global>{`
        :root {
          --fundo: #f2f4ef;
          --texto: #1d2a23;
          --verde: #1f4d3a;
          --ouro: #b08a2e;
          --suave: #55645b;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --fundo: #14201a;
            --texto: #e6ebe4;
            --verde: #8fc3a5;
            --ouro: #d3b25a;
            --suave: #a3b2a8;
          }
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          background: var(--fundo);
        }

        body {
          margin: 0;
          color: var(--texto);
          background: var(--fundo);
          font-family: "Iowan Old Style", "Palatino Linotype", Palatino,
            "Book Antiqua", Georgia, serif;
          font-size: 1rem; /* era 1.125rem */
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }

        .page {
          padding: 4rem 1.5rem 5rem;
        }

        .texto {
          max-width: 44rem;
          margin: 0 auto;
          padding: 3rem 2.5rem;
          border: 2px solid var(--ouro); /* borda dourada */
          outline: 1px solid var(--ouro); /* filete externo, moldura dupla */
          outline-offset: 6px;
        }

        .brasao {
          display: block;
          width: 100%;
          max-width: 11rem;
          height: auto;
          margin: 0 auto 2.5rem;
        }

        h1 {
          margin: 0 0 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 3px solid var(--ouro);
          color: var(--verde);
          font-size: clamp(2.5rem, 8vw, 4.25rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .abas {
          display: flex;
          gap: 0.25rem;
          margin: 0 0 2rem;
          border-bottom: 1px solid var(--suave);
          overflow-x: auto;
        }

        .aba {
          flex: 0 0 auto;
          padding: 0.75rem 1.25rem;
          border: 0;
          border-bottom: 3px solid transparent;
          margin-bottom: -1px;
          background: none;
          color: var(--suave);
          font: inherit;
          font-size: 1rem;
          cursor: pointer;
        }

        .aba:hover {
          color: var(--verde);
        }

        .aba.ativa {
          color: var(--verde);
          font-weight: 700;
          border-bottom-color: var(--ouro);
        }

        .aba:focus-visible {
          outline: 3px solid var(--ouro);
          outline-offset: -3px;
        }

        .vazio {
          color: var(--suave);
          font-style: italic;
        }

        [hidden] {
          display: none !important;
        }

        p {
          margin: 0 0 1.4rem;
          hyphens: auto;
        }

        blockquote {
          margin: 3rem 0;
          padding: 0 0 0 1.5rem;
          border-left: 3px solid var(--ouro);
          color: var(--verde);
          font-size: 1.3rem; /* era 1.5rem */
          font-style: italic;
          line-height: 1.45;
        }

        footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--suave);
          color: var(--suave);
        }

        footer p:last-child {
          margin-bottom: 0;
        }

        a {
          color: var(--verde);
          font-weight: 700;
          text-underline-offset: 0.2em;
        }

        a:focus-visible {
          outline: 3px solid var(--ouro);
          outline-offset: 3px;
        }

        @media (max-width: 480px) {
          body {
            font-size: 0.9375rem; /* era 1.0625rem */
          }
          .page {
            padding: 2rem 1.25rem;
          }
          .texto {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
