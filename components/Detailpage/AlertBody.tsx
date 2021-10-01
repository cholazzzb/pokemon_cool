import { FC, useEffect, useState, ChangeEvent, SyntheticEvent } from "react";

import {
  getOwnedPokemonData,
  isNameAlreadyExist,
  isPokemonAlreadyExist,
  saveNewPokemon,
} from "utils/session";

interface IAlertBody {
  name: string;
  imgURL: string;
  onClose: () => void;
}

const AlertBody: FC<IAlertBody> = (props) => {
  const { name, imgURL, onClose } = props;

  const [pokemonName, setPokemonName] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const submitForm = () => {
    const ownedPokemon = getOwnedPokemonData(window);
    let newPokemon
    if (ownedPokemon) {
      const nameExist = isNameAlreadyExist(ownedPokemon, pokemonName);
      console.log("nameExist", nameExist);
      if (!nameExist) {
        const pokemonExist = isPokemonAlreadyExist(ownedPokemon, name);
        if (pokemonExist) {
          newPokemon = {};
        } else {
          newPokemon = {
            ownedPokemon: [
              ...ownedPokemon,
              {
                name: name,
                imgURL: imgURL,
                attributes: [{ name: pokemonName }],
              },
            ],
          };
        }
        saveNewPokemon(window, newPokemon);
      } else {
        // Give Error Alert (That name already exist in your pokemons!)
      }
    } else {
      newPokemon = {
        ownedPokemon: [
          { name: name, imgURL: imgURL, attributes: [{ name: pokemonName }] },
        ],
      };
      saveNewPokemon(window, newPokemon);
    }
    onClose();
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
  };

  useEffect(() => {
    if (saving) {
      submitForm();
    }
  }, [saving]);

  return (
    <div>
      <form>
        <label>Pokemon Name</label>
        <input value={pokemonName} onChange={handleChange} />
        <button onClick={handleSubmit}>Save!</button>
      </form>
    </div>
  );
};

export default AlertBody;
