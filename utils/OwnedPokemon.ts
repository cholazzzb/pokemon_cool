interface IData {
  name: string;
  imgURL: string;
  attributes: {
    name: string;
  }[];
}

class OwnedPokemon {
  private _data: IData[] | null = null;

  constructor(data: IData[] | null) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  checkIfNameAlreadyExist(name: string): boolean {
    if (JSON.stringify(this._data).includes(name)) {
      return true;
    }
    return false;
  }

  checkIfPokemonAlreadyExist(pokemon: string): boolean {
    if (JSON.stringify(this._data).includes(pokemon)) {
      return true;
    }
    return false;
  }

  addPokemon(pokemonName: string, name: string, imgURL: string): boolean {
    if (this.checkIfNameAlreadyExist(name)) {
      return false;
    }
    if (this._data) {
      if (this.checkIfPokemonAlreadyExist(pokemonName)) {
        let pokemonIdx: any = this._data.findIndex(
          (pokemon) => pokemon.name === pokemonName
        );
        this._data[pokemonIdx].attributes.push({
          name: name,
        });
      } else {
        this._data.push({
          name: pokemonName,
          imgURL: imgURL,
          attributes: [{ name: name }],
        });
      }
    } else {
      this._data = [
        {
          name: pokemonName,
          imgURL: imgURL,
          attributes: [{ name: name }],
        },
      ];
    }

    return true;
  }

  releasePokemon(name: string) {
    const nameExist = this.checkIfNameAlreadyExist(name);
    let pokemonIdx: number = 0;
    let nameIdx: number = 0;

    if (nameExist && this._data) {
      this._data.some((pokemon, pokeIdx) =>
        pokemon.attributes.some((attri: any, attriIdx: any) => {
          console.log("CHECK THIS", attri.name, name)
          if (attri.name === name) {
            pokemonIdx = pokeIdx;
            nameIdx = attriIdx;
            return true;
          }
        })
      );
      if (this._data[pokemonIdx].attributes.length > 1) {
        this._data[pokemonIdx].attributes.splice(nameIdx, 1);
      } else {
        this._data.splice(pokemonIdx, 1);
      }
    }
  }
}

export default OwnedPokemon;
