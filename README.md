# monarquista.com

## Painel de edição (`/admin`)

Em **monarquista.com/admin** dá para entrar com usuário e senha e publicar
notícias e mídias (título, autor, data, foto e texto) sem mexer no código.
Cada publicação é gravada neste repositório (pasta `content/` e fotos em
`public/uploads/`) e a Vercel publica o site de novo em 1 a 2 minutos.

### Configuração (uma vez só, na Vercel)

Em **Vercel → projeto → Settings → Environment Variables**, crie:

| Nome            | Valor                                                        |
| --------------- | ------------------------------------------------------------ |
| `ADMIN_USUARIO` | nome de login, ex.: `Carlos`                                 |
| `ADMIN_SENHA`   | a senha do painel                                            |
| `GITHUB_TOKEN`  | token do GitHub com acesso de escrita a este repositório     |

Opcionais: `GITHUB_REPO` (padrão `GitJhoon/monarquista.com`),
`GITHUB_BRANCH` (padrão `main`), `ADMIN_SEGREDO` (assinatura do cookie).

Depois de salvar as variáveis, faça um **Redeploy** para elas valerem.

**Como criar o `GITHUB_TOKEN`:** GitHub → Settings → Developer settings →
Personal access tokens → **Fine-grained tokens** → Generate new token.
Em *Repository access* escolha só `monarquista.com`; em *Permissions →
Contents* escolha **Read and write**. Copie o token e cole na Vercel.

A senha **nunca** deve ser escrita no código: o repositório é público.
Para trocar a senha, mude `ADMIN_SENHA` na Vercel e faça Redeploy (isso
também desconecta quem estiver logado).

### Como o texto é formatado

- linha em branco separa parágrafos;
- `## ` no começo da linha cria um subtítulo;
- `> ` no começo da linha cria uma citação;
- `**assim**` deixa em negrito.

As publicações antigas (escritas direto em `components/`) continuam
funcionando e não aparecem no painel.
