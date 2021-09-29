/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

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
  return (
    <div css={MoveContainerStyle}>
      {moves.map((move: { [key: string]: { [key: string]: string } }) => (
        <div key={move.move.name} css={MoveStyle}>
          {move.move.name}
        </div>
      ))}
    </div>
  );
};

export default TabMoves;
