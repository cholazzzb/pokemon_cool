/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, Fragment, useContext, useState } from "react";
import OwnedPokemonList from "./OwnedPokemonList";
import CollectionList from "./CollectionList";

import { getTotalPokemon } from "@utils/session";

import PieChart from "./PieChart";
import useLoadOwnedPoke from "hooks/useLoadOwnedPoke";
import { OwnedPokemonContext, OwnedPokemonContextType } from "context/OwnedPokemonContext";

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
  const { ownedPokemon, savePokemon, releasePokemon } = useContext(
    OwnedPokemonContext
  ) as OwnedPokemonContextType;
  const [activePokeIdx, setActivePokeIdx] = useState<number|null>(null)

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        overflow: auto;
      `}
    >
      <div css={BodyStyle}>
        {ownedPokemon?.length > 0 ? (
          <Fragment>
            <PieChart data={PieChartDataDummy} />
            <OwnedPokemonList
              ownedPokemon={ownedPokemon}
              totalOwnedPokemon={getTotalPokemon(ownedPokemon)}
              setActivePokeIdx={setActivePokeIdx}
            />
          </Fragment>
        ) : (
          <div css={EmptyStyle}>You don't have any pokemon yet</div>
        )}
        {ownedPokemon?.length > 0 && typeof activePokeIdx === "number" && (
          <CollectionList
            id={ownedPokemon[activePokeIdx].id}
            pokemonName={ownedPokemon[activePokeIdx].name}
            imgURL={ownedPokemon[activePokeIdx].imgURL}
            attributes={ownedPokemon[activePokeIdx].attributes}
          />
        )}
      </div>
    </div>
  );
};

export default Ownedpage;
