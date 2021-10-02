/** @jsxRuntime classic */
/** @jsx jsx */

import Card from "@components/Card";
import PokeImage from "@components/PokeImage";
import { css, jsx } from "@emotion/react";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OwnedPokemon from "@utils/OwnedPokemon";
import { getOwnedPokemonData, saveNewPokemon } from "@utils/session";
import { FC, useEffect, useState } from "react";

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
  const { imgURL, attributes, loadOwnedPokemon, setSelectedPokeName, setReleasing } =
    data;

  const execute = (pokeName: string) => {
    setSelectedPokeName(pokeName);
    setReleasing(true);
    loadOwnedPokemon();
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
        <PokeImage type={"grass"} image={imgURL} size={0}/>
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
  pokemonName: string;
  imgURL: string;
  attributes: string[];
  loadOwnedPokemon: () => void;
}

const CollectionList: FC<ICollectionListStyle> = (props) => {
  const { pokemonName, imgURL, attributes, loadOwnedPokemon } = props;
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
  }, []);

  const [selectedPokeName, setSelectedPokeName] = useState<string | null>(null);
  const [releasing, setReleasing] = useState<boolean>(false);

  const releasePokemon = (name: string) => {
    if (releasing) {
      const sessStorage = getOwnedPokemonData(window);
      let ownedPokemon = new OwnedPokemon(sessStorage);
      ownedPokemon.releasePokemon(name);
      saveNewPokemon(window, ownedPokemon.data);
      loadOwnedPokemon();
    }
  };

  useEffect(() => {
    console.log("releasing... Pokemon Name:", selectedPokeName);
    if (selectedPokeName) {
      releasePokemon(selectedPokeName);
    }
  }, [releasing]);

  return (
    <div>
      <Card headText={pokemonName} bodyText={attributes.length + " pokemons"} />
      <List
        height={150}
        itemCount={attributes.length}
        itemSize={60}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          imgURL: imgURL,
          attributes: attributes,
          loadOwnedPokemon: loadOwnedPokemon,
          setSelectedPokeName: setSelectedPokeName,
          setReleasing: setReleasing,
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default CollectionList;
