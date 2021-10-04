/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, useState } from "react";

import SuccessAlert from "./SuccessAlert";
import FailedAlert from "./FailedAlert";
import Image from "next/image";

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
  id: number;
  iconColor: string;
  pokemonName: string;
}

const CatchPokemon: FC<ICatchPokemonProps> = (props) => {
  const {id, iconColor, pokemonName } = props;
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
        id={id}
          pokemonName={pokemonName}
          color={iconColor}
          setCatchStatus={setCatchStatus}
        />
      );
      break;

    case "FAILED":
      Alert = <FailedAlert iconColor={iconColor} catchPokemon={catchPokemon} />;
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
        <Image src="/pokeball.svg" width={30} height={30} />
        Catch!
      </span>
      {catchStatus && Alert}
    </div>
  );
};

export default CatchPokemon;
