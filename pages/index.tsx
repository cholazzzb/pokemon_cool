/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import type { NextPage } from "next";
import Head from "next/head";

import { FC, useState, Dispatch, SetStateAction } from "react";

import Layout from "@components/Layout";
import Listpage from "@components/Listpage/Listpage";
import Detailpage from "@components/Detailpage/Detailpage";
import Ownedpage from "@components/Ownedpage/Ownedpage";
import Navigator from "@components/Navigator";
import { DETAILPAGE, LISTPAGE, OWNEDPAGE } from "@constants/route";
import useQueryPokemons from "hooks/useQueryPokemons";

const color = "white";

const example = css`
  &:hover {
    color: ${color};
  }
`;

interface IContentProps {
  pokemons: any;
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  currentName: string;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Content: FC<IContentProps> = (props) => {
  const {
    pokemons,
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
          pokemons={pokemons}
          setCurrentPage={setCurrentPage}
          setCurrentId={setCurrentId}
          setCurrentName={setCurrentName}
        />
      );

    case OWNEDPAGE:
      return (
        <div
          css={css`
            margin: 0 0 65px 0;
            height: 100%;
          `}
        >
          <Ownedpage
            name={currentName}
            imgURL={pokemons.results[currentId - 1].artwork}
          />
        </div>
      );

    case DETAILPAGE:
      return (
        <Detailpage
          id={currentId}
          name={currentName}
          imgURL={pokemons.results[currentId - 1].artwork}
          setCurrentPage={setCurrentPage}
        />
      );

    default:
      return <div>ERROR</div>;
  }
};

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("LISTPAGE");
  const [currentId, setCurrentId] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("");

  const { loading, error, data } = useQueryPokemons();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <Head>
        <title>Pokemon Cool</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Content
          pokemons={data.pokemons}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentId={currentId}
          setCurrentId={setCurrentId}
          currentName={currentName}
          setCurrentName={setCurrentName}
        />
        <Navigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Layout>
    </div>
  );
};

export default Home;
