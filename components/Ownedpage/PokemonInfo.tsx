/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import PokemonCard from "@components/PokemonCard";

const OverlayStyle = css`
  z-index: 50;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const PokemonInfoStyle = css`
  z-index: 50;
  position: relative;
  height: 100%;
  width: 100px;
  background-color: white;
`;

interface IPokemonInfoProps {
  data: any;
  attributeName: string;
}

const PokemonInfo: FC<IPokemonInfoProps> = (props) => {
  const { data, attributeName } = props;
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [releasing, setReleasing] = useState<boolean>(false);

  const releasePokemon = () => {
    if(releasing){
      console.log("relasing...", data, attributeName)
      const sessStorage = window.sessionStorage.getItem("pokemon_cool");
      if(sessStorage){
        const sessStorageObj = JSON.parse(sessStorage);
        let pokemons = sessStorageObj.ownedPokemon.find((pokemon:any) => pokemon.name ===data.name)
        console.log("here", sessStorageObj, pokemons)
      }
    }
  };

  useEffect(() => {
    releasePokemon();
  }, [releasing]);

  if (open) {
    return (
      <div css={OverlayStyle}>
        <div css={PokemonInfoStyle}>
          <button onClick={() => setReleasing(true)}>Release</button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onOpen}>
      <PokemonCard data={data} />
    </div>
  );
};
export default PokemonInfo;
