import {
  FC,
  useEffect,
  Fragment,
  useState,
  ChangeEvent,
  SyntheticEvent,
} from "react";

interface IAlertBody {
  name?: string;
  imgURL?: string;
  level: string;
  onClose: () => void;
}

const AlertBody: FC<IAlertBody> = (props) => {
  const { name, imgURL, level, onClose } = props;

  const [pokemonName, setPokemonName] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const submitForm = () => {
    if (saving && level === "success") {
      const sessStorage = window.sessionStorage.getItem("pokemon_cool");
      if (sessStorage) {
        const sessStorageObj = JSON.parse(sessStorage);
        const newPokemon = {
          ownedPokemon: [
            ...sessStorageObj.ownedPokemon,
            {
              name: name,
              imgURL: imgURL,
              attribute: { name: pokemonName },
            },
          ],
        };
        window.sessionStorage.setItem(
          "pokemon_cool",
          JSON.stringify(newPokemon)
        );
      } else {
        const newPokemon = {
          ownedPokemon: [
            { name: name, imgURL: imgURL, attribute: { name: pokemonName } },
          ],
        };
        window.sessionStorage.setItem(
          "pokemon_cool",
          JSON.stringify(newPokemon)
        );
      }
      onClose();
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
  };

  useEffect(() => {
    submitForm();
  }, [saving]);

  let body;
  switch (level) {
    case "success":
      body = (
        <div>
          <form>
            <label htmlFor="">Pokemon Name</label>
            <input value={pokemonName} onChange={handleChange} />
            <button onClick={handleSubmit}>Save!</button>
          </form>
        </div>
      );
      break;
    case "danger":
      body = <div></div>;

    default:
      body = <Fragment></Fragment>;
      break;
  }
  return body;
};

export default AlertBody;
