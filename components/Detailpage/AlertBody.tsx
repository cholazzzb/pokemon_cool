import { FC, useEffect, useState, ChangeEvent, SyntheticEvent } from "react";

import {
  getOwnedPokemonData,
  saveNewPokemon
} from "utils/session";

import OwnedPokemon from "../../utils/OwnedPokemon"

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
    const sessStorage = getOwnedPokemonData(window)
    let ownedPokemon = new OwnedPokemon(sessStorage)
    ownedPokemon.addPokemon(name, pokemonName, imgURL)
    saveNewPokemon(window, ownedPokemon.data)
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
