/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "@components/Header";
import { LISTPAGE } from "@constants/route";
import { getOwnedPokemonData } from "@utils/session";
import OwnedPokemonList from "./OwnedCollectionList";
import CollectionList from "./CollectionList";

interface IOwnedpage {
  name: string;
  imgURL: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const { setCurrentPage, setCurrentName } = props;
  const [ownedPokemon, setOwnedPokemon] = useState<any[]>([]);

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

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Header caption="Owned Pokemon" onBack={onBack} />
      <OwnedPokemonList
        ownedPokemon={ownedPokemon}
        loadOwnedPokemon={loadOwnedPokemon}
        setCurrPokemonIdx={setCurrPokemonIdx}
      />
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
