import Head from "next/head";
import { useState } from "react";

const ABAS = ["Início", "Diretório", "Fundadores", "Mídias", "Quem somos"];

// Notícias da aba Diretório. Para adicionar outra, inclua um item aqui
// e escreva o texto dela no bloco "noticia === ..." mais abaixo.
const NOTICIAS = [
  {
    id: "coroa-resiste",
    titulo: "A Coroa resiste: o Diretório Monarquista",
    resumo:
      "Em 15 de outubro de 1896, monarquistas reunidos em São Paulo enviaram um telegrama ao Rio de Janeiro. A resposta trazia uma assinatura coletiva: o Diretório.",
  },
  {
    id: "poder-real",
    titulo: "Da natureza do poder real em uma monarquia constitucional",
    autor: "Benjamin Constant, 1815",
    resumo:
      "O poder real é neutro; o dos ministros é ativo. Constant explica por que a monarquia constitucional separa os dois e como o rei devolve o equilíbrio aos demais poderes.",
  },
];

export default function Home() {
  const [aba, setAba] = useState(0);
  const [noticia, setNoticia] = useState(null);

  function irParaAba(i) {
    setAba(i);
    // Clicar em "Diretório" sempre volta para a lista de notícias
    if (i === 1) setNoticia(null);
  }

  function abrirNoticia(id) {
    setNoticia(id);
    window.scrollTo({ top: 0 });
  }

  function voltarParaLista() {
    setNoticia(null);
    window.scrollTo({ top: 0 });
  }

  function aoTeclar(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const passo = e.key === "ArrowRight" ? 1 : -1;
    const proxima = (aba + passo + ABAS.length) % ABAS.length;
    irParaAba(proxima);
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
                onClick={() => irParaAba(i)}
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
            id="painel-1"
            role="tabpanel"
            aria-labelledby="aba-1"
            hidden={aba !== 1}
          >
            {noticia === null && (
              <>
                <h1>Diretório</h1>

                <ul className="noticias">
                  {NOTICIAS.map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        className="cartao"
                        onClick={() => abrirNoticia(n.id)}
                      >
                        <span className="cartao-titulo">{n.titulo}</span>
                        {n.autor && (
                          <span className="cartao-autor">{n.autor}</span>
                        )}
                        <span className="cartao-resumo">{n.resumo}</span>
                        <span className="cartao-ler">
                          Ler o artigo completo
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {noticia === "coroa-resiste" && (
              <>
                <button
                  type="button"
                  className="voltar"
                  onClick={voltarParaLista}
                >
                  Voltar para os artigos
                </button>

                <h1 className="titulo-noticia">
                  A COROA RESISTE: O DIRETÓRIO MONARQUISTA
                </h1>

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

                <button
                  type="button"
                  className="voltar voltar-fim"
                  onClick={voltarParaLista}
                >
                  Voltar para os artigos
                </button>
              </>
            )}

            {noticia === "poder-real" && (
              <>
                <button
                  type="button"
                  className="voltar"
                  onClick={voltarParaLista}
                >
                  Voltar para os artigos
                </button>

                <h1 className="titulo-noticia">
                  Da natureza do poder real em uma monarquia constitucional
                  <sup>1</sup>
                </h1>

                <p className="autoria">
                  Benjamin Constant, 1815. Tradução de Márcio Oliveira
                  Dornelles.
                </p>

                <p>
                  Nossa constituição,<sup>2</sup> ao estabelecer a
                  responsabilidade dos ministros, separa claramente o poder
                  ministerial do poder real. O simples fato de o monarca ser
                  inviolável e os ministros responsáveis evidencia esta
                  separação. Pois não se pode negar que os ministros detenham,
                  através disso, algum poder que lhes pertença exclusivamente
                  até um certo ponto. Se fossem considerados apenas agentes
                  passivos e cegos, sua responsabilização seria absurda e
                  injusta, além do que seriam responsáveis apenas pela execução
                  das ordens do monarca. Mas quer a constituição que eles sejam
                  responsáveis perante a nação e que em certos casos as ordens
                  do monarca não possam servir-lhes de desculpa. É portanto
                  claro que não são agentes passivos. O poder ministerial,
                  ainda que emanado do poder real, possui uma existência
                  realmente independente deste último, e essa diferença é
                  essencial e fundamental entre a autoridade responsável e a
                  autoridade investida da inviolabilidade.
                </p>

                <p>
                  Estando desse modo consagrada essa distinção por nossa própria
                  constituição, creio dever dedicar-lhe algumas considerações.
                  Indicada em uma obra que publiquei<sup>3</sup> antes da
                  promulgação da carta de 1814, ela pareceu clara e útil a
                  homens cuja opinião é, a meus olhos, de um grande peso. Ela é,
                  de fato segundo penso, a chave de toda a organização
                  política.
                </p>

                <p>
                  O poder real (refiro-me ao do chefe do Estado, qualquer que
                  seja o título que porte) é um poder neutro. O dos ministros é
                  um poder ativo. Para explicar essa diferença, definamos os
                  poderes políticos como foram conhecidos até hoje.
                </p>

                <p>
                  O poder executivo, o poder legislativo e o poder judiciário
                  são três instâncias que devem cooperar, cada qual de sua
                  parte, para o movimento geral. Mas quando essas instâncias,
                  alteradas, cruzem-se, entrechocam-se e entrevam-se, é
                  necessário uma força que as reponha em seus lugares. Essa
                  força não pode estar em uma das instâncias, pois dela
                  servir-se-ia para destruir as outras. É preciso que seja
                  exterior a elas, que seja de algum modo neutra para que sua
                  ação aplique-se necessariamente em todo o lugar onde for
                  necessário aplicá-la e para que ela seja protetora e
                  reparadora sem ser hostil.
                </p>

                <p>
                  A monarquia constitucional cria esse poder neutro na pessoa do
                  chefe do Estado. O verdadeiro interesse desse chefe só pode
                  ser o de que nenhum dos poderes derrube o outro, mas que todos
                  se apóiem, entendam-se e ajam em harmonia.
                </p>

                <p>
                  Não se distinguiu até hoje nas organizações políticas senão
                  três poderes.
                </p>

                <p>
                  Eu distingo cinco deles, de naturezas diversas, em uma
                  monarquia constitucional: 1º) o poder real; 2º) o poder
                  executivo; 3º) o poder representativo da tradição; 4º) o poder
                  representativo da opinião pública; 5º) o poder judiciário.
                </p>

                <p>
                  O poder representativo da tradição reside em uma assembléia
                  hereditária; o poder executivo é confiado aos ministros; o
                  poder judiciário, aos tribunais. Os dois primeiros poderes
                  fazem a Lei; o terceiro providencia sua execução geral e o
                  quarto a aplica aos casos particulares. O poder real está no
                  meio, mas acima dos outros quatro, autoridade simultaneamente
                  superior e intermediária, sem interesse em perturbar o
                  equilíbrio, mas, ao contrário, tendo todo o interesse em
                  mantê-lo.
                </p>

                <p>
                  Sem dúvida, como os homens nem sempre obedecem a seus
                  interesses da melhor maneira, é preciso tomar a precaução de
                  que o chefe de Estado não possa agir no lugar dos outros
                  poderes. É nisso que consiste a diferença entre a monarquia
                  absoluta e a monarquia constitucional.
                </p>

                <p>
                  Visto que é sempre útil passar das abstrações aos fatos,
                  citaremos a constituição inglesa.
                </p>

                <p>
                  Nenhuma lei pode ser feita sem o concurso da câmara
                  hereditária<sup>4</sup> e da câmara eletiva,<sup>5</sup>{" "}
                  nenhum ato pode ser executado sem a assinatura de um ministro,
                  nenhum julgamento pronunciado senão por tribunais
                  independentes. Mas quando aquela precaução é tomada, vejam
                  como a constituição inglesa emprega o poder real para pôr fim
                  a toda luta perigosa e para restabelecer a harmonia entre os
                  outros poderes. A ação do poder executivo é perigosa? O rei
                  destitui os ministros. A ação da câmara hereditária torna-se
                  funesta? O rei dá-lhe uma nova tendência, criando novos pares.
                  A ação da câmara eletiva anuncia-se ameaçadora? O rei faz uso
                  de seu veto ou a dissolve. Enfim, a própria ação do poder
                  judiciário é perniciosa, na medida que aplica a ações
                  individuais penas demasiado severas? O rei modera esse ato
                  através de seu direito de indulto.
                </p>

                <p>
                  O vício de quase todas as constituições foi o de não terem
                  criado um poder neutro e, ao invés disso, terem colocado a
                  soma total de autoridade em um dos poderes ativos. Quando essa
                  soma de autoridade encontrou-se reunida no poder legislativo,
                  a Lei, que só devia estender-se a determinados objetos,
                  estendeu-se a tudo. Houve arbítrio e tirania sem limites. Daí
                  os excessos do “Parlamento Longo”, das assembléias do povo nas
                  repúblicas da Itália, da Convenção em algumas épocas de sua
                  existência. Quando a mesma soma de autoridade encontrou-se
                  reunida no poder executivo, houve despotismo. Daí a usurpação
                  que resultou da ditadura em Roma.
                </p>

                <p>
                  A história romana é, em geral, um grande exemplo da
                  necessidade de um poder neutro, moderador dos poderes ativos.
                  Vemos naquela república, em meio aos embates que ocorreram
                  entre o povo e o senado, cada partido procurar garantias, mas,
                  como as colocavam sempre em si mesmos, cada garantia tornava-se
                  uma arma contra o partido oposto. Como as sublevações do povo
                  ameaçavam destruir o Estado, surgiram os ditadores,
                  magistrados devotados à classe patrícia. Tendo a opressão
                  exercida por essa classe reduzido os plebeus ao desespero, não
                  se destruiu absolutamente a ditadura, mas recorreu-se
                  simultaneamente à instituição tribunícia, autoridade
                  exclusivamente popular. Então os inimigos reencontraram-se
                  frente à frente, apenas cada um se havia fortificado em sua
                  posição. As centúrias eram uma aristocracia, as tribos, uma
                  democracia. Os plebiscitos, decretados sem o concurso do
                  senado, não eram menos vinculantes para os patrícios. Os
                  “senatus consultum”, emanados exclusivamente dos patrícios,
                  não eram menos vinculantes para os plebeus. Assim, cada
                  partido apoderava-se, por sua vez, do poder que deveria ter
                  sido confiado a mãos neutras e dele abusava, o que não pode
                  deixar de acontecer enquanto os poderes ativos não
                  renunciarem a ele para formar um poder à parte.
                </p>

                <p>
                  A mesma observação aplica-se aos cartagineses. Vejam-nos criar
                  sucessivamente os sufetes para porem limites à aristocracia do
                  senado, o tribunal dos cem para reprimir os sufetes, o
                  tribunal dos cinco para conter os cem. Eles queriam, diz
                  Condillac, impor um freio a uma autoridade e estabeleceram
                  outra, que tinha igualmente necessidade de ser limitada,
                  deixando assim subsistir sempre o abuso para o qual criam ter
                  o remédio.
                </p>

                <p>
                  A monarquia constitucional oferece-nos, conforme eu já disse,
                  esse poder neutro tão indispensável ao exercício regular da
                  liberdade. O rei, em um país livre, é um ser à parte,
                  superior à diversidade de opiniões, não tendo outro interesse
                  exceto a manutenção da ordem e da liberdade, não podendo
                  jamais recobrar a condição comum, inacessível, em
                  conseqüência, a todas as paixões que essa condição faz nascer
                  e a todas as que a perspectiva de a ela retornar desenvolve no
                  coração dos agentes investidos de um poder temporário. Essa
                  augusta prerrogativa da realeza deve espalhar no espírito do
                  monarca uma tal serenidade, e em sua alma um sentimento de
                  repouso como não pode desfrutar nenhum indivíduo em posição
                  inferior. Ele paira, por assim dizer, acima das agitações
                  humanas, e é uma obra-prima de organização política ter-se
                  assim criado, no próprio seio das dissensões, sem as quais
                  nenhuma liberdade existe, uma esfera inviolável de segurança,
                  majestade e imparcialidade, que permite a essas dissensões
                  desenvolverem-se sem perigo, enquanto não excederem certos
                  limites, e que, logo que o perigo se anuncia, põe nele um
                  termo por meios legais, constitucionais e despojados de todo
                  arbítrio. Mas, seja rebaixando o poder do monarca ao nível do
                  poder executivo, seja elevando o poder executivo ao nível do
                  monarca, perde-se essa imensa vantagem.
                </p>

                <p>
                  Se esses poderes forem confundidos, duas grandes questões
                  tornam-se insolúveis: uma, a destituição do poder executivo
                  propriamente dito; a outra, a responsabilidade da autoridade.
                </p>

                <p>
                  O poder executivo reside de fato nos ministros, mas a
                  autoridade que poderia destituí-lo falta na monarquia
                  absoluta, pois ela é sua aliada, e na república, pois ela é
                  sua inimiga. É apenas na monarquia constitucional que ela se
                  eleva ao nível de seu juiz.
                </p>

                <p>
                  Portanto, vemos que na monarquia absoluta não há meio de
                  destituir o poder executivo senão através de um golpe,
                  remédio freqüentemente mais terrível que o mal, e ainda que as
                  repúblicas tenham procurado organizar meios mais regulares,
                  estes tiveram freqüentemente o mesmo resultado violento e
                  desordenado.
                </p>

                <p>
                  Os cretenses inverteram um tipo de insurreição, de certa forma
                  legal, pela qual depunha-se todos os magistrados, e muitos
                  publicistas louvam-nos por isso. Uma lei de Atenas permitia a
                  cada cidadão matar quem quer que, no exercício de uma
                  magistratura, atentasse contra a liberdade da república. A lei
                  de Valerius Publicola tinha, em Roma, o mesmo fim. Os
                  florentinos tiveram sua “Bailia”, ou conselho extraordinário,
                  criado em situações de exceção e que, revestido de todos os
                  poderes, tinha uma faculdade de destituição universal. Mas em
                  todas essas constituições o direito de destituir o poder
                  executivo flutuava, por assim dizer, à mercê de quem quer que
                  o agarrasse, não para destruir, mas para exercer a tirania.
                  Daí decorria que o partido vencedor não se contentava em
                  despojar: ele feria de morte, e como o fazia sem julgamento,
                  era mais um assassinato que um ato de justiça.
                </p>

                <p>
                  A “Bailia” de Florença, nascida da tempestade, ressentia-se de
                  sua origem. Condenava à morte, encarcerava, espoliava, porque
                  não tinha outro meio de privar da autoridade os homens que
                  eram seus depositários. Portanto, após ter agitado Florença
                  pela anarquia, tornou-se o instrumento principal do poder dos
                  Médicis.
                </p>

                <p>
                  É preciso um poder constitucional que tenha sempre o que a
                  “Bailia” tinha de útil e que não tenha jamais o que ela tinha
                  de perigoso, ou seja, que não possa condenar, encarcerar,
                  espoliar ou proscrever, mas que se limite a tirar o poder dos
                  homens ou das assembléias que não possam mais exercê-lo sem
                  perigo.
                </p>

                <p>
                  A monarquia constitucional resolve esse grande problema e,
                  para melhor fixar as idéias, peço ao leitor para conferir
                  minhas asserções com a realidade. Essa realidade encontra-se
                  na monarquia inglesa. Ela criou este poder neutro e
                  moderador: é o poder real, separado do poder executivo. O
                  poder executivo é destituído sem ser perseguido. O rei não tem
                  necessidade de provar que seus ministros são culpados de uma
                  falta, de um crime ou de um projeto ignominioso para
                  despedi-los; ele os despede sem puni-los. Assim, ocorre tudo o
                  que é necessário, sem nada do que é injusto; e, como acontece
                  habitualmente, esse meio, por ser justo, sob outro ponto de
                  vista é também útil.
                </p>

                <p>
                  É um grande defeito em toda constituição não deixar
                  alternativa aos homens poderosos senão entre seu poder e o
                  cadafalso.
                </p>

                <p>
                  Entre a destituição do poder executivo e a sua punição, há a
                  mesma diferença que entre a dissolução das assembléias
                  representativas e o julgamento dos seus membros. Se se
                  substituísse a primeira dessas medidas pela segunda dúvida
                  haveria de que as assembléias ameaçadas não somente em sua
                  existência política, mas em sua existência individual,
                  ficariam furiosas pela percepção do perigo, e o Estado estaria
                  exposto aos maiores males. Ocorre o mesmo com o poder
                  executivo. Se substituirmos a faculdade de destituí-lo pela de
                  submetê-lo a julgamento, excitaremos seu temor e a sua cólera.
                  Ele defenderá seu poder em nome de sua segurança. A monarquia
                  constitucional evita este perigo. Os representantes, após a
                  dissolução de sua assembléia, e os ministros, após sua
                  destituição, retornam à classe dos demais cidadãos, e os
                  resultados desses dois grandes antídotos contra tais abusos
                  são tanto eficazes como pacíficos.
                </p>

                <p>
                  Considerações do mesmo gênero oferecem-se a nós quando se
                  trata da responsabilidade política.
                </p>

                <p>
                  Um monarca hereditário pode e deve ser irresponsável. Ele é um
                  ser à parte, no cume do edifício constitucional. A atribuição
                  que lhe é particular e permanente não somente nele, mas em sua
                  linhagem inteira, desde seus ancestrais até seus descendentes,
                  separa-o de todos os indivíduos de seu império. Não é de modo
                  algum extraordinário declarar um homem inviolável, quando uma
                  família está investida do direito de governar um grande povo
                  pela exclusão das outras famílias e ao expor-se a todos os
                  acasos da sucessão.
                </p>

                <p>
                  O próprio monarca aceita, sem relutância, a responsabilização
                  de seus ministros. Ele tem bens mais preciosos a defender do
                  que tal ou qual detalhe da administração, tal ou qual
                  exercício parcial da autoridade. Sua dignidade é um
                  patrimônio de família que ele retira da luta ao dissolver seu
                  ministério. Mas é apenas quando o poder é desse modo sagrado
                  que ele pode ser separado da responsabilidade.
                </p>

                <p>
                  Um poder republicano renovando-se periodicamente não é
                  absolutamente um ser à parte, não impressiona em nada a
                  imaginação, não tem nenhum direito à indulgência para com seus
                  erros, pois ele disputou o posto que ocupa e não tem nada mais
                  precioso a defender que sua autoridade, que está comprometida
                  quando se ataca seu ministério, composto de homens como ele e
                  com os quais é sempre, de fato, solidário.
                </p>

                <p>
                  Tornar o poder supremo inviolável é constituir seus ministros
                  juízes da obediência que lhe devem. Eles não podem, na
                  verdade, recusar-lhe essa obediência, senão demitindo-se. Mas
                  então a opinião pública torna-se, por sua vez, juiz entre o
                  poder superior e os ministros, e o favor está naturalmente do
                  lado dos homens que parecem ter feito a suas consciências o
                  sacrifício de seus interesses. Isto não traz inconvenientes na
                  monarquia hereditária. Os elementos dos quais se compõe a
                  veneração que cerca o monarca impedem que ele seja comparado
                  com seus ministros e a permanência de sua dignidade faz com
                  que todos os esforços de seus partidários dirijam-se contra o
                  novo ministério. Mas em uma república a comparação entre o
                  poder supremo e os antigos ministros levaria a desejar que
                  estes se tornassem o poder supremo e nada em sua composição ou
                  em suas formas opor-se-ia a isto.
                </p>

                <p>
                  Entre um poder republicano não responsável e um ministério
                  responsável, o segundo seria tudo e o primeiro não tardaria a
                  ser reconhecido como inútil. A irresponsabilidade força o
                  governo a nada fazer senão através de seus ministros. Mas
                  então, qual é a utilidade de um poder superior ao ministério?
                  Em uma monarquia, é impedir que outros o tomem estabelecendo
                  um ponto fixo, inatacável, do qual as paixões não possam
                  aproximar-se. Mas nada de semelhante ocorre em uma república,
                  onde todos os cidadãos podem chegar ao poder supremo.
                </p>

                <p>
                  Imaginemos, na constituição de 1795, um Diretório inviolável e
                  um ministério ativo e enérgico. Ter-se-ia suportado por muito
                  tempo cinco homens que não fariam nada depois de seis homens
                  que faziam tudo? Um governo republicano tem necessidade
                  exercer sobre seus ministros uma autoridade mais absoluta que
                  a de um monarca hereditário, pois está exposto a que seus
                  instrumentos tornem-se seus rivais. Mas para que ele exerça
                  uma tal autoridade é preciso que chame sobre si mesmo a
                  responsabilidade dos atos que ordena, pois só é possível
                  fazer-se obedecer pelos homens garantindo-lhes o resultado da
                  obediência.
                </p>

                <p>
                  As repúblicas são, portanto, forçadas a tornarem responsável o
                  poder supremo. Mas então a responsabilidade torna-se ilusória.
                </p>

                <p>
                  Uma responsabilidade que só pode exercer-se sobre homens cuja
                  queda interromperia as relações exteriores e desarticularia
                  pela imobilidade as engrenagens interiores do Estado não se
                  exercerá jamais. Querer-se-á agitar a sociedade para vingar os
                  direitos de um, de dez, de cem, de mil cidadãos disseminados
                  sobre uma superfície de trinta mil léguas quadradas? O arbítrio
                  será irremediável, porque o remédio será sempre mais
                  prejudicial que um mal menor. Os culpados escaparão, seja pelo
                  uso que farão de seu poder para corromper, seja porque esses
                  mesmos que estariam dispostos a acusá-los temerão o abalo que
                  uma acusação causaria ao edifício constitucional. Ou seja:
                  para vingar a violação de uma lei particular, será preciso
                  pôr em perigo o que serve de garantia a todas as leis.
                </p>

                <p>
                  Assim, os homens fracos e os sensatos, os homens venais e os
                  escrupulosos encontrar-se-ão engajados, por razões
                  diferentes, em poupar os depositários infiéis da autoridade
                  executiva. A responsabilidade será nula, porque colocada
                  demasiado alto. Enfim, como é da essência do poder quando pode
                  abusar impunemente, ele abusa sempre mais. Se os escândalos
                  tornam-se intoleráveis, a responsabilidade será exigida; mas,
                  sendo dirigida contra os chefes do governo, ela será
                  provavelmente seguida pela destruição deste.
                </p>

                <p>
                  Não me ocupo aqui em examinar se seria possível, através de
                  uma nova organização, remediar o inconveniente relativo à
                  responsabilidade em uma constituição republicana. O que quis
                  provar é que a primeira condição que é indispensável para que
                  a responsabilidade seja exercida é separar o poder executivo
                  do poder supremo. A monarquia constitucional atinge esse
                  grande objetivo, mas essa vantagem seria de novo perdida se se
                  confundisse esses dois poderes.
                </p>

                <p>
                  O poder ministerial é de tal modo a única força de execução em
                  uma constituição livre, que o monarca nada propõe senão por
                  intermediário de seus ministros. Ele nada ordena sem que a
                  assinatura destes garanta à nação a responsabilidade dos
                  mesmos.
                </p>

                <p>
                  Quando se trata de nomeações, o monarca decide sozinho, é seu
                  direito incontestável. Mas quando se trata de uma ação direta,
                  ou simplesmente de um projeto de lei, o poder ministerial é
                  obrigado pôr-se na frente, para que jamais a discussão ou a
                  resistência comprometam o chefe do Estado.
                </p>

                <p>
                  Argumenta-se que na Inglaterra o poder real não era tão
                  claramente distinto do poder ministerial. Cita-se uma
                  conjuntura em que a vontade pessoal do soberano havia
                  preponderado sobre a de seus ministros, ao recusar-se a
                  conceder aos católicos os privilégios de seus outros súditos.
                  Mas aqui duas coisas são confundidas: o direito de conservar o
                  que existe, direito que pertence necessariamente ao poder real
                  e que o torna, conforme afirmo, autoridade neutra e
                  preservadora, e o direito de propor o estabelecimento do que
                  ainda não existe, direito que pertence ao poder ministerial.
                </p>

                <p>
                  Na circunstância indicada, tratava-se apenas de manter o que
                  existia, pois as leis contra os católicos estão em pleno
                  vigor, ainda que sua execução esteja abrandada. Ora, nenhuma
                  lei pode ser revogada sem a participação do poder real. Não
                  examino se, no caso particular, o exercício deste poder foi
                  bom ou mau. Lamento que escrúpulos respeitáveis, pois
                  relacionam-se com a consciência, mas errôneos por princípio e
                  funestos em aplicação, tenham levado o rei da Inglaterra a
                  manter medidas vexatórias e intolerantes, mas aqui trata-se
                  somente de provar que, ao mantê-las, o poder real não saiu de
                  seus limites e, para disso convencermo-nos plenamente,
                  invertamos a hipótese e suponhamos que estas leis contra os
                  católicos não tivessem existido anteriormente. A vontade
                  pessoal do monarca não teria podido obrigar qualquer ministro
                  a propô-las, e ouso afirmar que, em nossos dias, o rei da
                  Inglaterra não encontraria um ministro que propusesse
                  semelhantes leis. Assim, a diferença entre o poder real e o
                  poder ministerial é constatada pelo próprio exemplo alegado
                  para obscurecê-la. O caráter neutro e puramente preservador do
                  primeiro é indiscutível e é evidente que entre os dois somente
                  o segundo é ativo, pois se este último não quisesse agir, o
                  primeiro não acharia nenhum modo de constrangê-lo e tampouco
                  teria meios para agir sem ele. Esta posição do poder real só
                  tem vantagens e nunca inconvenientes, pois, do mesmo modo que
                  um rei da Inglaterra encontraria na recusa de agir de seu
                  ministério um obstáculo insuperável à proposição de leis
                  contrárias ao espírito do século e à liberdade religiosa, esta
                  oposição ministerial seria impotente se quisesse impedir o
                  poder real de propor leis conformes a esse espírito e
                  favoráveis a essa liberdade. O rei só precisaria mudar de
                  ministros e, enquanto ninguém se apresentaria para desafiar a
                  opinião e lutar de frente contra as luzes, oferecer-se-iam mil
                  para serem os instrumentos de medidas populares que a nação
                  apoiaria com sua aprovação e desejo.<sup>6</sup>
                </p>

                <p>
                  Não quero absolutamente negar a existência, no esquema de um
                  poder monárquico mais vivo e ativo, de algo mais sedutor, mas
                  as instituições dependem dos tempos muito mais que dos homens.
                  A ação direta do monarca enfraqueceu-se sempre,
                  inevitavelmente, em razão dos progressos da civilização.
                  Muitas coisas que admiramos e que nos parecem tocantes em
                  outras épocas são agora inadmissíveis. Imaginemos os reis da
                  França fazendo justiça a seus súditos ao pé de um carvalho.
                  Ficaremos emocionados com esse espetáculo e reverenciaremos
                  esse exercício augusto e inocente de uma autoridade paternal;
                  mas hoje em dia, o que se veria em um julgamento feito por um
                  rei, sem o concurso dos tribunais? A violação de todos os
                  princípios, a confusão de todos os poderes, a destruição da
                  independência judiciária, tão energicamente querida por todas
                  as classes. Não se faz uma monarquia constitucional com
                  recordações e poesia.
                </p>

                <p>
                  Restam aos monarcas, sob uma constituição livre, nobres, belas
                  e sublimes prerrogativas. A eles cabe o direito de indulto,
                  direito de natureza quase divina, que repara os erros da
                  justiça humana ou seus rigores demasiado inflexíveis, que
                  também são erros. A eles cabe o direito de investir cidadãos
                  distintos com um renome durável, ao colocá-los nesta
                  magistratura hereditária que reúne o brilho do passado com a
                  solenidade das mais altas funções políticas. A eles cabe o
                  direito de nomear os órgãos legislativos e de assegurar à
                  sociedade o gozo da ordem pública e a inocência da segurança.
                  A eles cabe o direito de dissolver as assembléias
                  representativas e preservar assim a nação dos desvios de seus
                  mandatários, ao convocá-la para novas eleições. A eles cabe,
                  enfim, a distribuição das graças, dos favores, das
                  recompensas, a prerrogativa de pagar com uma atenção ou uma
                  palavra aos serviços prestados ao Estado, prerrogativa que dá
                  à monarquia um tesouro de opinião inesgotável, que faz de
                  todos os amores-próprios outros tantos servidores e de todas
                  as ambições outros tantos tributários.
                </p>

                <p>
                  Eis aí certamente uma carreira vasta, atribuições imponentes,
                  uma grande e nobre missão. Seriam maus e pérfidos os
                  conselheiros que apresentassem a um monarca constitucional,
                  como objeto de desejo ou nostalgia, o poder despótico sem
                  limites, ou melhor, sem freio, que seria equivocado porque
                  ilimitado, precário porque violento, e que pesaria de maneira
                  igualmente funesta sobre o príncipe, que só poderia
                  desgraçar, e sobre o povo, que só poderia atormentar ou
                  corromper.<sup>7</sup>
                </p>

                <p>────────</p>

                <p>Notas</p>

                <p>
                  <sup>1</sup> “De la liberté chez le modernes. Écrits
                  politiques.” Librairie Générale Française. 1980.
                </p>

                <p>
                  <sup>2</sup> A constituição francesa de 4 de junho de 1814 (N.
                  do T.).
                </p>

                <p>
                  <sup>3</sup> “Refléxions sur les Constitutions et les
                  garanties” (N. do T.)
                </p>

                <p>
                  <sup>4</sup> A Câmara dos Lordes (N. do T.).
                </p>

                <p>
                  <sup>5</sup> A Câmara dos Comuns (N. do T.).
                </p>

                <p>
                  <sup>6</sup> O que aqui digo sobre o respeito ou
                  condescendência dos ministros ingleses para com a opinião
                  nacional não se aplica, infelizmente, senão a suas
                  administrações internas. A renovação da guerra, sem pretexto,
                  sem justificativa, em resposta às demonstrações mais
                  moderadas, às intenções pacíficas mais manifestamente
                  sinceras, prova demasiado bem que para as questões do
                  continente esse ministério inglês não consulta nem a
                  inclinação do povo, nem sua razão, nem seus interesses.
                </p>

                <p>
                  <sup>7</sup> É bastante notável que um instinto confuso tenha
                  sempre advertido os homens da verdade que acabo de
                  desenvolver neste capítulo, ainda que ela jamais tenha sido
                  enunciada. Mas, precisamente por isso, esse instinto confuso
                  foi a causa de erros muito perigosos.
                </p>

                <p>
                  Por supor-se vagamente que o poder real era, por sua natureza,
                  uma autoridade neutra e restrita a seus limites, não detendo
                  prerrogativas prejudiciais, concluiu-se que não haveria
                  inconvenientes em investi-lo dessas prerrogativas, e a
                  neutralidade cessou.
                </p>

                <p>
                  Se se tivesse proposto conceder aos ministros uma ação
                  arbitrária sobre a liberdade individual e sobre os direitos
                  dos cidadãos, todo o mundo teria rejeitado essa proposta,
                  porque a natureza do poder ministerial, sempre em contato com
                  todos os interesses, teria à primeira vista demonstrado o
                  perigo de investir esse poder com essa faculdade arbitrária.
                  Mas concedeu-se freqüentemente essa autoridade aos Reis,
                  porque eles eram considerados desinteressados e imparciais, e
                  destruiu-se, por essa mesma concessão, a imparcialidade que
                  lhe servia de pretexto.
                </p>

                <p>
                  Todo poder arbitrário é contrário à natureza do poder real.
                  Portanto, ocorre sempre uma destas duas coisas: ou esse poder
                  torna-se atribuição da autoridade ministerial, ou o próprio
                  rei, cessando de ser neutro, torna-se uma espécie de ministro
                  mais temível, porque associa à inviolabilidade que possui
                  atribuições que não deveria jamais possuir. Então essas
                  atribuições destroem toda possibilidade de tranqüilidade, toda
                  esperança de liberdade.
                </p>

                <button
                  type="button"
                  className="voltar voltar-fim"
                  onClick={voltarParaLista}
                >
                  Voltar para as notícias
                </button>
              </>
            )}
          </div>

          <div
            id="painel-2"
            role="tabpanel"
            aria-labelledby="aba-2"
            hidden={aba !== 2}
          >
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

            <figure className="retrato">
              <img
                className="foto"
                src="/Conselheiro-Lafaiate.jpeg"
                alt="Conselheiro Lafayette"
              />
              <figcaption>Conselheiro Lafayette</figcaption>
            </figure>

            <figure className="retrato">
              <img
                className="foto"
                src="/Carlos-Egert.jpeg"
                alt="Carlos Egert, refundador do Diretório Monárquico"
              />
              <figcaption>
                Carlos Egert, refundador do Diretório Monárquico
              </figcaption>
            </figure>
          </div>

          <div
            id="painel-3"
            role="tabpanel"
            aria-labelledby="aba-3"
            hidden={aba !== 3}
          >
            <p className="vazio">Conteúdo em breve.</p>
          </div>

          <div
            id="painel-4"
            role="tabpanel"
            aria-labelledby="aba-4"
            hidden={aba !== 4}
          >
            <h1>Quem somos</h1>
            <p className="vazio">Conteúdo em breve.</p>
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

        /* Título de uma notícia aberta: menor que o título das abas */
        h1.titulo-noticia {
          font-size: clamp(1.9rem, 6vw, 2.75rem);
          line-height: 1.15;
        }

        .abas {
          display: flex;
          gap: 0.25rem;
          margin: 0 0 2rem;
          border-bottom: 1px solid var(--suave);
          flex-wrap: wrap;
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

        /* Lista de notícias (aba Diretório) */
        .noticias {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .noticias li + li {
          margin-top: 1.25rem;
        }

        .cartao {
          display: block;
          width: 100%;
          padding: 1.5rem 1.5rem 1.25rem;
          border: 1px solid var(--ouro);
          border-left: 6px solid var(--ouro);
          background: none;
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .cartao:hover {
          background: rgba(176, 138, 46, 0.1);
        }

        .cartao:focus-visible {
          outline: 3px solid var(--ouro);
          outline-offset: 3px;
        }

        .cartao-titulo {
          display: block;
          color: var(--verde);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .cartao-autor {
          display: block;
          margin-top: 0.4rem;
          color: var(--suave);
          font-size: 0.95rem;
          font-style: italic;
        }

        .cartao-resumo {
          display: block;
          margin-top: 0.75rem;
          line-height: 1.6;
        }

        .autoria {
          margin: -1rem 0 2rem;
          color: var(--suave);
          font-style: italic;
        }

        sup {
          font-size: 0.7em;
          line-height: 0;
        }

        .cartao-ler {
          display: inline-block;
          margin-top: 1rem;
          color: var(--verde);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }

        /* Botão de voltar dentro da notícia */
        .voltar {
          display: inline-block;
          margin: 0 0 2rem;
          padding: 0.5rem 0;
          border: 0;
          background: none;
          color: var(--verde);
          font: inherit;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 0.2em;
          cursor: pointer;
        }

        .voltar:focus-visible {
          outline: 3px solid var(--ouro);
          outline-offset: 3px;
        }

        .voltar-fim {
          margin: 1.5rem 0 0;
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
          .abas {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .aba {
            padding: 0.65rem 0.4rem;
            font-size: 0.95rem;
            text-align: center;
          }
          .cartao {
            padding: 1.25rem 1rem 1rem;
          }
          .cartao-titulo {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
}