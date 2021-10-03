/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import PokemonInfo from "./PokemonInfo";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  console.log(data.ownedPokemon);
  const { ownedPokemon, loadOwnedPokemon, setCurrPokemonIdx } = data;
  return (
    <div onClick={() => setCurrPokemonIdx(index)} style={style}>
      <PokemonInfo
        data={{
          id: "",
          name: ownedPokemon[index].name,
          artwork: ownedPokemon[index].imgURL,
        }}
        loadOwnedPokemon={loadOwnedPokemon}
      />
    </div>
  );
};

const ListStyle = css`
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

interface IOwnedPokemonListProps {
  ownedPokemon: any;
  loadOwnedPokemon: () => void;
  setCurrPokemonIdx: Dispatch<SetStateAction<number | null>>;
}
const OwnedPokemonList: FC<IOwnedPokemonListProps> = (props) => {
  const { ownedPokemon, loadOwnedPokemon, setCurrPokemonIdx } = props;
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
    loadOwnedPokemon();
  }, []);

  return (
    <List
      css={ListStyle}
      height={200}
      itemCount={ownedPokemon.length}
      itemSize={330}
      layout="horizontal"
      width={
        windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
      }
      itemData={{
        ownedPokemon: ownedPokemon,
        loadOwnedPokemon: loadOwnedPokemon,
        setCurrPokemonIdx: setCurrPokemonIdx,
      }}
    >
      {Row}
    </List>
  );
};

export default OwnedPokemonList;
