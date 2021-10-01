/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC } from "react";
import PokeImage from "@components/PokeImage";
import TypeChip from "@components/TypeChip";

interface OverviewProps {
  id: number;
  name: string;
  imgURL: string;
  types: any;
}

const InformationStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NameStyle = css`
  font-size: 15px;
  font-weight: 700;
  line-height: 1px;
  text-transform: capitalize;
`;

const TypesStyle = css`
  display: flex;
`;

const ImageStyle = css`
  display: flex;
  justify-content: center;
  height: 50px;
`;

const Overview: FC<OverviewProps> = (props) => {
  const { id, name, imgURL, types } = props;

  const OverviewStyle = css`
    color: white;
    padding: 10px 20px;
  `;

  return (
    <div css={OverviewStyle}>
      <div css={InformationStyle}>
        <div>
          <p css={NameStyle}>{name}</p>
          <div css={TypesStyle}>
            {types.map((type: any) => (
              <TypeChip key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
        <p>Id: {id}</p>
      </div>
      <div css={ImageStyle}>
        <PokeImage type={types[0].type.name} image={imgURL}/>
      </div>
    </div>
  );
};

export default Overview;
