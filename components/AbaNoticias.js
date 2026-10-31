import MonarquiaParlamentar2026 from "./noticias/MonarquiaParlamentar2026";

export const LISTA_NOTICIAS = [
  {
    id: "monarquia-parlamentar-2026",
    titulo:
      "Carlos Egert analisa: a monarquia parlamentar na geopolítica das incertezas",
    autor: "Carlos Egert",
    data: "31 de outubro de 2026",
    resumo:
      "Do Reino Unido ao Japão, as monarquias parlamentares mantêm a chefia de Estado separada da disputa partidária. Carlos Egert examina o que essa experiência tem a dizer num mundo de guerras, coalizões frágeis e governos sob pressão.",
    Artigo: MonarquiaParlamentar2026,
  },
];

export default function AbaNoticias({ noticia, abrirNoticia, voltarParaLista }) {
  const aberta = LISTA_NOTICIAS.find((n) => n.id === noticia);

  if (!aberta) {
    return (
      <ul className="noticias">
        {LISTA_NOTICIAS.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              className="cartao"
              onClick={() => abrirNoticia(n.id)}
            >
              <span className="cartao-titulo">{n.titulo}</span>
              {(n.autor || n.data) && (
                <span className="cartao-autor">
                  {[n.autor, n.data].filter(Boolean).join(" · ")}
                </span>
              )}
              <span className="cartao-resumo">{n.resumo}</span>
              <span className="cartao-ler">Ler a notícia completa</span>
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
        Voltar para as notícias
      </button>

      <Artigo />

      <button
        type="button"
        className="voltar voltar-fim"
        onClick={voltarParaLista}
      >
        Voltar para as notícias
      </button>
    </>
  );
}