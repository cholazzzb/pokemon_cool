import {
  getOwnedPokemonData,
  saveNewPokemon,
  isNameAlreadyExist,
  isPokemonAlreadyExist,
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

describe("Check isNameAlreadyExist Function", () => {
  test("isNameAlreadyExist(): should return true", () => {
    window.sessionStorage.clear();
    const newPokemon = {
      data: [{ name: "bulbasaur", imgURL: "", attributes: { name: "Mocha" } }],
    };
    saveNewPokemon(window, newPokemon);
    const nameAlreadyExist = isNameAlreadyExist(window, "Mocha");
    expect(nameAlreadyExist).toBeTruthy();
  });

  test("isNameAlreadyExist(): should return false (there is no data)", () => {
    window.sessionStorage.clear();
    const nameAlreadyExist = isNameAlreadyExist(window, "Mocha");
    expect(nameAlreadyExist).toBeFalsy();
  });

  test("isNameAlreadyExist(): should return false (The name is not exist yet)", () => {
    window.sessionStorage.clear();
    const newPokemon = {
      data: [{ name: "bulbasaur", imgURL: "", attributes: { name: "Mocha" } }],
    };
    saveNewPokemon(window, newPokemon);
    const nameAlreadyExist = isNameAlreadyExist(window, "Mochi");
    expect(nameAlreadyExist).toBeFalsy();
  });
});

describe("Check isPokemonAlreadyExist Function", () => {
  test("isPokemonAlreadyExist(): should return true", () => {
    window.sessionStorage.clear();
    const newPokemon = {
      data: [{ name: "bulbasaur", imgURL: "", attributes: { name: "Mocha" } }],
    };
    saveNewPokemon(window, newPokemon);
    const pokemonAlreadyExist = isPokemonAlreadyExist(window, "bulbasaur");
    expect(pokemonAlreadyExist).toBeTruthy();
  });

  test("isPokemonAlreadyExist(): should return false (there is no data)", () => {
    window.sessionStorage.clear();
    const pokemonAlreadyExist = isPokemonAlreadyExist(window, "bulbasaur");
    expect(pokemonAlreadyExist).toBeFalsy();
  });

  test("isPokemonAlreadyExist(): should return false (The pokemon is not exist yet)", () => {
    window.sessionStorage.clear();
    const newPokemon = {
      data: [{ name: "bulbasaur", imgURL: "", attributes: { name: "Mocha" } }],
    };
    saveNewPokemon(window, newPokemon);
    const pokemonAlreadyExist = isPokemonAlreadyExist(window, "chimcar");
    expect(pokemonAlreadyExist).toBeFalsy();
  });
});
