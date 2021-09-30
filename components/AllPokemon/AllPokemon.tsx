/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

import Header from "./Header";
import PokemonCard from "@components/PokemonCard";
import { DETAILPAGE } from "@constants/route";

const AllPokemonStyle = css`
  padding: 10px;
`;

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

const GridItemStyle = css`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  justify-content: center;
`;

interface RowProps {
  data: any;
  index: number;
  style: any;
}

const Row: FC<RowProps> = (props) => {
  const { data, index, style } = props;
  const { pokemons, setPage, setCurrentId, setCurrentName } = data;

  const handleClick = () => {
    setPage(DETAILPAGE);
    setCurrentId(pokemons.results[index].id);
    setCurrentName(pokemons.results[index].name);
  };

  return (
    <div onClick={handleClick} css={GridItemStyle} style={style}>
      {pokemons.results[index] && (
        <PokemonCard data={pokemons.results[index]} />
      )}
    </div>
  );
};

interface AllPokemonProps {
  pokemons: any;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
}

const AllPokemon: FC<AllPokemonProps> = (props) => {
  const { pokemons, setPage, setCurrentId, setCurrentName } = props;
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
    <div css={AllPokemonStyle}>
      <Header />
      <List
        css={ListStyle}
        height={windowDimension.height - 90}
        itemCount={pokemons.count}
        itemSize={120}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          pokemons: pokemons,
          setPage: setPage,
          setCurrentId: setCurrentId,
          setCurrentName: setCurrentName,
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default AllPokemon;
