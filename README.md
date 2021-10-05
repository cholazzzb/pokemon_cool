# pokemon_cool
A seven days project.

A web app that have 3 pages: Pokemon List, Pokemon
Detail, and My Pokemon List. The web app UI/UX is mobile-first & single page application (SPA)

- Pokemon List page:

1. See a thousand of pokemons with it images and types.
2. Move to Pokemon Detail page when a pokemon card clicked
3. Total owned pokemons (in the badge at top right) 

- Pokemon Detail page:

1. Pokemon attributes (height, weight, abilites)
2. Pokemon base stats (Hp, attack, defense, sp.attack, sp.defense, speed)
3. Pokemon moves
4. Catch pokemon with 50% probability
5. Give name to a catched pokemon
6. Audio when pokemon catched

- My Pokemon List:

1. See all your catched pokemons (The pokemons in this list persist even after a full page reload but will deleted after closing the browser)
2. See pokemon names
3. Release pokemon

## Tech Stack

- Next.js
- GraphQL using Apollo Client (https://www.apollographql.com/) 
- CSS-in-JS using Emotion (https://emotion.sh/)
- Unit Test using Jest (https://jestjs.io/) and React Testing Library
  (https://testing-library.com/)
- Webpack

## Tech Stack Details

- React with React Hooks and React Context
- GraphQL data source: https://github.com/mazipan/graphql-pokeapi
- CSS-in-JS (Emotion): use CSS, JS and keyframes features 
- Testing: some unit testing
- Webpack: bundling and to load .mp3 files

## Performance (Tested with Lighthouse)

- Performance: 83
- Accesssibility: 83
- Best Practice: 100
- SEO: 83

See `ligthouse-report.html` for details

## Deployed Link (thanks to vercel)

https://pokemon-cool.vercel.app/
