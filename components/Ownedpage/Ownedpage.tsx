/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "@components/Header";
import { LISTPAGE } from "@constants/route";
import OwnedPokemonList from "./OwnedPokemonList";
import CollectionList from "./CollectionList";
import { getOwnedPokemonData, getTotalPokemon } from "@utils/session";
import OwnedPokemon from "@utils/OwnedPokemon";

interface IOwnedpage {
  name: string;
  imgURL: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const { setCurrentPage } = props;
  const [ownedPokemonData, setOwnedPokemonData] = useState<any[]>([]);
  const [currPokemonIdx, setCurrPokemonIdx] = useState<number | null>(null);

  const onBack = () => {
    setCurrentPage(LISTPAGE);
  };

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
      `}
    >
      <Header caption="Owned Pokemon" onBack={onBack} />
      {ownedPokemonData?.length > 0 && (
        <OwnedPokemonList
          ownedPokemon={ownedPokemonData}
          totalOwnedPokemon={getTotalPokemon(ownedPokemonData)}
          loadOwnedPokemon={loadOwnedPokemon}
          setCurrPokemonIdx={setCurrPokemonIdx}
        />
      )}
      {ownedPokemonData?.length > 0 && typeof currPokemonIdx === "number" && (
        <CollectionList
          pokemonName={ownedPokemonData[currPokemonIdx].name}
          imgURL={ownedPokemonData[currPokemonIdx].imgURL}
          attributes={ownedPokemonData[currPokemonIdx].attributes}
          loadOwnedPokemon={loadOwnedPokemon}
        />
      )}
    </div>
  );
};

export default Ownedpage;
