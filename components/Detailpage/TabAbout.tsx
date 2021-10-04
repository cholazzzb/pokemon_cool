/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

const TabBodyStyle = css`
  overflow:auto;
  padding: 10px;
`;

const TextContainerStyle = css`
  display: flex;
  align-items: center;
  height: 30px;
`;

const LabelStyle = css`
  color: gray;
  width: 30%;
`;

const DataStyle = css`
  text-transform: capitalize;
`;

interface TabAboutProps {
  name: string;
  height: string;
  weight: string;
  abilities: any
}

const TabAbout: FC<TabAboutProps> = (props) => {
  const { name, height, weight, abilities } = props;
 
  return (
    <div css={TabBodyStyle}>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Species</p>
        <p css={DataStyle}>{name}</p>
      </div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Height</p>
        {height}
      </div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Weight</p>
        {weight}
      </div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}> Abilities</p>
        {abilities.map(
          (ability: { [key: string]: { [key: string]: string } }) => (
            <p key={ability.ability.name} css={DataStyle}>{ability.ability.name}, </p>
          )
        )}
      </div>
      <div style={{ fontWeight: 900, padding: "20px 0px" }}>Breeding</div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Gender</p>
      </div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Egg Groups</p>
      </div>
      <div css={TextContainerStyle}>
        <p css={LabelStyle}>Egg Cycle</p>
      </div>
    </div>
  );
};

export default TabAbout;
