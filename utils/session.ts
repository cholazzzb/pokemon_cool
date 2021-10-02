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