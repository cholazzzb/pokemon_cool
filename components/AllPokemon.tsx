/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FixedSizeList as List } from "react-window";

import { FC, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import PokemonCard from "components/PokemonCard";

const GridStyle = css`
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

const POKEMONS_QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

interface RowProps {
  data: any;
  index: number;
  style: any;
}

const Row: FC<RowProps> = (props) => {
  const { data, index, style } = props;
  console.log("HI", data);
  return (
    <div css={GridItemStyle} style={style}>
      <PokemonCard data={data.pokemons.results[index]} />
    </div>
  );
};

interface AllPokemonProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  currentName: string;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
}

const AllPokemon: FC<AllPokemonProps> = (props) => {
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
  }, []);

  const { loading, error, data } = useQuery(POKEMONS_QUERY);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  console.log(data);

  return (
    <List
      css={GridStyle}
      height={windowDimension.height - 90}
      itemCount={data?.pokemons.results.length}
      itemSize={120}
      width={
        windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
      }
      itemData={{ pokemons: data.pokemons }}
    >
      {Row}
    </List>
  );
};

export default AllPokemon;
