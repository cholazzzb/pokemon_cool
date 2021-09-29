interface PokemonType {
  normal: string;
  fire: string;
  fighting: string;
  water: string;
  flying: string;
  grass: string;
  poison: string;
  electric: string;
  ground: string;
  psychic: string;
  rock: string;
  ice: string;
  bug: string;
  dragon: string;
  ghost: string;
  dark: string;
  steel: string;
}

export const getPrimaryColorFromType: PokemonType = {
  normal: "#a8a878",
  fire: "#f36b6c",
  fighting: "#c03528",
  water: "#76bcfc",
  flying: "#a890f0",
  grass: "#56d0b0",
  poison: "#a14ca0",
  electric: "",
  ground: "#e0c068",
  psychic: "#f15687",
  rock: "#b8a038",
  ice: "#98d8d8",
  bug: "#a8b82a",
  dragon: "#776bf8",
  ghost: "#705898",
  dark: "#705848",
  steel: "b8b8d0",
};

export const getSecondaryColorFromType: PokemonType = {
  normal: "#a8a878",
  fire: "#f47a7b",
  fighting: "#c03528",
  water: "#87cafc",
  flying: "#a890f0",
  grass: "#59dbc0",
  poison: "#a14ca0",
  electric: "",
  ground: "#e0c068",
  psychic: "#f15687",
  rock: "#b8a038",
  ice: "#98d8d8",
  bug: "#a8b82a",
  dragon: "#776bf8",
  ghost: "#705898",
  dark: "#705848",
  steel: "b8b8d0",
};
