/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SuccessAlert from "./SuccessAlert";
import FailedAlert from "./FailedAlert";

const CatchPokemonStyle = css`
  position:fixed;
  right: 20px;
  bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 9999px
  display:flex;
  justify-content:center
  align-items:center;
`;

interface ICatchPokemonProps {
  iconColor: string;
  pokemonName: string;
  imgURL: string;
}

const CatchPokemon: FC<ICatchPokemonProps> = (props) => {
  const { iconColor, pokemonName, imgURL } = props;
  const [catchStatus, setCatchStatus] = useState<null | string>(null);
  const catchPokemon = async () => {
    const reset = async () => {
      setCatchStatus(null);
    };
    await reset();
    const successRate = Math.random();
    successRate > 0.5 ? setCatchStatus("SUCCESS") : setCatchStatus("FAILED");
  };

  let Alert;
  switch (catchStatus) {
    case "SUCCESS":
      Alert = (
        <SuccessAlert
          pokemonName={pokemonName}
          imgURL={imgURL}
          setCatchStatus={setCatchStatus}
        />
      );
      break;

    case "FAILED":
      Alert = <FailedAlert />;
      break;

    default:
      Alert = <div>Error</div>;
      break;
  }

  const CatchIconStyle = css`
    width: 70px;
    height: 70px;
    border-radius: 9999px;
    background-color: ${iconColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div css={CatchPokemonStyle}>
      <span css={CatchIconStyle} onClick={catchPokemon}>
        <FontAwesomeIcon icon={faPlus} />
        Catch!
      </span>
      {catchStatus && Alert}
    </div>
  );
};

export default CatchPokemon;
