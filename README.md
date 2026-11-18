# Breakpoint Tênis

Jogo de navegador de carreira no tênis. Criado por Geovanne.

Versão atual: 5.5

O jogo inteiro fica em um único arquivo (`index.html`), sem build. Funciona offline e pode ser instalado como app (PWA).

## Publicação

Cada envio para o ramo `main` é publicado automaticamente pela Vercel.
Outros ramos ganham um link de teste próprio, sem mexer no site oficial.

Configuração do projeto na Vercel:

- Framework Preset: Other
- Build Command: vazio
- Output Directory: vazio (raiz)

## Arquivos do site

| Arquivo | Para que serve |
|---|---|
| `index.html` | o jogo completo |
| `sw.js` | cache offline; o nome do cache muda a cada versão para os celulares receberem a atualização |
| `manifest.webmanifest` | dados do app instalável |
| `icon-*.png`, `apple-touch-icon.png` | ícones |
| `og-image.jpg` | imagem de compartilhamento em redes sociais |

## Ranking online

A pasta `api/` tem a função `ranking.js`, que guarda o ranking entre amigos num banco Redis da Upstash.
Para ativar: na Vercel, abra o projeto → Storage → crie um banco Upstash for Redis e conecte ao projeto.
As variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN` são criadas sozinhas; depois é só publicar de novo.
Sem o banco, o jogo funciona normalmente e a aba Online avisa que o ranking ainda não está ativo.

## Pasta `dev/`

Arquivos usados para montar e testar o jogo. Não são publicados no site (ver `.vercelignore`).

- `dev/patches/`: módulos e scripts que geram cada versão a partir da anterior.
- `dev/tests/`: testes automáticos de tela (Playwright) e o simulador de carreiras usado no balanceamento.

## Ao lançar uma versão nova

1. Atualize `index.html`.
2. Troque o nome do cache em `sw.js` (por exemplo, `breakpoint-v52` → `breakpoint-v53`).
3. Faça o commit no `main`.

## Fontes e bibliotecas

- Archivo, Newsreader e JetBrains Mono: SIL Open Font License 1.1.
- qrcode-generator: licença MIT.
