/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { getSecondaryColorFromType } from "./util";

interface IChipProps {
  type: string;
}

const TypeChip: FC<IChipProps> = (props) => {
  const { type } = props;
  const bgColor = getSecondaryColorFromType(type);

  const ChipStyle = css`
    min-width: 24px;
    padding: 8px;
    border-radius: 12px;
    background-color: ${bgColor};
    color: white;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    line-height: 12px;
    text-transform: capitalize;
  `;

  return <div data-testid="typechip-label" css={ChipStyle}>{type}</div>;
};

export default TypeChip;
