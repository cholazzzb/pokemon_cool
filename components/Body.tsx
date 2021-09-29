/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

const BodyStyle = css`
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

interface BodyProps {
  children: any;
}

const Body: FC<BodyProps> = (props) => {
  return <div css={BodyStyle}>{props.children}</div>;
};

export default Body;
