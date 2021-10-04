/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { FC, useContext, useEffect, useState } from "react";
import Card from "@components/Card";
import PokeImage from "@components/PokeImage";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  OwnedPokemonContext,
  OwnedPokemonContextType,
} from "context/OwnedPokemonContext";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

const ListItemStyle = css`
  display: flex;
  width: 100%;
  margin: 20px 0px;
  height: 30px;
  align-items: center;
  background-color: yellow;
`;

interface IRowProps {
  data: any;
  index: number;
  style: any;
}

const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  const { id, attributes, setSelectedPokeName, triggerRelease } = data;

  const execute = (pokeName: string) => {
    setSelectedPokeName(pokeName);
    triggerRelease();
  };

  const PokeImageStyle = css`
    display: flex;
    width: 20%;
  `;
  const MainStyle = css`
    width: 60%;
  `;
  const ReleaseStyle = css`
    display: flex;
    justify-content: center;
    width: 20%;
  `;

  const ReleaseIconStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    background-color: gray;
    color: white;
  `;

  return (
    <div css={ListItemStyle} style={style}>
      <div css={PokeImageStyle}>
        <PokeImage type={"grass"} id={id} size={0} />
      </div>
      <div css={MainStyle}>
        <div>{attributes[index].name}</div>
        <div>Something later</div>
      </div>
      <div css={ReleaseStyle}>
        <span
          css={ReleaseIconStyle}
          onClick={() => execute(attributes[index].name)}
        >
          <FontAwesomeIcon icon={faBan} />
        </span>
      </div>
    </div>
  );
};

interface ICollectionListStyle {
  activePokeIdx: number;
}

const CollectionList: FC<ICollectionListStyle> = (props) => {
  const {activePokeIdx } = props;

  const [selectedPokeName, setSelectedPokeName] = useState<string | null>(null);
  const [releasing, setReleasing] = useState<boolean>(false);

  const triggerRelease = () => {
    setReleasing(!releasing);
  };

  const { ownedPokemon, savePokemon, releasePokemon } = useContext(
    OwnedPokemonContext
  ) as OwnedPokemonContextType;

  const pokemonId = ownedPokemon[activePokeIdx].id
  const pokemonName = ownedPokemon[activePokeIdx].name
  const pokemonAttributes = ownedPokemon[activePokeIdx].attributes

  useEffect(() => {
    if (selectedPokeName) {
      releasePokemon(selectedPokeName);
    }
  }, [releasing]);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <Card headText={pokemonName} bodyText={pokemonAttributes.length + " pokemons"} />
      <div
        css={css`
          height: 100%;
        `}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={pokemonAttributes.length}
              itemSize={60}
              itemData={{
                id: pokemonId,
                attributes: pokemonAttributes,
                setSelectedPokeName: setSelectedPokeName,
                triggerRelease: triggerRelease,
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

export default CollectionList;
