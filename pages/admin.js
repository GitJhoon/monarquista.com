// Painel de edição: monarquista.com/admin
// Feito para quem não mexe com programação: entrar, escrever, pôr foto, publicar.
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ArtigoSimples from "../components/ArtigoSimples";
import { NOMES_SECOES, SECOES } from "../lib/secoes";

const LADO_MAXIMO_FOTO = 1600; // px; fotos maiores são reduzidas antes de enviar

function hojePorExtenso() {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function formularioVazio() {
  return {
    id: null,
    secao: "noticias",
    titulo: "",
    autor: "",
    data: hojePorExtenso(),
    resumo: "",
    texto: "",
    legenda: "",
    imagemAtual: "", // foto já publicada (ao editar)
    novaImagem: null, // { base64, tipo, previa }
    removerImagem: false,
  };
}

async function api(caminho, opcoes = {}) {
  const resp = await fetch(caminho, {
    ...opcoes,
    headers: opcoes.body ? { "Content-Type": "application/json" } : {},
    credentials: "same-origin",
  });
  const dados = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const erro = new Error(dados.erro || "Algo deu errado. Tente de novo.");
    erro.status = resp.status;
    throw erro;
  }
  return dados;
}

// Reduz a foto no próprio navegador e devolve JPEG em base64.
function prepararFoto(arquivo) {
  return new Promise((resolve, reject) => {
    if (!arquivo.type.startsWith("image/")) {
      reject(new Error("Escolha um arquivo de imagem (JPG, PNG…)."));
      return;
    }
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, LADO_MAXIMO_FOTO / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // fundo branco para PNG transparente
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const previa = canvas.toDataURL("image/jpeg", 0.85);
      resolve({ base64: previa.split(",")[1], tipo: "image/jpeg", previa });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não consegui abrir essa imagem. Tente outra foto."));
    };
    img.src = url;
  });
}

