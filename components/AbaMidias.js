import { paraItemDaLista } from "./ArtigoSimples";
import CoroaResiste from "./artigos/CoroaResiste";
import PoderReal from "./artigos/PoderReal";

export const NOTICIAS = [
  {
    id: "coroa-resiste",
    titulo: "A Coroa resiste: o Diretório Monarquista",
    resumo:
      "Em 15 de outubro de 1896, monarquistas reunidos em São Paulo enviaram um telegrama ao Rio de Janeiro. A resposta trazia uma assinatura coletiva: o Diretório.",
    Artigo: CoroaResiste,
  },
  {
    id: "poder-real",
    titulo: "Da natureza do poder real em uma monarquia constitucional",
    autor: "Benjamin Constant, 1815",
    resumo:
      "O poder real é neutro; o dos ministros é ativo. Constant explica por que a monarquia constitucional separa os dois e como o rei devolve o equilíbrio aos demais poderes.",
    Artigo: PoderReal,
  },
];

export default function AbaMidias({
  noticia,
  abrirNoticia,
  voltarParaLista,
  extras = [],
}) {
  // Publicações feitas pelo painel /admin aparecem primeiro.
  const lista = [...extras.map(paraItemDaLista), ...NOTICIAS];
  const aberta = lista.find((n) => n.id === noticia);

  if (!aberta) {
    return (
      <ul className="noticias">
        {lista.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              className="cartao"
              onClick={() => abrirNoticia(n.id)}
            >
              {n.imagem && (
                <img className="cartao-imagem" src={n.imagem} alt="" />
              )}
              <span className="cartao-titulo">{n.titulo}</span>
              {(n.autor || n.data) && (
                <span className="cartao-autor">
                  {[n.autor, n.data].filter(Boolean).join(" · ")}
                </span>
              )}
              <span className="cartao-resumo">{n.resumo}</span>
              <span className="cartao-ler">Ler o artigo completo</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  const { Artigo } = aberta;

  return (
    <>
      <button type="button" className="voltar" onClick={voltarParaLista}>
        Voltar para os artigos
      </button>

      <Artigo />

      <button
        type="button"
        className="voltar voltar-fim"
        onClick={voltarParaLista}
      >
        Voltar para os artigos
      </button>
    </>
  );
}
