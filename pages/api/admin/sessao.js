import { lerSessao, loginConfigurado } from "../../../lib/sessao.js";
import { githubConfigurado } from "../../../lib/github.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const sessao = lerSessao(req);
  return res.status(200).json({
    usuario: sessao?.usuario || null,
    loginConfigurado: loginConfigurado(),
    githubConfigurado: githubConfigurado(),
  });
}
