/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useEffect, useState } from "react";

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
  const { pokemonName, artwork, pokemonCollection, loadOwnedPokemon } = data;
  return (
    <div style={style}>
      {pokemonName}
      <PokemonInfo
        data={{
          id: "",
          name: pokemonName,
          artwork: artwork,
        }}
        attributeName={pokemonCollection[index].name}
        loadOwnedPokemon={loadOwnedPokemon}
      />
    </div>
  );
};

const ListStyle = css``;

interface ICollectionListStyle {
  pokemonName: string;
  artwork: string;
  pokemonCollection: any[];
  loadOwnedPokemon: () => void;
}

const CollectionList: FC<ICollectionListStyle> = (props) => {
  const { pokemonName, artwork, pokemonCollection, loadOwnedPokemon } = props;
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
  }, []);

  return (
    <div>
      <List
        css={ListStyle}
        height={150}
        itemCount={pokemonCollection.length}
        itemSize={120}
        layout="horizontal"
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          pokemonName: pokemonName,
          artwork: artwork,
          pokemonCollection: pokemonCollection,
          loadOwnedPokemon: loadOwnedPokemon,
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default CollectionList;
