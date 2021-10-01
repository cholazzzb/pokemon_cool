export const getOwnedPokemonData = (window: any) => {
  const ownedPokemonStr = window.sessionStorage.getItem("ownedPokemon");
  if (ownedPokemonStr) {
    const ownedPokemon = JSON.parse(ownedPokemonStr);
    return ownedPokemon;
  } else {
    return null;
  }
};

export const saveNewPokemon = (window: any, newPokemon: any) => {
  window.sessionStorage.setItem("ownedPokemon", JSON.stringify(newPokemon));
};

export const isNameAlreadyExist = (window: any, name: string) => {
  const ownedPokemon = getOwnedPokemonData(window);
  if (JSON.stringify(ownedPokemon).includes(name)) {
    return true;
  }

  return false;
};

export const isPokemonAlreadyExist = (window: any, pokemonName: string) => {
  return isNameAlreadyExist(window, pokemonName);
};
