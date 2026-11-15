// Lê, na hora de gerar o site, as publicações salvas pelo painel /admin.
// Cada publicação é um arquivo .json em content/noticias ou content/midias.
import fs from "node:fs";
import path from "node:path";

export function lerSecao(secao) {
  const pasta = path.join(process.cwd(), "content", secao);
  if (!fs.existsSync(pasta)) return [];

  return fs
    .readdirSync(pasta)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(pasta, f), "utf8"));
      } catch {
        return null; // arquivo com defeito não derruba o site
      }
    })
    .filter(Boolean)
    .sort((a, b) => String(b.criadoEm || "").localeCompare(String(a.criadoEm || "")));
}
