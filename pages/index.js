import Head from "next/head";
import { useState } from "react";

import AbaInicio from "../components/AbaInicio";
import AbaMidias from "../components/AbaMidias";
import AbaDiretorio from "../components/AbaDiretorio";
import AbaQuemSomos from "../components/AbaQuemSomos";
import AbaLiteratura from "../components/AbaLiteratura";

const ABAS = ["Início", "Midias", "Diretório", "Quem somos", "Literatura"];
const ABA_MIDIAS = 1;

export default function Home() {
  const [aba, setAba] = useState(0);
  const [noticia, setNoticia] = useState(null);

  function irParaAba(i) {
    setAba(i);
    if (i === ABA_MIDIAS) setNoticia(null);
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

  const paineis = [
    <AbaInicio key="inicio" />,
    <AbaMidias
      key="midias"
      noticia={noticia}
      abrirNoticia={abrirNoticia}
      voltarParaLista={voltarParaLista}
    />,
    <AbaDiretorio key="diretorio" />,
    <AbaQuemSomos key="quem-somos" />,
    <AbaLiteratura key="literatura"/>
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
