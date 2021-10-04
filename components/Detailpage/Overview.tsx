/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Dispatch, FC, SetStateAction } from "react";
import PokeImage from "@components/PokeImage";
import TypeChip from "@components/TypeChip";
import NavigateOverview from "./NavigateOverview";
import CatchPokemon from "./CatchPokemon";
import { getSecondaryColorFromType } from "@utils/colorTheme";

interface OverviewProps {
  id: number;
  setCurrentId: Dispatch<SetStateAction<number>>
  name: string;
  setCurrentName: Dispatch<SetStateAction<string>>
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
`;

const Overview: FC<OverviewProps> = (props) => {
  const { id, setCurrentId, name, setCurrentName, types } = props;
  const seconColor = getSecondaryColorFromType(types[0].type.name);

  return (
    <div css={OverviewStyle}>
      <div
        css={css`
          padding: 0px 20px 10px 20px;
        `}
      >
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
            id={id}
            size={200}
          />
        </div>
      </div>
      <NavigateOverview currentId={id} setCurrentId={setCurrentId} setCurrentName={setCurrentName}/>
      <CatchPokemon id={id} iconColor={seconColor} pokemonName={name} />

    </div>
  );
};

export default Overview;
