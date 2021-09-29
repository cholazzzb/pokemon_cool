/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";

import { useQuery, gql } from "@apollo/client";

import PokeImage from "./PokeImage";
import TypeChip from "./TypeChip";
import { getPrimaryColorFromType } from "./util";

interface DataProps {
  id: string;
  name: string;
  image: string;
  artwork: string;
  dreamworld: string;
}

interface CardProps {
  data: DataProps;
}

const NameStyle = css`
  font-size: 15px;
  font-weight: 700;
  line-height: 1px;
  text-transform: capitalize;
`;

const AttributeStyle = css`
  display: flex;
  flex-direction: column;
`;

const PokemonCard: FC<CardProps> = (props) => {
  const {id, name, image, artwork, dreamworld} = props.data
  
  const GET_POKEMON_TYPE = gql`
    query Pokemon($name: String!) {
      pokemon(name: $name) {
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
  
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const type = data.pokemon.types[0].type.name;
  const bgColor = getPrimaryColorFromType(type);
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
          data.pokemon.types.map((type: any, idx: number) => (
            <TypeChip key={idx} type={type.type.name} />
          ))}
      </div>
      <PokeImage
        type={data.pokemon.types[0].type.name}
        image={artwork}
      />
    </div>
  );
};

export default PokemonCard;
