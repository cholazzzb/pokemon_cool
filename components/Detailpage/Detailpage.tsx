/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import TabAbout from "./TabAbout";
import TabBaseStats from "./TabBaseStats";
import TabContainer from "./TabContainer";
import TabEvolution from "./TabEvolution";
import TabMoves from "./TabMoves";
import Overview from "./Overview";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { LISTPAGE } from "@constants/route";
import { getPrimaryColorFromType } from "@components/util";

interface IHeaderProps {
  setPage: Dispatch<SetStateAction<string>>;
}
const Header: FC<IHeaderProps> = (props) => {
  const { setPage } = props;

  const HeaderStyle = css`
    color: white;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
  `;

  const IconStyle = css`
    width: 15px;
    height: 15px;
  `;

  return (
    <div css={HeaderStyle}>
      <span css={IconStyle} onClick={() => setPage(LISTPAGE)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      <span>Catch Pokemon</span>
    </div>
  );
};

interface ITabProps {
  currentTab: number;
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: any;
  stats: any;
  moves: any;
}
const Tab: FC<ITabProps> = (props) => {
  const { currentTab, id, name, height, weight, abilities, stats, moves } =
    props;
  switch (currentTab) {
    case 0:
      return (
        <TabAbout
          name={name}
          height={height}
          weight={weight}
          abilities={abilities}
        />
      );
    case 1:
      return <TabBaseStats stats={stats} />;
    case 2:
      return <TabEvolution id={id} name={name} />;
    case 3:
      return <TabMoves moves={moves} />;
    default:
      return <></>;
  }
};

const GET_POKEMON_DETAIL = gql`
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
      height
      weight
      abilities {
        ability {
          url
          name
        }
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      moves {
        move {
          url
          name
        }
      }
    }
  }
`;

interface DetailPageProps {
  id: number;
  name: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Detailpage: FC<DetailPageProps> = (props) => {
  const { id, name, setCurrentPage } = props;

  const [currentTab, setCurrentTab] = useState(0);
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { types, ...others } = data.pokemon;

  const bgColor = getPrimaryColorFromType(types[0].type.name);
  const DetailpageStyle = css`
    background-color: ${bgColor};
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  return (
    <div css={DetailpageStyle}>
      <Header setPage={setCurrentPage} />
      <Overview id={id} name={name} types={types} />
      <TabContainer currentTab={currentTab} setCurrentTab={setCurrentTab}>
        <Tab currentTab={currentTab} id={id} name={name} {...others} />
      </TabContainer>
    </div>
  );
};

export default Detailpage;
