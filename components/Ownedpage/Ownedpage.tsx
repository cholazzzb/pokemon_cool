/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, Fragment, useEffect, useState } from "react";
import Header from "@components/Header";
import OwnedPokemonList from "./OwnedPokemonList";
import CollectionList from "./CollectionList";

import { getOwnedPokemonData, getTotalPokemon } from "@utils/session";
import OwnedPokemon from "@utils/OwnedPokemon";

import PieChart from "./PieChart";

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

const EmptyStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 4px 0px;
`;

const BodyStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

interface IOwnedpage {
  name: string;
  imgURL: string;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const [ownedPokemonData, setOwnedPokemonData] = useState<any[]>([]);
  const [currPokemonIdx, setCurrPokemonIdx] = useState<number | null>(null);

  const loadOwnedPokemon = () => {
    const sessStorage = getOwnedPokemonData(window);
    let ownedPokemon = new OwnedPokemon(sessStorage);
    console.log(ownedPokemon.data, "sessMem");

    if (ownedPokemon.data) {
      setOwnedPokemonData(ownedPokemon.data);
      setCurrPokemonIdx(0);
    } else {
      setOwnedPokemonData([]);
      setCurrPokemonIdx(null);
    }
  };

  useEffect(() => {
    loadOwnedPokemon();
  }, []);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        overflow: auto;
      `}
    >
      <Header caption="Total Owned:" />
      <div css={BodyStyle}>
        {ownedPokemonData?.length > 0 ? (
          <Fragment>
            <PieChart data={PieChartDataDummy} />
            <OwnedPokemonList
              ownedPokemon={ownedPokemonData}
              totalOwnedPokemon={getTotalPokemon(ownedPokemonData)}
              loadOwnedPokemon={loadOwnedPokemon}
              setCurrPokemonIdx={setCurrPokemonIdx}
            />
          </Fragment>
        ) : (
          <div css={EmptyStyle}>You don't have any pokemon yet</div>
        )}
        {ownedPokemonData?.length > 0 && typeof currPokemonIdx === "number" && (
          <CollectionList
            id={ownedPokemonData[currPokemonIdx].id}
            pokemonName={ownedPokemonData[currPokemonIdx].name}
            imgURL={ownedPokemonData[currPokemonIdx].imgURL}
            attributes={ownedPokemonData[currPokemonIdx].attributes}
            loadOwnedPokemon={loadOwnedPokemon}
          />
        )}
      </div>
    </div>
  );
};

export default Ownedpage;
