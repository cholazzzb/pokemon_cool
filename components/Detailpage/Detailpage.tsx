/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, useState } from "react";

import {
  getPrimaryColorFromType,
  getSecondaryColorFromType,
} from "@components/util";
import Header from "@components/Header";

import Tab from "./Tab";
import TabContainer from "./TabContainer";
import Overview from "./Overview";
import CatchPokemon from "./CatchPokemon";

import useQueryPokeDetail from "hooks/useQueryPokeDetail";

interface DetailPageProps {
  id: number;
  name: string;
  imgURL: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Detailpage: FC<DetailPageProps> = (props) => {
  const { id, name, imgURL, setCurrentPage } = props;
  const onBack = () => {
    setCurrentPage("LISTPAGE");
  };

  const [currentTab, setCurrentTab] = useState(0);
  const { loading, error, data } = useQueryPokeDetail(name);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { types, ...others } = data.pokemon;

  const primColor = getPrimaryColorFromType(types[0].type.name);
  const seconColor = getSecondaryColorFromType(types[0].type.name);
  const DetailpageStyle = css`
    background-color: ${primColor};
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  return (
    <div css={DetailpageStyle}>
      <Header caption="" onBack={onBack} />
      <Overview id={id} name={name} imgURL={imgURL} types={types} />
      <TabContainer
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        primColor={primColor}
      >
        <Tab currentTab={currentTab} id={id} name={name} {...others} />
      </TabContainer>
      <CatchPokemon
        id={id}
        iconColor={seconColor}
        pokemonName={name}
        imgURL={imgURL}
      />
    </div>
  );
};

export default Detailpage;
