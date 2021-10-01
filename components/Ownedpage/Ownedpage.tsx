/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FixedSizeList as List } from "react-window";

import PokemonCard from "@components/PokemonCard";
import Header from "@components/Ownedpage/Header";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import PokemonInfo from "./PokemonInfo";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  console.log(data.ownedPokemon);
  const { ownedPokemon } = data;
  return (
    <div style={style}>
      <PokemonCard
        data={{
          id: "",
          name: ownedPokemon[index].name,
          artwork: ownedPokemon[index].imgURL,
        }}
      />
    </div>
  );
};

const ListStyle = css``;

const Ownedpagestyle = css`
  display: flex;
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

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });

    const sesStorage = window.sessionStorage.getItem("pokemon_cool");
    if (sesStorage) {
      const sesStorageObj = JSON.parse(sesStorage);
      setOwnedPokemon(sesStorageObj.ownedPokemon);
    }
    console.log("ownedPokemon huahah", sesStorage);
  }, []);

  return (
    <div css={Ownedpagestyle}>
      <Header setCurrentPage={setCurrentPage} />
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
        }}
      >
        {Row}
      </List>
      <PokemonInfo />
    </div>
  );
};

export default Ownedpage;
