# Pet Gallery
Projeto de galeria de pets, solicitada pela Rede OK.

*Neste projeto você poderá conferir todas as raças de gatos conhecidas, podendo consultar detalhes, curiosidades e muito mais.*

## Como rodar o projeto

 - Faça um Git Clone deste repositório onde desejar em seu computador;
 - Abra a pasta do projeto na IDE de preferência, logo após isso, execute `npm install` no terminal para instalar as dependencias necessárias;
 - Após instalado as dependencias, rode o comando `npm run dev` para iniciar a aplicação em sua rede local (localhost);
 - Enjoy!

## Tecnologias e Libs Utilizadas

 - Next.js v15 (com App Router)
 - TypeScript
 - Tailwind CSS
 - Axios (Integração de API)
 - Jest (Testes)
 - Material UI (Interface)
 - API (https://thecatapi.com/)

## Informações úteis

O projeto conta com diversos detalhes sendo os principais:
 - Tabela de raças na rota inicial;
 - Página de detalhes da raça selecionada;
 - Paginação;
 - Tratamento de erros;
 - Loading para as páginas;
 - Page Not Found;
 - Responsividade para mobile e desktop;
 - Favoritar pets;

## Rotas

`{url}/`: Página Principal <br/>
`{url}/pet/:id` Página de detalhes do pet
