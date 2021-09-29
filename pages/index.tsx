/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import type { NextPage } from "next";
import Head from "next/head";

import { FC, useState } from "react";
import Layout from "@components/Layout";
import Listpage from "@components/Listpage/Listpage";
import Ownedpage from "@components/Ownedpage";
import { LISTPAGE, OWNEDPAGE } from "@constants/route";

const color = "white";

const example = css`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: ${color};
  }
`;

const containerStyle = css`
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

interface ContentPropsType {
  page: string;
}

const Content: FC<ContentPropsType> = (props) => {
  const { page } = props;

  switch (page) {
    case LISTPAGE:
      return <Listpage />;

    case OWNEDPAGE:
      return <Ownedpage />;
    default:
      return <></>;
  }
};

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("LISTPAGE");

  return (
    <div>
      <Head>
        <title>Pokemon Cool</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Content page={currentPage} />
      </Layout>
    </div>
  );
};

export default Home;
