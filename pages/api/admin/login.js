import { conferirLogin, criarCookie, loginConfigurado } from "../../../lib/sessao.js";

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido." });
  }
  if (!loginConfigurado()) {
    return res.status(503).json({
      erro: "O login ainda não foi configurado na Vercel (ADMIN_USUARIO e ADMIN_SENHA).",
    });
  }

  const { usuario, senha } = req.body || {};
  if (!conferirLogin(usuario, senha)) {
    await esperar(1000); // atrasa quem tenta adivinhar a senha
    return res.status(401).json({ erro: "Usuário ou senha incorretos." });
  }

  res.setHeader("Set-Cookie", criarCookie(process.env.ADMIN_USUARIO.trim()));
  return res.status(200).json({ usuario: process.env.ADMIN_USUARIO.trim() });
}
