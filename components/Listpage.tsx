/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import React, { FC, useState } from "react";
import Detailpage from "./Detailpage";
import AllPokemon from "./AllPokemon";

interface ContentPropsType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  currentName: string;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
}

const Content: FC<ContentPropsType> = (props) => {
  const {
    page,
    setPage,
    currentId,
    setCurrentId,
    currentName,
    setCurrentName,
  } = props;
  switch (page) {
    case "ALLPOKEMON":
      return (
        <AllPokemon
          setPage={setPage}
          currentId={currentId}
          setCurrentId={setCurrentId}
          currentName={currentName}
          setCurrentName={setCurrentName}
        />
      );

    case "DETAILPAGE":
      return <Detailpage setPage={setPage} id={currentId} name={currentName} />;

    default: 
    return <></>
  }
};

const Listpage = () => {
  const [page, setPage] = useState<string>("ALLPOKEMON");
  const [currentId, setCurrentId] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("");

  return (
    <Content
      page={page}
      setPage={setPage}
      currentId={currentId}
      setCurrentId={setCurrentId}
      currentName={currentName}
      setCurrentName={setCurrentName}
    />
  );
};

export default Listpage;
