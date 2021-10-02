/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FixedSizeList as List } from "react-window";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "@components/Header";
import { LISTPAGE } from "@constants/route";
import { getOwnedPokemonData } from "@utils/session";
import CollectionList from "./CollectionList";
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

const Ownedpagestyle = css`
  width: 100%;
`;

interface IOwnedpage {
  name: string;
  imgURL: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const { setCurrentPage, setCurrentName } = props;
  const [ownedPokemon, setOwnedPokemon] = useState<any[]>([]);
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  const [currPokemonIdx, setCurrPokemonIdx] = useState<number | null>(null);

  const onBack = () => {
    setCurrentPage(LISTPAGE);
  };

  useEffect(() => {
    console.log("?", currPokemonIdx);
    currPokemonIdx !== null ? console.log("ownDEDSDF", ownedPokemon) : null;
  }, [ownedPokemon, currPokemonIdx]);

  const loadOwnedPokemon = () => {
    if (currPokemonIdx) {
      setCurrPokemonIdx(null);
    }
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

  return (
    <div css={Ownedpagestyle}>
      <Header caption="Owned Pokemon" onBack={onBack} />
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
      {currPokemonIdx !== null ? (
        <CollectionList
          pokemonName={ownedPokemon[currPokemonIdx].name}
          imgURL={ownedPokemon[currPokemonIdx].imgURL}
          attributes={ownedPokemon[currPokemonIdx].attributes}
          loadOwnedPokemon={loadOwnedPokemon}
        />
      ) : null}
    </div>
  );
};

export default Ownedpage;
