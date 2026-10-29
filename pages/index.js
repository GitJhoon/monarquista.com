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
        <link rel="icon" type="image/png" href="/brasao.png" />
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

          <div
            id="painel-0"
            role="tabpanel"
            aria-labelledby="aba-0"
            hidden={aba !== 0}
          >
            <img
              className="brasao"
              src="/brasao.png"
              alt="Brasão do Império do Brasil"
              width="784"
              height="1000"
            />

            <h1>Uma história que atravessa gerações</h1>

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
              Patrianovista Brasileira. Com orientação corporativa e
              antiliberal, o patrianovismo constituiu uma vertente própria, que
              precisa ser compreendida em seu contexto. A memória do movimento
              registra também a Ação Monarquista Brasileira e a militância de
              Sebastião Pagano.
            </p>

            <p>
              Outras iniciativas atravessaram as décadas seguintes. A União
              Nacional dos Universitários Monarquistas, organizada por Otto de
              Alencar Sá Pereira, levou a discussão ao ambiente estudantil. Mais
              tarde, o Instituto Brasileiro de Estudos Monárquicos — IBEM, ao
              qual Fernando Baptista Bolzoni se vinculou desde jovem, e o
              Instituto Brasileiro de Pesquisas Monárquicas — IBRAPEM
              contribuíram para os estudos e para a articulação de diferentes
              posições monarquistas. Debatiam-se a sucessão dinástica, a
              organização do Estado e as possibilidades de apresentar essas
              ideias à sociedade.
            </p>

            <p>
              A redemocratização ampliou esse espaço. O Movimento
              Parlamentarista Monárquico, articulado por Cunha Bueno,
              participou da mobilização que desembocou no plebiscito de 21 de
              abril de 1993. O Círculo Monárquico do Rio de Janeiro e a Pró
              Monarquia também passaram a integrar esse cenário de participação
              pública. Mais de seis milhões de brasileiros escolheram a
              monarquia naquela consulta. A República e o presidencialismo
              venceram; aos monarquistas coube reconhecer a decisão popular e
              continuar defendendo suas convicções pelos caminhos do debate
              democrático.
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
              (O Guia do Monarquista vol.1 e Terceiro Reinado pela editora
              Filos) e presidente do Diretório Monárquico do Brasil. Seu
              trabalho de reorganização do Diretório se soma às iniciativas de
              gerações anteriores. Ao lado do Ativismo Monarquista Brasileiro,
              de círculos de diversas cidades, de grupos independentes e de
              outros autores, essa atuação procura aproximar a produção
              intelectual da participação cívica.
            </p>

            <p>
              O movimento monarquista se mantém firme e retorna para dar espaço
              a essa pluralidade. Queremos preservar documentos, apresentar
              livros, ouvir pesquisadores, divulgar encontros e tornar
              conhecidas as pessoas que trabalham pela causa em suas
              comunidades. Este é um registro aberto: cada grupo poderá
              acrescentar sua trajetória, seus acervos e suas contribuições,
              ajudando a construir uma memória mais completa do movimento
              brasileiro.
            </p>

            <p>
              Defender a monarquia constitucional parlamentar no presente exige
              conhecer essa herança e responder às perguntas do nosso tempo:
              como limitar o poder, assegurar a representação popular, proteger
              direitos e organizar governos responsáveis perante o Parlamento. É
              a esse trabalho de estudo, diálogo e participação que convidamos
              nossos leitores.
            </p>

            <blockquote>
              Uma causa atravessa o tempo quando cada geração recebe a memória
              com cuidado e acrescenta a ela o próprio trabalho.
            </blockquote>
          </div>

          <div
            id="painel-2"
            role="tabpanel"
            aria-labelledby="aba-2"
            hidden={aba !== 2}
          >
            <h1>A COROA RESISTE: O DIRETÓRIO MONARQUISTA</h1>

            <figure className="retrato">
              <img
                className="foto"
                src="/Visconde-de-Ouro-Preto.jpeg"
                alt="Visconde de Ouro Preto, fundador do Diretório Monárquico do Brasil"
                width="3000"
                height="3000"
              />
              <figcaption>
                Visconde de Ouro Preto, fundador do Diretório Monárquico do
                Brasil
              </figcaption>
            </figure>

            <figure className="retrato">
              <img
                className="foto"
                src="/João-Alfredo-Correia-De-Oliveira.jpeg"
                alt="João Alfredo Correia de Oliveira"
              />
              <figcaption>João Alfredo Correia de Oliveira</figcaption>
            </figure>

            <figure className="retrato">
              <img
                className="foto"
                src="/Carlos-De-Laet.jpeg"
                alt="Carlos de Laet, membro do Diretório Monárquico e jornalista da causa restauradora"
              />
              <figcaption>
                Carlos de Laet, membro do Diretório Monárquico e jornalista da
                causa restauradora
              </figcaption>
            </figure>

            <p>Em 15 de outubro de 1896, monarquistas reunidos em São Paulo para celebrar os vinte e um anos de Pedro de Alcântara, primogênito da princesa Isabel, enviaram um telegrama ao Rio de Janeiro. O destino era a redação do jornal Liberdade, à Rua da Assembleia, número 119. Os destinatários apareciam pelos nomes com que a vida pública os tornara conhecidos: Ouro Preto, João Alfredo, Andrade Figueira, Lafayette e Carlos Afonso. A mensagem saudava-os como chefes monarquistas e lhes manifestava solidariedade. A resposta, publicada no dia seguinte, trazia uma assinatura coletiva: o Diretório. [1]</p>

            <p>Nesse pequeno intercâmbio encontra-se uma imagem concreta da organização. Havia dirigentes reconhecidos, um endereço de contato e correligionários em outra unidade da Federação. A Monarquia perdera suas instituições de governo, mas parte dos homens que a haviam servido continuava a procurar meios de intervir nos destinos do país. A redação de um jornal tornava-se um dos lugares dessa permanência.</p>

            <p>O núcleo carioca reunia uma experiência política pouco comum. Afonso Celso de Assis Figueiredo, o Visconde de Ouro Preto, fora o último presidente do Conselho de Ministros do Império. Seu gabinete terminara com a deposição de Pedro II, em 15 de novembro de 1889. Preso e enviado ao exterior, regressara ao Brasil em 1891, conservando suas convicções. O retorno não o restituía à posição perdida; colocava-o diante do problema de exercer influência sem dispor dos instrumentos de governo que conhecera. [3,10]</p>

            <p>João Alfredo Corrêa de Oliveira trazia ao grupo o prestígio de outro antigo chefe de gabinete. Ministro do Império entre 1870 e 1875, presidira as províncias do Pará e de São Paulo e dirigira a Faculdade de Direito do Recife. À frente do Conselho de Ministros em 1888, participara, ao lado de Isabel, da aprovação e sanção da Lei Áurea, em 13 de maio. Sua presença vinculava a organização à memória de um dos atos mais decisivos do regime deposto. [11]</p>

            <p>Lafayette Rodrigues Pereira, advogado, jornalista e senador por Minas Gerais, também conhecera a chefia do governo: presidira o gabinete iniciado em 24 de maio de 1883, encerrado em junho de 1884. Fora ministro da Justiça e presidente das províncias do Ceará e do Maranhão. Sua trajetória jurídica incluía uma ligação anterior com outro integrante do grupo: no Rio, associara-se profissionalmente a Domingos de Andrade Figueira. [12]</p>

            <p>Andrade Figueira era advogado, antigo deputado provincial e deputado geral pelo Rio de Janeiro em sucessivas legislaturas. Presidira a Câmara dos Deputados de 5 de maio de 1886 a 4 de maio de 1887 e integrara o Conselho de Estado nos últimos anos do Império. Carlos Afonso de Assis Figueiredo, irmão de Ouro Preto, fora ministro da Guerra entre 3 de julho de 1882 e 24 de maio de 1883. O Diretório reunia, portanto, homens que haviam participado do Executivo, do Parlamento e da consulta superior da Coroa. [13–15]</p>

            <p>Essa experiência não lhes assegurava concordância. A aproximação exigia construir uma ação comum entre personalidades formadas em disputas do próprio regime imperial. O desaparecimento das instituições que haviam servido criava uma condição compartilhada, mas não apagava diferenças de temperamento, de percurso ou de estratégia.</p>

            <p>A articulação ganhou expressão pública em janeiro de 1896. Uma carta datada do dia 2 saudava os monarquistas de São Paulo; em 12 de janeiro, o Jornal do Commercio publicava o manifesto “À Nação Brasileira”. Os documentos permitem acompanhar a apresentação de um centro político constituído na capital, embora o ato preciso de sua fundação ainda não esteja esclarecido. O manifesto identificava os cinco dirigentes que voltariam a aparecer no telegrama de outubro. [2–4]</p>

            <p>Sua declaração pública de propósitos era significativa. Os signatários reivindicavam uma discussão ampla dos interesses brasileiros, dentro da lei, e solicitavam a colaboração de pessoas e organizações locais. Permaneciam monarquistas e pretendiam participar do debate nacional nessa condição. A autoridade conquistada no Império precisava encontrar uma nova forma de atuação: convencer leitores, responder aos adversários, reunir apoios. [3]</p>

            <p>Na aproximação com os paulistas aparecem igualmente Joaquim Nabuco e Carlos de Laet. Este último, professor, jornalista e escritor, representava uma das forças intelectuais dessa mobilização. Sua participação na iniciativa que deu origem ao Liberdade, cujo primeiro número circulou em 4 de maio de 1896, ajuda a definir sua contribuição: a organização da palavra pública e da argumentação monarquista. Os documentos reunidos não permitem, por enquanto, atribuir-lhe um cargo estatutário específico no Diretório. [4,16]</p>

            <p>O jornal oferecia à causa uma presença regular na vida da capital. Para que essa presença existisse, porém, era necessário sustentar oficinas, administração e trabalho editorial. Nesse terreno destaca-se Gentil José de Castro. O relato contemporâneo de Afonso Celso Júnior descreve sua dedicação financeira e administrativa à imprensa monarquista, em associação com os esforços de Ouro Preto. Gentil permite enxergar a dimensão material da militância: uma convicção precisava tornar-se uma publicação que pudesse continuar a circular. [3]</p>

            <p>A atividade produzia aproximações e conflitos. Em 5 de abril de 1896, A Republica, de Curitiba, reproduziu uma notícia sobre divergências no diretório carioca, atribuindo a Laet preferência por uma campanha de propaganda. O texto veiculava também rumores políticos que exigem confirmação independente. Ainda assim, registra que a discussão sobre os meios de atuação já atravessava a imagem pública da organização. [5]</p>

            <p>Em Minas Gerais, a controvérsia alcançou as câmaras municipais. O jornal oficial do estado publicou manifestações republicanas contra o manifesto e contra a adesão da Câmara de Ouro Preto. Um protesto de Grão Mogol, datado de 15 de fevereiro de 1896, censurava essa aproximação com os antigos estadistas. A iniciativa carioca encontrava ecos fora de seu círculo imediato, suscitando respostas que também revelam a inquietação de seus adversários. [6]</p>

            <p>A ruptura mais violenta veio em março de 1897. Após a notícia do desastre da expedição de Moreira César em Canudos, a agitação republicana voltou-se contra os monarquistas, acusados de ligação com os sertanejos. Em 7 de março, estabelecimentos da imprensa monarquista foram invadidos e destruídos no Rio. A violência atingia o instrumento pelo qual aqueles homens procuravam participar da vida pública. [4]</p>

            <p>No dia seguinte, Gentil de Castro foi assassinado durante um ataque em que também se encontravam Ouro Preto e seu filho, Afonso Celso Júnior. Este publicaria, ainda em 1897, em Paris, O assassinato do coronel Gentil José de Castro. O livro preservou a versão de uma testemunha e participante, cuja proximidade com os envolvidos deve orientar sua leitura crítica. A perda de Gentil e a destruição dos jornais impuseram um custo humano e material profundo à mobilização. [3]</p>

            <p>A trajetória do Diretório, entretanto, não pode ser encerrada por presunção naquele episódio. Sua relação posterior com a família imperial reaparece na bibliografia: em 9 de novembro de 1908, Isabel teria encaminhado ao Diretório, no Rio, uma das vias da renúncia de Pedro de Alcântara. A referência, ainda dependente da conferência do original, aponta para a continuidade de uma interlocução dinástica depois da crise da imprensa. [7]</p>

            <p>Essa dimensão também deixou vestígios arquivísticos. O IHGB descreve, no fundo Visconde de Ouro Preto, dezoito documentos de correspondência entre membros do Diretório. Uma descrição de 1968 do Arquivo João Alfredo menciona papéis sobre a renúncia do Príncipe do Grão-Pará e planos de restauração. Esses registros identificam caminhos para esclarecer a vida interna da organização; seus conteúdos ainda não foram examinados nesta pesquisa. [8,9]</p>

            <p>A biografia do Diretório encontra seu interesse histórico nessa passagem difícil entre a experiência do governo e a construção de uma oposição. Seus integrantes possuíam nomes conhecidos e extensas relações, mas precisavam convertê-los em ação coletiva sob circunstâncias novas. Organizar um jornal, responder a um telegrama, subscrever um manifesto e manter correspondência eram maneiras de dar consequência política à fidelidade que professavam.</p>

            <p>A assinatura coletiva de outubro de 1896 permite vê-los nesse esforço. Homens com trajetórias próprias apresentavam-se sob um mesmo nome, procurando conservar uma voz na discussão sobre o Brasil. A história do Diretório está naquilo que conseguiram fazer juntos, nos desacordos que os limitaram e no preço que alguns pagaram para continuar a falar.</p>

            <p>Já no século XXI, a memória dessa experiência inspirou o escritor, jurista e jornalista Carlos Egert a refundar o Diretório, ao lado do ativista monárquico Patrick Luiz da Silva Santos. A iniciativa contemporânea assume o compromisso de aproximar novas gerações do pensamento monárquico e de preservar o legado político e cultural de seus antigos defensores. Ao reunir pesquisa histórica, palavra pública e organização, essa refundação procura dar expressão atual à convicção que animara os primeiros dirigentes: a de que uma ideia de Brasil permanece viva enquanto encontra quem a estude, a discuta e se disponha a defendê-la. O Diretório atual busca reunir acervos de época além de cartas e artefatos do Brasil Império buscando reacender o legado deixado no século XIX.</p>

            <p>────────</p>

            <p>Fontes e notas desta revisão</p>

            <p>1. Liberdade, 16/10/1896, p. 2, “Os monarchistas de S. Paulo”. Texto extraído consultado; conferência visual pendente. https://hemeroteca-pdf.bn.gov.br/382760/per382760_1896_00166.pdf</p>

            <p>2. Gazeta da Tarde, 13/1/1896. Material político e carta datada de 2/1/1896. Texto localizado; conferência visual pendente. https://hemeroteca-pdf.bn.gov.br/226688/per226688_1896_00013.pdf</p>

            <p>3. CELSO, Afonso. O assassinato do coronel Gentil José de Castro. Paris, 1897. Trechos consultados, especialmente capítulo VIII e narrativa do atentado. https://digital.bbm.usp.br/bitstream/bbm/4118/1/005573_COMPLETO.pdf</p>

            <p>4. GOMES, Amanda Muzzi. “Monarquistas restauradores e jacobinos: ativismo político”. Estudos Históricos, 21(42), 2008. https://www.scielo.br/j/eh/a/hCcKyV6kr3jkBnwNpNPfyfN/?lang=pt</p>

            <p>5. A Republica, Curitiba, 5/4/1896, p. 2. https://hemeroteca-pdf.bn.gov.br/215554/per215554_1896_00080.pdf</p>

            <p>6. Minas Geraes, exemplar digital 1896_00085, p. 3 do PDF. Data do exemplar ainda a fechar. https://hemeroteca-pdf.bn.gov.br/291536/per291536_1896_00085.pdf</p>

            <p>7. NÉMETH-TORRES, Geovani. “A odisséia monarquista no Plebiscito Nacional de 1993”, nota 36, com referência a Hermes Vieira, Princesa Isabel — uma vida de luzes e sombras, 1990, p. 225. https://periodicos.ufba.br/index.php/rvh/article/download/48927/26585</p>

            <p>8. IHGB. BR RJIHGB 039-06-DL 427.19. Descrição consultada; manuscritos não examinados. https://atom.ihgb.org.br/atom/index.php/diretorio-monarquista-correspondencia-entre-os-membros-do-diretorio-monarquista</p>

            <p>9. RODRIGUES, José Honório. A pesquisa histórica no Brasil, anexo 4, descrição do Arquivo João Alfredo preparada em 1968. https://bdor.sibi.ufrj.br/bitstream/doc/468/1/GF%2020%20PDF%20-%20OCR%20-%20RED.pdf</p>

            <p>10. Arquivo Nacional/MAPA. Biografia do Visconde de Ouro Preto; abertura integral bloqueada, trecho recuperado em busca. https://mapa.an.gov.br/index.php/assuntos/79-producao/70-biografias/856-afonso-celso-de-assis-figueiredo-visconde-de-ouro-preto</p>

            <p>11. Fundação Joaquim Nabuco. “João Alfredo”. https://pesquisaescolar.fundaj.gov.br/pt-br/artigo/joao-alfredo/</p>

            <p>12. Senado Federal. Perfil de Lafayette Rodrigues Pereira. https://www25.senado.leg.br/web/senadores/senador/-/perfil/2004</p>

            <p>13. Câmara dos Deputados. Biografia de Andrade Figueira. https://www.camara.leg.br/deputados/988/biografia</p>

            <p>14. Senado Federal. Registro de Domingos de Andrade Figueira; informação sobre Conselho de Estado recuperada em busca. https://atom.senado.leg.br/index.php/domingos-de-andrade-figueira</p>

            <p>15. Arquivo Nacional. Caderno MAPA n. 6, quadro de titulares da Guerra; datas recuperadas em busca. https://mapa.an.gov.br/images/publicacoes/CadernoMAPA6/files/assets/basic-html/page-160.html</p>

            <p>16. Academia Brasileira de Letras. Biografia de Carlos de Laet. https://www2.academia.org.br/academicos/carlos-de-laet/biografia</p>
          </div>

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
          font-size: 1rem;
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
          border: 2px solid var(--ouro);
          outline: 1px solid var(--ouro);
          outline-offset: 6px;
        }

        .brasao {
          display: block;
          width: 100%;
          max-width: 11rem;
          height: auto;
          margin: 0 auto 2.5rem;
        }

        .retrato {
          margin: 0 0 2.5rem;
          text-align: center;
        }

        /* Sem aspect-ratio e sem "cover": a foto aparece inteira,
           na proporção original, qualquer que seja o formato. */
        .foto {
          display: block;
          width: 100%;
          max-width: 30rem;
          height: auto;
          max-height: 36rem;
          object-fit: contain;
          margin: 0 auto;
          padding: 0.5rem;
          border: 2px solid var(--ouro);
          background: var(--fundo);
        }

        .retrato figcaption {
          margin-top: 0.75rem;
          color: var(--suave);
          font-size: 0.95rem;
          font-style: italic;
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
          overflow-wrap: anywhere;
        }

        blockquote {
          margin: 3rem 0;
          padding: 0 0 0 1.5rem;
          border-left: 3px solid var(--ouro);
          color: var(--verde);
          font-size: 1.3rem;
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
            font-size: 0.9375rem;
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