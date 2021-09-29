/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, useState, Dispatch, SetStateAction } from "react";

import { useQuery, gql } from "@apollo/client";

import Detailpage from "@components/Detailpage/Detailpage";
import AllPokemon from "@components/AllPokemon/AllPokemon";
import { ALLPOKEMON, DETAILPAGE } from "@constants/route";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        id
        name
        image
        artwork
        dreamworld
      }
    }
  }
`;

interface ContentPropsType {
  pokemons: any;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  currentName: string;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Content: FC<ContentPropsType> = (props) => {
  const {
    pokemons,
    page,
    setPage,
    currentId,
    setCurrentId,
    currentName,
    setCurrentName,
  } = props;

  switch (page) {
    case ALLPOKEMON:
      return (
        <AllPokemon
          pokemons={pokemons}
          setPage={setPage}
          setCurrentId={setCurrentId}
          setCurrentName={setCurrentName}
        />
      );

    case DETAILPAGE:
      return <Detailpage setPage={setPage} id={currentId} name={currentName} />;

    default:
      return <></>;
  }
};

const Listpage = () => {
  const [page, setPage] = useState<string>("ALLPOKEMON");
  const [currentId, setCurrentId] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("");

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 1000, offset: 0 },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <Content
      page={page}
      setPage={setPage}
      currentId={currentId}
      setCurrentId={setCurrentId}
      currentName={currentName}
      setCurrentName={setCurrentName}
      pokemons={data.pokemons}
    />
  );
};

export default Listpage;
