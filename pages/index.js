import Head from "next/head";
import { useState } from "react";

import AbaInicio from "../components/AbaInicio";
import AbaMidias from "../components/AbaMidias";
import AbaNoticias from "../components/AbaNoticias";
import AbaDiretorio from "../components/AbaDiretorio";
import AbaQuemSomos from "../components/AbaQuemSomos";
import AbaLiteratura from "../components/AbaLiteratura";
import { lerSecao } from "../lib/conteudo";

const ABAS = ["Início", "Midias", "Notícias", "Diretório", "Quem somos", "Literatura"];
const ABA_MIDIAS = 1;
const ABA_NOTICIAS = 2;

// Publicações do painel /admin, lidas quando o site é gerado.
// Cada publicação nova gera uma nova versão do site na Vercel.
export async function getStaticProps() {
  return {
    props: {
      noticiasExtras: lerSecao("noticias"),
      midiasExtras: lerSecao("midias"),
    },
  };
}

export default function Home({ noticiasExtras = [], midiasExtras = [] }) {
  const [aba, setAba] = useState(0);
  const [midia, setMidia] = useState(null);     // item aberto na aba Mídias
  const [noticia, setNoticia] = useState(null); // item aberto na aba Notícias

  function irParaAba(i) {
    setAba(i);
    if (i === ABA_MIDIAS) setMidia(null);
    if (i === ABA_NOTICIAS) setNoticia(null);
  }

  function abrirMidia(id) {
    setMidia(id);
    window.scrollTo({ top: 0 });
  }

  function voltarParaMidias() {
    setMidia(null);
    window.scrollTo({ top: 0 });
  }

  function abrirNoticia(id) {
    setNoticia(id);
    window.scrollTo({ top: 0 });
  }

  function voltarParaNoticias() {
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

  const paineis = [
    <AbaInicio key="inicio" />,
    <AbaMidias
      key="midias"
      noticia={midia}
      abrirNoticia={abrirMidia}
      voltarParaLista={voltarParaMidias}
      extras={midiasExtras}
    />,
    <AbaNoticias
      key="noticias"
      noticia={noticia}
      abrirNoticia={abrirNoticia}
      voltarParaLista={voltarParaNoticias}
      extras={noticiasExtras}
    />,
    <AbaDiretorio key="diretorio" />,
    <AbaQuemSomos key="quem-somos" />,
    <AbaLiteratura key="literatura" />,
  ];

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

          {paineis.map((painel, i) => (
            <div
              key={i}
              id={`painel-${i}`}
              role="tabpanel"
              aria-labelledby={`aba-${i}`}
              hidden={aba !== i}
            >
              {painel}
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
    </>
  );
}