export default function Admin() {
  const [carregando, setCarregando] = useState(true);
  const [sessao, setSessao] = useState(null);
  const [publicacoes, setPublicacoes] = useState({ noticias: [], midias: [] });
  const [form, setForm] = useState(null); // null = mostrando a lista
  const [previa, setPrevia] = useState(false);
  const [aviso, setAviso] = useState(null); // { tipo: "ok" | "erro", texto }
  const [ocupado, setOcupado] = useState(false);

  async function carregarSessao() {
    const s = await api("/api/admin/sessao");
    setSessao(s);
    if (s.usuario && s.githubConfigurado) await carregarPublicacoes();
    setCarregando(false);
  }

  async function carregarPublicacoes() {
    try {
      setPublicacoes(await api("/api/admin/publicacoes"));
    } catch (e) {
      tratarErro(e);
    }
  }

  function tratarErro(e) {
    if (e.status === 401) setSessao((s) => ({ ...s, usuario: null }));
    setAviso({ tipo: "erro", texto: e.message });
  }

  useEffect(() => {
    carregarSessao().catch(() => {
      setCarregando(false);
      setAviso({ tipo: "erro", texto: "Não consegui falar com o servidor." });
    });
  }, []);

  async function sair() {
    await api("/api/admin/logout", { method: "POST" }).catch(() => {});
    setSessao((s) => ({ ...s, usuario: null }));
    setForm(null);
  }

  function editar(secao, p) {
    setAviso(null);
    setPrevia(false);
    setForm({
      ...formularioVazio(),
      id: p.id,
      secao,
      titulo: p.titulo || "",
      autor: p.autor || "",
      data: p.data || "",
      resumo: p.resumo || "",
      texto: p.texto || "",
      legenda: p.legenda || "",
      imagemAtual: p.imagem || "",
    });
    window.scrollTo({ top: 0 });
  }

  async function excluir(secao, p) {
    if (!window.confirm(`Apagar "${p.titulo}"? Isso tira a publicação do site.`)) return;
    setOcupado(true);
    setAviso(null);
    try {
      await api(
        `/api/admin/publicacoes?secao=${secao}&id=${encodeURIComponent(p.id)}`,
        { method: "DELETE" }
      );
      setPublicacoes((atual) => ({
        ...atual,
        [secao]: atual[secao].filter((x) => x.id !== p.id),
      }));
      setAviso({
        tipo: "ok",
        texto: "Publicação apagada. O site se atualiza em 1 a 2 minutos.",
      });
    } catch (e) {
      tratarErro(e);
    } finally {
      setOcupado(false);
    }
  }

  async function publicar(e) {
    e.preventDefault();
    setOcupado(true);
    setAviso(null);
    try {
      const { publicacao } = await api("/api/admin/publicacoes", {
        method: "POST",
        body: JSON.stringify({
          id: form.id,
          secao: form.secao,
          titulo: form.titulo,
          autor: form.autor,
          data: form.data,
          resumo: form.resumo,
          texto: form.texto,
          legenda: form.legenda,
          imagem: form.novaImagem
            ? { base64: form.novaImagem.base64, tipo: form.novaImagem.tipo }
            : null,
          removerImagem: form.removerImagem,
        }),
      });
      setPublicacoes((atual) => {
        const outras = SECOES.reduce((acc, s) => {
          acc[s] = atual[s].filter((x) => x.id !== publicacao.id);
          return acc;
        }, {});
        outras[form.secao] = [publicacao, ...outras[form.secao]];
        return outras;
      });
      setForm(null);
      setPrevia(false);
      setAviso({
        tipo: "ok",
        texto: `"${publicacao.titulo}" foi salva! Ela aparece no site em 1 a 2 minutos.`,
      });
      window.scrollTo({ top: 0 });
    } catch (e) {
      tratarErro(e);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <>
      <Head>
        <title>Painel | Monarquista</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/brasao.png" />
      </Head>

      <main className="page">
        <div className="texto painel">
          {carregando ? (
            <p className="vazio">Carregando…</p>
          ) : !sessao?.usuario ? (
            <Login
              configurado={sessao?.loginConfigurado !== false}
              aoEntrar={async (usuario) => {
                setAviso(null);
                setSessao((s) => ({ ...s, usuario }));
                if (sessao?.githubConfigurado) await carregarPublicacoes();
              }}
            />
          ) : (
            <>
              <div className="painel-topo">
                <span>
                  Olá, <strong>{sessao.usuario}</strong>
                </span>
                <span className="painel-topo-links">
                  <a href="/" target="_blank" rel="noreferrer">
                    Ver o site
                  </a>
                  <button type="button" className="link" onClick={sair}>
                    Sair
                  </button>
                </span>
              </div>

              <h1 className="titulo-noticia">Painel do site</h1>

              {aviso && <Aviso {...aviso} />}

              {!sessao.githubConfigurado ? (
                <Aviso
                  tipo="erro"
                  texto="O painel ainda não pode salvar: falta configurar o GITHUB_TOKEN na Vercel."
                />
              ) : form ? (
                <Formulario
                  form={form}
                  setForm={setForm}
                  previa={previa}
                  setPrevia={setPrevia}
                  ocupado={ocupado}
                  aoPublicar={publicar}
                  aoCancelar={() => {
                    setForm(null);
                    setPrevia(false);
                  }}
                  aoErro={(texto) => setAviso({ tipo: "erro", texto })}
                />
              ) : (
                <Lista
                  publicacoes={publicacoes}
                  ocupado={ocupado}
                  aoNova={() => {
                    setAviso(null);
                    setPrevia(false);
                    setForm(formularioVazio());
                  }}
                  aoEditar={editar}
                  aoApagar={excluir}
                />
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

function Aviso({ tipo, texto }) {
  return (
    <p className={`aviso aviso-${tipo}`} role={tipo === "erro" ? "alert" : "status"}>
      {texto}
    </p>
  );
}

function Login({ configurado, aoEntrar }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    try {
      const r = await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ usuario, senha }),
      });
      await aoEntrar(r.usuario);
    } catch (e2) {
      setErro(e2.message);
      setSenha("");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="campos" onSubmit={entrar}>
      <img className="brasao" src="/brasao.png" alt="" />
      <h1 className="titulo-noticia">Entrar no painel</h1>
      {!configurado && (
        <Aviso
          tipo="erro"
          texto="O login ainda não foi configurado na Vercel (ADMIN_USUARIO e ADMIN_SENHA)."
        />
      )}
      {erro && <Aviso tipo="erro" texto={erro} />}
      <label>
        Usuário
        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          required
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <button type="submit" className="botao" disabled={enviando}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

function Lista({ publicacoes, ocupado, aoNova, aoEditar, aoApagar }) {
  return (
    <>
      <button type="button" className="botao" onClick={aoNova}>
        + Nova publicação
      </button>

      {SECOES.map((secao) => (
        <section key={secao}>
          <h2>{NOMES_SECOES[secao]}</h2>
          {publicacoes[secao]?.length ? (
            <ul className="painel-lista">
              {publicacoes[secao].map((p) => (
                <li key={p.id}>
                  {p.imagem ? (
                    <img src={p.imagem} alt="" />
                  ) : (
                    <span className="sem-foto" aria-hidden="true" />
                  )}
                  <div>
                    <strong>{p.titulo}</strong>
                    <small>{[p.autor, p.data].filter(Boolean).join(" · ")}</small>
                  </div>
                  <span className="painel-acoes">
                    <button
                      type="button"
                      className="link"
                      disabled={ocupado}
                      onClick={() => aoEditar(secao, p)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="link perigo"
                      disabled={ocupado}
                      onClick={() => aoApagar(secao, p)}
                    >
                      Apagar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="vazio">Nenhuma publicação feita pelo painel ainda.</p>
          )}
        </section>
      ))}

      <p className="ajuda">
        As publicações mais antigas do site (feitas antes do painel) não aparecem aqui e
        continuam no ar normalmente.
      </p>
    </>
  );
}

function Formulario({ form, setForm, previa, setPrevia, ocupado, aoPublicar, aoCancelar, aoErro }) {
  const entradaFoto = useRef(null);
  const campo = (nome) => ({
    value: form[nome],
    onChange: (e) => setForm({ ...form, [nome]: e.target.value }),
  });
  const fotoMostrada = form.novaImagem?.previa || (!form.removerImagem && form.imagemAtual);

  async function escolherFoto(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    try {
      const novaImagem = await prepararFoto(arquivo);
      setForm({ ...form, novaImagem, removerImagem: false });
    } catch (err) {
      aoErro(err.message);
    } finally {
      e.target.value = "";
    }
  }

  if (previa) {
    return (
      <>
        <p className="ajuda">Assim a publicação vai aparecer no site:</p>
        <div className="previa">
          <ArtigoSimples
            item={{
              ...form,
              imagem: fotoMostrada || "",
            }}
          />
        </div>
        <div className="painel-botoes">
          <button type="button" className="botao" disabled={ocupado} onClick={aoPublicar}>
            {ocupado ? "Publicando…" : "Publicar"}
          </button>
          <button type="button" className="link" onClick={() => setPrevia(false)}>
            Voltar e continuar editando
          </button>
        </div>
      </>
    );
  }

  return (
    <form className="campos" onSubmit={aoPublicar}>
      <h2>{form.id ? "Editar publicação" : "Nova publicação"}</h2>

      <fieldset>
        <legend>Em qual aba do site?</legend>
        {SECOES.map((s) => (
          <label key={s} className="opcao">
            <input
              type="radio"
              name="secao"
              value={s}
              checked={form.secao === s}
              disabled={Boolean(form.id)}
              onChange={() => setForm({ ...form, secao: s })}
            />
            {NOMES_SECOES[s]}
          </label>
        ))}
      </fieldset>

      <label>
        Título
        <input {...campo("titulo")} required maxLength={200} />
      </label>

      <div className="lado-a-lado">
        <label>
          Autor <span className="opcional">(opcional)</span>
          <input {...campo("autor")} maxLength={120} placeholder="Ex.: Carlos Egert" />
        </label>
        <label>
          Data <span className="opcional">(opcional)</span>
          <input {...campo("data")} maxLength={60} />
        </label>
      </div>

      <div className="campo-foto">
        <span className="rotulo">
          Foto <span className="opcional">(opcional)</span>
        </span>
        {fotoMostrada && <img src={fotoMostrada} alt="Foto escolhida" />}
        <div className="painel-botoes">
          <button
            type="button"
            className="botao secundario"
            onClick={() => entradaFoto.current?.click()}
          >
            {fotoMostrada ? "Trocar foto" : "Escolher foto"}
          </button>
          {fotoMostrada && (
            <button
              type="button"
              className="link perigo"
              onClick={() => setForm({ ...form, novaImagem: null, removerImagem: true })}
            >
              Tirar foto
            </button>
          )}
        </div>
        <input
          ref={entradaFoto}
          type="file"
          accept="image/*"
          hidden
          onChange={escolherFoto}
        />
      </div>

      {fotoMostrada && (
        <label>
          Legenda da foto <span className="opcional">(opcional)</span>
          <input {...campo("legenda")} maxLength={300} />
        </label>
      )}

      <label>
        Resumo <span className="opcional">(opcional)</span>
        <textarea {...campo("resumo")} rows={3} maxLength={600} />
        <small className="ajuda">
          Aparece no cartão da lista. Se deixar em branco, usamos o começo do texto.
        </small>
      </label>

      <label>
        Texto
        <textarea {...campo("texto")} rows={16} required />
        <small className="ajuda">
          Deixe uma linha em branco entre os parágrafos. Para um subtítulo, comece a linha
          com <code>## </code>. Para uma citação, comece com <code>&gt; </code>. Para
          negrito, coloque entre <code>**dois asteriscos**</code>.
        </small>
      </label>

      <div className="painel-botoes">
        <button type="submit" className="botao" disabled={ocupado}>
          {ocupado ? "Publicando…" : form.id ? "Salvar alterações" : "Publicar"}
        </button>
        <button
          type="button"
          className="botao secundario"
          onClick={() => {
            if (!form.titulo.trim() || !form.texto.trim()) {
              aoErro("Escreva pelo menos o título e o texto para ver a prévia.");
              return;
            }
            setPrevia(true);
            window.scrollTo({ top: 0 });
          }}
        >
          Ver prévia
        </button>
        <button type="button" className="link" onClick={aoCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
