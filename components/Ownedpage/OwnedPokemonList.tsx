/** @jsxRuntime classic */
/** @jsx jsx */
import Card from "@components/Card";
import { css, jsx } from "@emotion/react";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  const { ownedPokemon, loadOwnedPokemon, setCurrPokemonIdx } = data;
  return (
    <div onClick={() => setCurrPokemonIdx(index)} style={style}>
      <PokemonInfo
        data={{
          id: ownedPokemon[index].id,
          name: ownedPokemon[index].name,
          artwork: ownedPokemon[index].imgURL,
        }}
        loadOwnedPokemon={loadOwnedPokemon}
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
  loadOwnedPokemon: () => void;
  setCurrPokemonIdx: Dispatch<SetStateAction<number | null>>;
}
const OwnedPokemonList: FC<IOwnedPokemonListProps> = (props) => {
  const {
    ownedPokemon,
    totalOwnedPokemon,
    loadOwnedPokemon,
    setCurrPokemonIdx,
  } = props;
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
    <Fragment>
      <div>
      <Card
        headText="Total Owned Pokemon"
        bodyText={totalOwnedPokemon.toString()}
        />
        </div>
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
                loadOwnedPokemon: loadOwnedPokemon,
                setCurrPokemonIdx: setCurrPokemonIdx,
              }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </Fragment>
  );
};

export default OwnedPokemonList;
