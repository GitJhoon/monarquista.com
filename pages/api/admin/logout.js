import { apagarCookie } from "../../../lib/sessao.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido." });
  }
  res.setHeader("Set-Cookie", apagarCookie());
  return res.status(200).json({ ok: true });
}
