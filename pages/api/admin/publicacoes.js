import { lerSessao } from "../../../lib/sessao.js";
import { githubConfigurado, lerPublicacoes } from "../../../lib/github.js";
import { SECOES } from "../../../lib/secoes.js";
import { ErroUsuario, apagar, salvar, validar } from "../../../lib/publicacoes.js";

// Fotos chegam aqui já reduzidas pelo navegador; 4 MB dá folga.
export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const sessao = lerSessao(req);
  if (!sessao) return res.status(401).json({ erro: "Faça login novamente." });
  if (!githubConfigurado()) {
    return res.status(503).json({ erro: "Falta configurar o GITHUB_TOKEN na Vercel." });
  }

  try {
    if (req.method === "GET") {
      const listas = await Promise.all(SECOES.map((s) => lerPublicacoes(s)));
      const resultado = Object.fromEntries(SECOES.map((s, i) => [s, listas[i]]));
      return res.status(200).json(resultado);
    }

    if (req.method === "POST") {
      // Só aceita pedidos vindos do próprio site.
      if (req.headers["content-type"]?.split(";")[0] !== "application/json") {
        return res.status(415).json({ erro: "Formato inválido." });
      }
      const validado = validar(req.body);
      if (validado.erro) return res.status(400).json({ erro: validado.erro });
      const publicacao = await salvar(validado, sessao.usuario);
      return res.status(200).json({ publicacao });
    }

    if (req.method === "DELETE") {
      await apagar(req.query.secao, req.query.id, sessao.usuario);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ erro: "Método não permitido." });
  } catch (e) {
    if (e instanceof ErroUsuario) return res.status(400).json({ erro: e.message });
    console.error(e);
    return res.status(500).json({
      erro: "Não consegui salvar no GitHub. Tente de novo em instantes.",
    });
  }
}
