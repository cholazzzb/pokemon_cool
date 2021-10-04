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
  font-size: 30px;
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
  height: 200px;
`;
const OverviewStyle = css`
  color: white;
  padding: 0px 20px 10px 20px;
`;

const Overview: FC<OverviewProps> = (props) => {
  const { id, name, imgURL, types } = props;

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
        <p>#{id}</p>
      </div>
      <div css={ImageStyle}>
        <PokeImage
          type={types[0].type.name}
          id={id.toString()}
          imgURL={imgURL}
          size={200}
        />
      </div>
    </div>
  );
};

export default Overview;
