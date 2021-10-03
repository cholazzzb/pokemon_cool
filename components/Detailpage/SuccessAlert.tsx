import Alert from "@components/Alert";
import OwnedPokemon from "@utils/OwnedPokemon";
import { getOwnedPokemonData, saveNewPokemon } from "@utils/session";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

interface ISuccessAlertProps {
  pokemonName: string;
  imgURL: string;
  setCatchStatus: Dispatch<SetStateAction<null | string>>;
}

const SuccessAlert: FC<ISuccessAlertProps> = (props) => {
  const { pokemonName, imgURL, setCatchStatus } = props;

  const onClose = () => {
    setCatchStatus(null);
  };

  const [name, setName] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [onSaving, setOnSaving] = useState<boolean>(false);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setOnSaving(true);
  };
  const submitForm = () => {
    const sessStorage = getOwnedPokemonData(window);
    let ownedPokemon = new OwnedPokemon(sessStorage);
    ownedPokemon.addPokemon(pokemonName, name, imgURL);
    saveNewPokemon(window, ownedPokemon.data);
    onClose();
  };

  useEffect(() => {
    if (onSaving) {
      submitForm();
    }
  });

  return (
    <Alert level="success" headText="Catching Pokemon">
      <label>Pokemon Name</label>
      <input type="text" value={name} onChange={handleChangeName} />
      <button onClick={handleSubmit}>Save!</button>
    </Alert>
  );
};

export default SuccessAlert;
