/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

const CardStyle = css`
  text-transform: capitalize;
  padding: 10px;
`;

const CardHeaderStyle = css`
  font-size: 20px;
`;

const CardBodyStyle = css`
  font-size: 25px;
`;

interface ICard {
  headText: string;
  bodyText: string;
}

const Card: FC<ICard> = (props) => {
  return (
    <div css={CardStyle}>
      <div css={CardHeaderStyle}>{props.headText}</div>
      <div css={CardBodyStyle}>{props.bodyText}</div>
    </div>
  );
};

export default Card;
