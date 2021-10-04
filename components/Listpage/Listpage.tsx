/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC, Dispatch, SetStateAction } from "react";

import Header from "@components/Header";
import PokemonList from "./PokemonList";

const ListPageStyle = css`
  padding: 10px;
  height: 100%;
`;

interface IListPage {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentId: Dispatch<SetStateAction<number>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Listpage: FC<IListPage> = (props) => {
  const { setCurrentPage, setCurrentId, setCurrentName } = props;

  return (
    <div css={ListPageStyle}>
      <Header caption="Pokemon List" />
      <PokemonList
        setCurrentPage={setCurrentPage}
        setCurrentId={setCurrentId}
        setCurrentName={setCurrentName}
      />
    </div>
  );
};

export default Listpage;
