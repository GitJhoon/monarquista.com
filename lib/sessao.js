// Login do painel /admin.
//
// Usuário e senha NÃO ficam no código (o repositório é público).
// Eles são configurados na Vercel, em Settings → Environment Variables:
//   ADMIN_USUARIO  (ex.: Carlos)
//   ADMIN_SENHA
// Depois do login, o navegador guarda um cookie assinado que vale 7 dias.
import crypto from "node:crypto";

const COOKIE = "monarquista_sessao";
const VALIDADE_SEGUNDOS = 7 * 24 * 60 * 60;

function segredo() {
  // Usa ADMIN_SEGREDO se existir; senão deriva de valores que já são secretos.
  // Trocar a senha encerra todas as sessões abertas.
  const base =
    process.env.ADMIN_SEGREDO ||
    `${process.env.ADMIN_SENHA || ""}|${process.env.GITHUB_TOKEN || ""}`;
  return crypto.createHash("sha256").update(`monarquista:${base}`).digest();
}

function assinar(texto) {
  return crypto.createHmac("sha256", segredo()).update(texto).digest("base64url");
}

function iguais(a, b) {
  // Compara sem vazar o tamanho ou o conteúdo pelo tempo de resposta.
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function loginConfigurado() {
  return Boolean(process.env.ADMIN_USUARIO && process.env.ADMIN_SENHA);
}

export function conferirLogin(usuario, senha) {
  if (!loginConfigurado()) return false;
  // Nome de usuário não diferencia maiúsculas: "carlos" ou "Carlos".
  const okUsuario = iguais(
    String(usuario || "").trim().toLowerCase(),
    process.env.ADMIN_USUARIO.trim().toLowerCase()
  );
  const okSenha = iguais(senha || "", process.env.ADMIN_SENHA);
  return okUsuario && okSenha;
}

export function criarCookie(usuario, agora = Date.now()) {
  const dados = Buffer.from(
    JSON.stringify({ u: usuario, exp: Math.floor(agora / 1000) + VALIDADE_SEGUNDOS })
  ).toString("base64url");
  const valor = `${dados}.${assinar(dados)}`;
  return `${COOKIE}=${valor}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${VALIDADE_SEGUNDOS}`;
}

export function apagarCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function lerSessao(req, agora = Date.now()) {
  if (!loginConfigurado()) return null;
  const cabecalho = req.headers?.cookie || "";
  const par = cabecalho
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`));
  if (!par) return null;

  const [dados, assinatura] = par.slice(COOKIE.length + 1).split(".");
  if (!dados || !assinatura || !iguais(assinatura, assinar(dados))) return null;

  try {
    const { u, exp } = JSON.parse(Buffer.from(dados, "base64url").toString("utf8"));
    if (!exp || exp * 1000 < agora) return null;
    return { usuario: u };
  } catch {
    return null;
  }
}
