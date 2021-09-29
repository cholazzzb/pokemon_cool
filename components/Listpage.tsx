/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FixedSizeList as List } from "react-window";

import { useEffect, useState } from "react";
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

const Listpage = () => {
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

  console.log(data)
  const Row = ({ index, style }) => (
    <div css={GridItemStyle} style={style}>
      <PokemonCard data={data.pokemons.results[index]} />
    </div>
  );

  return (
    <List
      css={GridStyle}
      height={windowDimension.height - 90}
      itemCount={data?.pokemons.results.length}
      itemSize={120}
      width={
        windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
      }
    >
      {Row}
    </List>
  );
};

export default Listpage;
