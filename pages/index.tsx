/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import type { NextPage } from "next";
import Head from "next/head";

import { FC, useState, Dispatch, SetStateAction } from "react";
import { useQuery, gql } from "@apollo/client";

import Layout from "@components/Layout";
import Listpage from "@components/Listpage/Listpage";
import Detailpage from "@components/Detailpage/Detailpage";
import Ownedpage from "@components/Ownedpage/Ownedpage";
import Navigator from "@components/Navigator";
import Search from "@components/Search";
import { DETAILPAGE, LISTPAGE, OWNEDPAGE } from "@constants/route";

const color = "white";

const example = css`
  &:hover {
    color: ${color};
  }
`;

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        id
        name
        image
        artwork
        dreamworld
      }
    }
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
        <Ownedpage
        name={currentName}
        imgURL={pokemons.results[currentId -1].artwork}
          setCurrentPage={setCurrentPage}
          setCurrentName={setCurrentName}
        />
      );

    case DETAILPAGE:
      return (
        <Detailpage
          id={currentId}
          name={currentName}
          imgURL={pokemons.results[currentId -1].artwork}
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

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 1000, offset: 0 },
  });

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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentId={currentId}
          setCurrentId={setCurrentId}
          currentName={currentName}
          setCurrentName={setCurrentName}
          pokemons={data.pokemons}
        />
        <Navigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Search />
      </Layout>
    </div>
  );
};

export default Home;
