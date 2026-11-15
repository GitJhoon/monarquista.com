// Grava as publicações do painel diretamente no repositório do GitHub.
// Cada gravação vira um commit, e a Vercel publica o site de novo sozinha.
//
// Variáveis na Vercel:
//   GITHUB_TOKEN   token com permissão "Contents: Read and write" neste repositório
//   GITHUB_REPO    opcional, padrão "GitJhoon/monarquista.com"
//   GITHUB_BRANCH  opcional, padrão "main"

const API = "https://api.github.com";

function config() {
  return {
    token: process.env.GITHUB_TOKEN,
    repo: process.env.GITHUB_REPO || "GitJhoon/monarquista.com",
    branch: process.env.GITHUB_BRANCH || "main",
  };
}

export function githubConfigurado() {
  return Boolean(process.env.GITHUB_TOKEN);
}

async function gh(caminho, opcoes = {}, fetchFn = fetch) {
  const { token } = config();
  const { permitir404, ...resto } = opcoes;
  const resp = await fetchFn(`${API}${caminho}`, {
    ...resto,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "monarquista-admin",
      ...(opcoes.body ? { "Content-Type": "application/json" } : {}),
      ...(opcoes.headers || {}),
    },
  });
  if (resp.status === 404 && permitir404) return null;
  if (!resp.ok) {
    const texto = await resp.text().catch(() => "");
    throw new Error(`GitHub respondeu ${resp.status} em ${caminho}: ${texto.slice(0, 300)}`);
  }
  return resp.status === 204 ? null : resp.json();
}

// Lista os arquivos .json de uma pasta e devolve o conteúdo de cada um.
export async function lerPublicacoes(secao, fetchFn = fetch) {
  const { repo, branch } = config();
  const itens = await gh(
    `/repos/${repo}/contents/content/${secao}?ref=${encodeURIComponent(branch)}`,
    { permitir404: true },
    fetchFn
  );
  if (!Array.isArray(itens)) return [];

  const arquivos = itens.filter((i) => i.type === "file" && i.name.endsWith(".json"));
  const lidos = await Promise.all(
    arquivos.map(async (a) => {
      const dados = await gh(
        `/repos/${repo}/contents/${a.path}?ref=${encodeURIComponent(branch)}`,
        {},
        fetchFn
      );
      try {
        return JSON.parse(Buffer.from(dados.content, "base64").toString("utf8"));
      } catch {
        return null;
      }
    })
  );
  return lidos
    .filter(Boolean)
    .sort((a, b) => String(b.criadoEm || "").localeCompare(String(a.criadoEm || "")));
}

// Grava vários arquivos (e apaga outros) num único commit.
// arquivos: [{ caminho, base64 }] ou [{ caminho, apagar: true }]
export async function gravarCommit(mensagem, arquivos, fetchFn = fetch) {
  const { repo, branch } = config();

  const ref = await gh(`/repos/${repo}/git/ref/heads/${branch}`, {}, fetchFn);
  const ultimoCommit = ref.object.sha;
  const commit = await gh(`/repos/${repo}/git/commits/${ultimoCommit}`, {}, fetchFn);

  const arvore = [];
  for (const a of arquivos) {
    if (a.apagar) {
      arvore.push({ path: a.caminho, mode: "100644", type: "blob", sha: null });
      continue;
    }
    const blob = await gh(
      `/repos/${repo}/git/blobs`,
      { method: "POST", body: JSON.stringify({ content: a.base64, encoding: "base64" }) },
      fetchFn
    );
    arvore.push({ path: a.caminho, mode: "100644", type: "blob", sha: blob.sha });
  }

  const novaArvore = await gh(
    `/repos/${repo}/git/trees`,
    { method: "POST", body: JSON.stringify({ base_tree: commit.tree.sha, tree: arvore }) },
    fetchFn
  );
  const novoCommit = await gh(
    `/repos/${repo}/git/commits`,
    {
      method: "POST",
      body: JSON.stringify({
        message: mensagem,
        tree: novaArvore.sha,
        parents: [ultimoCommit],
      }),
    },
    fetchFn
  );
  await gh(
    `/repos/${repo}/git/refs/heads/${branch}`,
    { method: "PATCH", body: JSON.stringify({ sha: novoCommit.sha }) },
    fetchFn
  );
  return novoCommit.sha;
}
