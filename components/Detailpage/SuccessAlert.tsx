/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

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

const FormStyle = css`
  display: flex;
  flex-direction: column;
`;

const InputStyle = css`
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0px;
`;

interface ISuccessAlertProps {
  id: number;
  pokemonName: string;
  imgURL: string;
  color: string;
  setCatchStatus: Dispatch<SetStateAction<null | string>>;
}

const SuccessAlert: FC<ISuccessAlertProps> = (props) => {
  const { id, pokemonName, imgURL, color, setCatchStatus } = props;

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
    ownedPokemon.addPokemon(id, pokemonName, name, imgURL);
    saveNewPokemon(window, ownedPokemon.data);
    onClose();
  };

  useEffect(() => {
    if (onSaving) {
      submitForm();
    }
  });

  const ButtonStyle = css`
    background-color: ${color};
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0px;
  `;

  return (
    <Alert level="success" headText="Catching Pokemon">
      <div css={FormStyle}>
        Gotcha! Pokemon catched!!!
        <label>Give your pokemon name!</label>
        <input
          css={InputStyle}
          type="text"
          value={name}
          onChange={handleChangeName}
        />
        <button css={ButtonStyle} onClick={handleSubmit}>
          OK
        </button>
      </div>
    </Alert>
  );
};

export default SuccessAlert;
