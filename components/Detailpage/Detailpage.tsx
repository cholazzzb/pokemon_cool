/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Dispatch, FC, SetStateAction, useState } from "react";

import Header from "@components/Header";
import Tab from "./Tab";
import TabContainer from "./TabContainer";
import Overview from "./Overview";

import {
  getPrimaryColorFromType,
  getSecondaryColorFromType,
} from "@utils/colorTheme";

import useQueryPokeDetail from "hooks/API/useQueryPokeDetail";

interface DetailPageProps {
  id: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  name: string;
  setCurrentName: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Detailpage: FC<DetailPageProps> = (props) => {
  const { id, setCurrentId, name, setCurrentName, setCurrentPage } = props;
  const onBack = () => {
    setCurrentPage("LISTPAGE");
  };

  const [currentTab, setCurrentTab] = useState(0);
  const { loading, error, data } = useQueryPokeDetail(name);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { types, ...others } = data.pokemon;

  const primColor = getPrimaryColorFromType(types[0].type.name);
  const DetailpageStyle = css`
    background-color: ${primColor};
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `;

  return (
    <div css={DetailpageStyle}>
      <Header onBack={onBack} />
      <Overview
        id={id}
        setCurrentId={setCurrentId}
        name={name}
        setCurrentName={setCurrentName}
        types={types}
      />
      <TabContainer
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        primColor={primColor}
      >
        <Tab currentTab={currentTab} id={id} name={name} {...others} />
      </TabContainer>
    </div>
  );
};

export default Detailpage;
