/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import type { NextPage } from "next";
import Head from "next/head";

import { FC, useState, Dispatch, SetStateAction } from "react";

import Layout from "@components/Layout";
import Listpage from "@components/Listpage/Listpage";
import Detailpage from "@components/Detailpage/Detailpage";
import Ownedpage from "@components/Ownedpage/Ownedpage";
import Navigator from "@components/Navigator";
import { DETAILPAGE, LISTPAGE, OWNEDPAGE } from "@constants/route";
import useLoadOwnedPoke from "hooks/useLoadOwnedPoke";
import { OwnedPokemonContext } from "context/OwnedPokemonContext";

interface IContentProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  currentName: string;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Content: FC<IContentProps> = (props) => {
  const {
    currentPage,
    setCurrentPage,
    currentId,
    setCurrentId,
    currentName,
    setCurrentName,
  } = props;

  switch (currentPage) {
    case LISTPAGE:
      return (
        <Listpage
          setCurrentPage={setCurrentPage}
          setCurrentId={setCurrentId}
          setCurrentName={setCurrentName}
        />
      );

    case DETAILPAGE:
      return (
        <Detailpage
          id={currentId}
          setCurrentId={setCurrentId}
          name={currentName}
          setCurrentName={setCurrentName}
          setCurrentPage={setCurrentPage}
        />
      );

    case OWNEDPAGE:
      return <Ownedpage />;

    default:
      return <div>ERROR</div>;
  }
};

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("LISTPAGE");
  const [currentId, setCurrentId] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("");

  const OwnedPokemonContextValue = useLoadOwnedPoke();

  return (
    <OwnedPokemonContext.Provider value={OwnedPokemonContextValue}>
        <Head>
          <title>Pokemon Cool</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
          <Content
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            currentId={currentId}
            setCurrentId={setCurrentId}
            currentName={currentName}
            setCurrentName={setCurrentName}
          />
          <Navigator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Layout>
    </OwnedPokemonContext.Provider>
  );
};

export default Home;
