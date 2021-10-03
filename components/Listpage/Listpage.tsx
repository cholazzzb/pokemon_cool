/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { FC, Dispatch, SetStateAction } from "react";

import Header from "@components/Header";
import RingGraph from "./PieChart";
import PokemonList from "./PokemonList";
import Search from "@components/Search";

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

interface IListPage {
  pokemons: any;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentId: Dispatch<SetStateAction<number>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Listpage: FC<IListPage> = (props) => {
  const { pokemons, setCurrentPage, setCurrentId, setCurrentName } = props;

  return (
    <div style={{ padding: 10 }}>
      <Header caption="Total Owned:" />
      <RingGraph data={PieChartDataDummy} />
      <Header caption="Pokemon List:" />
      <PokemonList
        pokemons={pokemons}
        setCurrentPage={setCurrentPage}
        setCurrentId={setCurrentId}
        setCurrentName={setCurrentName}
      />
      <Search />
    </div>
  );
};

export default Listpage;
