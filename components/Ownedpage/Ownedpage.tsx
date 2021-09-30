/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FixedSizeList as List } from "react-window";

import Header from "@components/Ownedpage/Header";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;

  return <div style={style}>Something</div>;
};

const ListStyle = css``;

const Ownedpagestyle = css`
  background-color: blue;
`;

interface IOwnedpage {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setCurrentName: Dispatch<SetStateAction<string>>;
}

const Ownedpage: FC<IOwnedpage> = (props) => {
  const { setCurrentPage, setCurrentName } = props;
  const [windowDimension, setWindowDimension] = useState({
    width: 1000,
    height: 666,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    setWindowDimension({ width, height });
  }, []);

  return (
    <div css={Ownedpagestyle}>
      <Header />
      <List
        css={ListStyle}
        height={windowDimension.height - 90}
        itemCount={12}
        itemSize={120}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          pokemons: [100],
        }}
      >
        {Row}
      </List>
      <div>
        <div>Bulbasaur</div>
        <div>Charmander</div>
      </div>
    </div>
  );
};

export default Ownedpage;
