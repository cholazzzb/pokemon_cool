/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

import Header from "@components/Header";
import PokemonCard from "@components/PokemonCard";
import { DETAILPAGE } from "@constants/route";
import RingGraph from "./PieChart";

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

const ListItemStyle = css`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  justify-content: center;
`;

interface IRowProps {
  data: any;
  index: number;
  style: any;
}

const PieChartDataDummy = [
  {
    name: "bulbasaur",
    imgURL: "",
    attributes: [{ name: "BOBI" }, { name: "BOBA" }],
  },
  {
    name: "chimcar",
    imgURL: "",
    attributes: [{ name: "BOBI" }],
  },
  {
    name: "geodude",
    imgURL: "",
    attributes: [{ name: "BOBI" }],
  },
];

const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  const { pokemons, setPage, setCurrentId, setCurrentName } = data;

  const handleClick = () => {
    setPage(DETAILPAGE);
    setCurrentId(pokemons.results[index].id);
    setCurrentName(pokemons.results[index].name);
  };

  return (
    <div onClick={handleClick} css={ListItemStyle} style={style}>
      {pokemons.results[index] && (
        <PokemonCard data={pokemons.results[index]} />
      )}
    </div>
  );
};

interface IListPage {
  pokemons: any;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentId: Dispatch<SetStateAction<number>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Listpage: FC<IListPage> = (props) => {
  const { pokemons, setCurrentPage, setCurrentId, setCurrentName } = props;
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
    <div style={{ padding: 10 }}>
      <Header caption="Total Owned:" />
      <RingGraph data={PieChartDataDummy} />
      <Header caption="Pokemon List:" />
      <List
        css={ListStyle}
        height={windowDimension.height - 350}
        itemCount={pokemons.count}
        itemSize={200}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          pokemons: pokemons,
          setPage: setCurrentPage,
          setCurrentId: setCurrentId,
          setCurrentName: setCurrentName,
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default Listpage;
