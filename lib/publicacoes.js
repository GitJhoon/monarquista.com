// Regras para criar, editar e apagar publicações do painel /admin.
import crypto from "node:crypto";
import { SECOES } from "./secoes.js";
import { gravarCommit, lerPublicacoes } from "./github.js";

const TIPOS_IMAGEM = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const LIMITE_IMAGEM_BYTES = 3 * 1024 * 1024;

export function criarId(titulo, agora = new Date()) {
  const base = String(titulo || "publicacao")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  const dia = agora.toISOString().slice(0, 10);
  const sufixo = crypto.randomBytes(2).toString("hex");
  return `${base || "publicacao"}-${dia}-${sufixo}`;
}

function idValido(id) {
  return typeof id === "string" && /^[a-z0-9-]{1,100}$/.test(id);
}

function texto(v, max) {
  return String(v ?? "").trim().slice(0, max);
}

// Confere o que veio do formulário. Devolve { erro } ou { dados }.
export function validar(corpo) {
  const secao = corpo?.secao;
  if (!SECOES.includes(secao)) return { erro: "Escolha a seção: Notícias ou Mídias." };

  const dados = {
    titulo: texto(corpo.titulo, 200),
    autor: texto(corpo.autor, 120),
    data: texto(corpo.data, 60),
    resumo: texto(corpo.resumo, 600),
    texto: texto(corpo.texto, 100_000),
    legenda: texto(corpo.legenda, 300),
  };
  if (!dados.titulo) return { erro: "Escreva um título." };
  if (!dados.texto) return { erro: "Escreva o texto da publicação." };
  if (!dados.resumo) {
    // Sem resumo, usa o começo do texto no cartão da lista.
    const inicio = dados.texto.replace(/[#>*]/g, "").replace(/\s+/g, " ").trim();
    dados.resumo = inicio.length > 220 ? `${inicio.slice(0, 220).trim()}…` : inicio;
  }

  let imagem = null;
  if (corpo.imagem) {
    const ext = TIPOS_IMAGEM[corpo.imagem.tipo];
    if (!ext) return { erro: "A imagem precisa ser JPG, PNG ou WEBP." };
    const base64 = String(corpo.imagem.base64 || "").replace(/^data:[^,]*,/, "");
    const bytes = Buffer.from(base64, "base64");
    if (!bytes.length) return { erro: "Não consegui ler a imagem." };
    if (bytes.length > LIMITE_IMAGEM_BYTES) return { erro: "A imagem é grande demais." };
    imagem = { ext, base64: bytes.toString("base64") };
  }

  if (corpo.id !== undefined && corpo.id !== null && !idValido(corpo.id)) {
    return { erro: "Publicação inválida." };
  }

  return {
    secao,
    id: corpo.id || null,
    removerImagem: Boolean(corpo.removerImagem),
    dados,
    imagem,
  };
}

function json(obj) {
  return Buffer.from(JSON.stringify(obj, null, 2) + "\n", "utf8").toString("base64");
}

// Cria ou edita. Devolve a publicação gravada.
export async function salvar(validado, usuario, fetchFn = fetch, agora = new Date()) {
  const { secao, dados, imagem, removerImagem } = validado;
  let anterior = null;

  if (validado.id) {
    const existentes = await lerPublicacoes(secao, fetchFn);
    anterior = existentes.find((p) => p.id === validado.id);
    if (!anterior) throw new ErroUsuario("Essa publicação não existe mais.");
  }

  const id = anterior?.id || criarId(dados.titulo, agora);
  const arquivos = [];
  let caminhoImagem = removerImagem ? "" : anterior?.imagem || "";

  if (imagem) {
    caminhoImagem = `/uploads/${id}-${crypto.randomBytes(3).toString("hex")}.${imagem.ext}`;
    arquivos.push({ caminho: `public${caminhoImagem}`, base64: imagem.base64 });
  }
  const imagemAntiga = anterior?.imagem;
  if (imagemAntiga && imagemAntiga !== caminhoImagem && imagemAntiga.startsWith("/uploads/")) {
    arquivos.push({ caminho: `public${imagemAntiga}`, apagar: true });
  }

  const publicacao = {
    id,
    ...dados,
    imagem: caminhoImagem,
    criadoEm: anterior?.criadoEm || agora.toISOString(),
    atualizadoEm: agora.toISOString(),
    criadoPor: anterior?.criadoPor || usuario,
  };
  arquivos.push({ caminho: `content/${secao}/${id}.json`, base64: json(publicacao) });

  const acao = anterior ? "Edita" : "Publica";
  await gravarCommit(`${acao} "${dados.titulo}" (painel, ${usuario})`, arquivos, fetchFn);
  return publicacao;
}

export async function apagar(secao, id, usuario, fetchFn = fetch) {
  if (!SECOES.includes(secao) || !idValido(id)) throw new ErroUsuario("Publicação inválida.");
  const existentes = await lerPublicacoes(secao, fetchFn);
  const alvo = existentes.find((p) => p.id === id);
  if (!alvo) throw new ErroUsuario("Essa publicação não existe mais.");

  const arquivos = [{ caminho: `content/${secao}/${id}.json`, apagar: true }];
  if (alvo.imagem?.startsWith("/uploads/")) {
    arquivos.push({ caminho: `public${alvo.imagem}`, apagar: true });
  }
  await gravarCommit(`Apaga "${alvo.titulo}" (painel, ${usuario})`, arquivos, fetchFn);
}

export class ErroUsuario extends Error {}
