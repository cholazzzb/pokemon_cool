/** @jsxRuntime classic */
/** @jsx jsx */
import Card from "@components/Card";
import { css, jsx } from "@emotion/react";
import { Dispatch, FC, SetStateAction } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import PokemonInfo from "./PokemonInfo";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  const { ownedPokemon, setActivePokeIdx } = data;
  return (
    <div onClick={() => setActivePokeIdx(index)} style={style}>
      <PokemonInfo
        data={{
          id: ownedPokemon[index].id,
          name: ownedPokemon[index].name,
          artwork: ownedPokemon[index].imgURL,
        }}
      />
    </div>
  );
};

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

interface IOwnedPokemonListProps {
  ownedPokemon: any;
  totalOwnedPokemon: number;
  setActivePokeIdx: Dispatch<SetStateAction<number | null>>;
}
const OwnedPokemonList: FC<IOwnedPokemonListProps> = (props) => {
  const { ownedPokemon, totalOwnedPokemon, setActivePokeIdx } = props;

  return (
    <div style={{ height: "100%" }}>
      <Card
        headText="Total Owned Pokemon"
        bodyText={totalOwnedPokemon.toString()}
      />
      <div style={{ height: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              css={ListStyle}
              height={height}
              width={width}
              itemCount={ownedPokemon.length}
              itemSize={330}
              layout="horizontal"
              itemData={{
                ownedPokemon: ownedPokemon,
                setActivePokeIdx: setActivePokeIdx,
              }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default OwnedPokemonList;
