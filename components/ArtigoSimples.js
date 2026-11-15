// Mostra uma publicação criada pelo painel /admin.
//
// O texto é digitado como texto comum:
//   - uma linha em branco separa os parágrafos;
//   - linha começando com "## " vira subtítulo;
//   - linha começando com "> " vira citação;
//   - **palavras entre dois asteriscos** ficam em negrito.
// O React escapa todo o conteúdo, então nada digitado vira código.

function negrito(linha, chave) {
  const partes = linha.split(/\*\*(.+?)\*\*/g);
  return partes.map((p, i) =>
    i % 2 === 1 ? <strong key={`${chave}-${i}`}>{p}</strong> : p
  );
}

function comQuebras(texto, chave) {
  const linhas = texto.split("\n");
  return linhas.flatMap((l, i) =>
    i === 0
      ? negrito(l, `${chave}-${i}`)
      : [<br key={`${chave}-br-${i}`} />, ...negrito(l, `${chave}-${i}`)]
  );
}

export function blocosDoTexto(texto = "") {
  return texto
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      if (b.startsWith("## ")) return { tipo: "subtitulo", texto: b.slice(3).trim() };
      if (b.startsWith("> "))
        return {
          tipo: "citacao",
          texto: b
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join("\n"),
        };
      return { tipo: "paragrafo", texto: b };
    });
}

export default function ArtigoSimples({ item }) {
  const { titulo, autor, data, imagem, legenda, texto } = item;
  const autoria = [autor, data].filter(Boolean).join(" · ");

  return (
    <>
      <h1 className="titulo-noticia">{titulo}</h1>

      {autoria && <p className="autoria">{autoria}</p>}

      {imagem && (
        <figure className="retrato">
          <img className="foto" src={imagem} alt={legenda || titulo} />
          {legenda && <figcaption>{legenda}</figcaption>}
        </figure>
      )}

      {blocosDoTexto(texto).map((b, i) => {
        if (b.tipo === "subtitulo") return <h2 key={i}>{b.texto}</h2>;
        if (b.tipo === "citacao")
          return (
            <blockquote key={i}>
              <p>{comQuebras(b.texto, i)}</p>
            </blockquote>
          );
        return <p key={i}>{comQuebras(b.texto, i)}</p>;
      })}
    </>
  );
}

// Transforma o arquivo salvo pelo painel no formato que as abas usam.
export function paraItemDaLista(item) {
  return {
    ...item,
    Artigo: () => <ArtigoSimples item={item} />,
  };
}
