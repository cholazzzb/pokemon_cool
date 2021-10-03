/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

interface IRowProps {
  data: any;
  index: number;
  style: any;
}
const Row: FC<IRowProps> = (props) => {
  const { data, index, style } = props;
  const { moves } =
    data;

  return (
    <div style={style}>
      {moves[index].move.name}
    </div>
  );
};


interface TabMoveProps {
  moves: any;
}

const MoveContainerStyle = css`
  padding: 10px;
`;

const MoveStyle = css`
  padding: 5px;
  overflow: auto;
`;

const TabMoves: FC<TabMoveProps> = (props) => {
  const { moves } = props;
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
    <div css={MoveContainerStyle}>
      <List
        css={MoveStyle}
        height={150}
        itemCount={moves.length}
        itemSize={20}
        width={
          windowDimension.width > 420 ? 420 - 28 : windowDimension.width - 28
        }
        itemData={{
          moves:moves
        }}
      >
        {Row}
      </List>
    </div>
  );
};

export default TabMoves;
