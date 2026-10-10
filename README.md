# PokéStation

PokéStation é uma aplicação web para explorar Pokémon, montar equipes e organizar uma coleção. Os dados são consultados na [PokéAPI](https://pokeapi.co/), e favoritos e coleção ficam salvos no armazenamento local do navegador.

## Funcionalidades

- **Finder:** pesquisa por nome, consulta informações e salva Pokémon favoritos.
- **Team Builder:** monta equipes de até seis Pokémon, mostra atributos individuais e calcula o desempenho total.
- **Colecionador:** sorteia Pokémon e informa sua raridade.
- **Minha Coleção:** exibe os Pokémon capturados, permite removê-los e limita a coleção a 25.
- **Persistência local:** favoritos e coleção permanecem disponíveis no mesmo navegador por meio do `localStorage`.

### Páginas

| Página | Caminho |
| --- | --- |
| Menu principal | `/` |
| Finder | `/finder` |
| Team Builder | `/team-builder` |
| Colecionador | `/collector` |
| Minha Coleção | `/collection` |

## Tecnologias

- React 19
- TypeScript
- Vite 8
- React Router
- PokéAPI

## Requisitos

- Node.js `^20.19.0` ou `>=22.12.0` (requisito do Vite 8)
- npm

## Como executar localmente

Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd pokestation-react-ver
```

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm ci
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # verificação TypeScript e build de produção
npm run preview  # pré-visualização do build
npm run lint     # análise estática com ESLint
```

## Imagens e créditos

Os dados de Pokémon são consultados na [PokéAPI](https://pokeapi.co/). Os sprites usados nas páginas de busca, captura e equipe vêm das respostas da API; os sprites e artes oficiais referenciados por ela podem ser consultados no repositório [PokeAPI/sprites](https://github.com/PokeAPI/sprites).

Pokémon e seus nomes, personagens e marcas são propriedade de seus respectivos titulares. PokéStation é um projeto independente, sem afiliação ou endosso da Nintendo, The Pokémon Company ou Game Freak.

## Verificações

Antes de publicar alterações, execute:

```bash
npm run lint
npm run build
```

## Direitos autorais

Copyright © 2026 — PokéStation React v1  
Autoria: EmanuBuque (GitHub)

O código-fonte original e os elementos originais deste projeto são reservados, salvo indicação em contrário. Consulte [`LICENSE.md`](./LICENSE.md) para conhecer o aviso de direitos reservados.

Para solicitar autorização de uso dos elementos originais, entre em contato com a autora.

As bibliotecas, ferramentas, marcas, imagens e demais materiais de terceiros continuam sujeitos aos respectivos direitos e termos aplicáveis.