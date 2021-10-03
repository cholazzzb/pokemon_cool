import {
  getOwnedPokemonData,
  saveNewPokemon,
} from "../../utils/session";

test("getOwnedPokemonData(): should get null from session storage", () => {
  window.sessionStorage.clear();
  const ownedPokemon = getOwnedPokemonData(window);
  expect(ownedPokemon).toBeNull();
});

test("saveNewPokemon(): should get Bulbasaur with attribute name: Mocha", () => {
  window.sessionStorage.clear();
  const newPokemon = {
    data: [{ name: "bulbasaur", imgURL: "", attributes: { name: "Mocha" } }],
  };
  saveNewPokemon(window, newPokemon);
  const ownedPokemon = getOwnedPokemonData(window);
  expect(ownedPokemon).toMatchObject(newPokemon);
});