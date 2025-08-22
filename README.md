# 🐈 Pet Gallery
Projeto de galeria de pets, solicitada pela Rede OK.

Uma galeria interativa de raças de gatos, solicitada pelo desafio da **Rede OK**. Explore diversas raças, descubra curiosidades e interaja com filtros e funcionalidades modernas.

---

## 📖 Demo

Acesse o projeto online: [Pet Gallery](https://pet-gallery-challenge.vercel.app)

---

## 🖥️ Funcionalidades

- Listagem de raças de gatos em uma tabela dinâmica.
- Página de detalhes para cada raça com informações enriquecidas.
- Paginação para melhor navegação.
- Sistema de busca por nome.
- Indicadores de carregamento (loading) e tratamento de erros para experiência mais fluida.
- Página personalizada para rotas não encontradas (*404 Not Found*).
- Responsivo para visão em dispositivos móveis e desktop.
- Sistema de favoritos para destacar suas raças preferidas.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Next.js (App Router)** – estrutura de frontend moderna com rotas dinâmicas.
- **TypeScript** – tipagem robusta que aumenta a confiabilidade do código.
- **Tailwind CSS** – estilização eficiente e semântico.
- **Material UI** – componentes visuais consistentes e elegantes.
- **Axios** – comunicação simples e eficaz com a API.
- **Jest** – testes automatizados para garantir qualidade do processo.
- **TheCatAPI** – fonte das imagens e informações das raças :contentReference[oaicite:0]{index=0}.

---

## 🔀 Rotas

`{url}/`: Página Principal <br/>
`{url}/pet/:id` Página de detalhes do pet

---

## 🔌 Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/andrelssn/pet-gallery-challenge.git

# Acesse a pasta do projeto
cd pet-gallery-challenge

# Instale as dependências
npm install

# Inicie em modo de desenvolvimento
npm run dev
