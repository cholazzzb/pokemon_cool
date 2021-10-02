/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FixedSizeList as List } from "react-window";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "@components/Header";
import { LISTPAGE } from "@constants/route";
import { getOwnedPokemonData } from "@utils/session";
import CollectionList from "./CollectionList";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  console.log(data.ownedPokemon);
  const { ownedPokemon, loadOwnedPokemon } = data;
  return (
    <div style={style}>
      <CollectionList
        pokemonName={ownedPokemon[index].name}
        artwork={ownedPokemon[index].imgURL}
        pokemonCollection={ownedPokemon[index].attributes}
        loadOwnedPokemon={loadOwnedPokemon}
      />
    </div>
  );
};

const ListStyle = css``;

const Ownedpagestyle = css`
  width: 100%;
  background-color: blue;
`;

interface IOwnedpage {
  name: string;
  imgURL: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const { setCurrentPage, setCurrentName } = props;
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  const loadOwnedPokemon = () => {
    const sesStorage = getOwnedPokemonData(window);
    if (sesStorage) {
      setOwnedPokemon(sesStorage);
    }
  };

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
    loadOwnedPokemon();
  }, []);

  const onBack = () => {
    setCurrentPage(LISTPAGE);
  };

  return (
    <div css={Ownedpagestyle}>
      <Header caption="Owned Pokemon" onBack={onBack} />
      <List
        css={ListStyle}
        height={windowDimension.height - 90}
        itemCount={ownedPokemon.length}
        itemSize={120}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          ownedPokemon: ownedPokemon,
          loadOwnedPokemon: loadOwnedPokemon,
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default Ownedpage;
