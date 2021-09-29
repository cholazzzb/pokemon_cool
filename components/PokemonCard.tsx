/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

import { useQuery, gql } from "@apollo/client";

import PokeImage from "./PokeImage";
import TypeChip from "./TypeChip";
import { getPrimaryColorFromType } from "./util";

interface DataProps {
  url: string;
  name: string;
  image: string;
}

interface CardProps {
  data: DataProps;
}

const NameStyle = css`
  font-size: 15px;
  font-weight: 700;
  line-height: 1px;
`;

const AttributeStyle = css`
  display: flex;
  flex-direction: column;
`;

const PokemonCard: FC<CardProps> = (props) => {
  const name = props.data.name;
  const GET_POKEMON_TYPE = gql`
    query Pokemon($name: String!) {
      pokemon(name: $name) {
        name
        types {
          slot
          type {
            id
            url
            name
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POKEMON_TYPE, {
    variables: { name },
  });

  console.log(name, data?.pokemon.name, data?.pokemon.types[0].type.name);
  const type = data?.pokemon.types[0].type.name
  const bgColor = getPrimaryColorFromType[type];
  const CardStyle = css`
    max-width: 200px;
    background-color: ${bgColor};
    color: white;
    padding: 20px 0px 0px 22px;
    margin: 10px 0px;
    border-radius: 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  `;

  return (
    <div css={CardStyle}>
      <div css={AttributeStyle}>
        <p css={NameStyle}>{name}</p>
        {data &&
          data.pokemon.types.map((type:any, idx:number) => (
            <TypeChip key={idx} type={type.type.name} />
          ))}
      </div>
      <PokeImage type={data?.pokemon.types[0].type.name} image={props.data.image} />
    </div>
  );
};

export default PokemonCard;
