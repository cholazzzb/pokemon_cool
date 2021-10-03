/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import PokemonCard from "@components/PokemonCard";
import { getOwnedPokemonData, saveNewPokemon } from "@utils/session";
import OwnedPokemon from "@utils/OwnedPokemon";

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
  loadOwnedPokemon: () => void
}

const PokemonInfo: FC<IPokemonInfoProps> = (props) => {
  const { data , loadOwnedPokemon} = props;
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [releasing, setReleasing] = useState<boolean>(false);

  const releasePokemon = () => {
    if (releasing) {
      const sessStorage = getOwnedPokemonData(window);
      let ownedPokemon = new OwnedPokemon(sessStorage);
      ownedPokemon.releasePokemon(data.name);
      saveNewPokemon(window, ownedPokemon.data);
      loadOwnedPokemon()
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
    <div>
      <PokemonCard data={data} />
    </div>
  );
};
export default PokemonInfo;
