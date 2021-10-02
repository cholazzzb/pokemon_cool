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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getPrimaryColorFromType, getSecondaryColorFromType } from "@components/util";
import Alert from "@components/Alert";
import AlertBody from "./AlertBody";
import Header from "@components/Header";

interface ICatchProps {
  iconColor: string;
  catchStatus: null | string;
  setPage: Dispatch<SetStateAction<string>>;
  setCatchStatus: Dispatch<SetStateAction<null | string>>;
}

const Catch: FC<ICatchProps> = (props) => {
  const { iconColor, setCatchStatus } = props;
  const catchPokemon = async () => {
    const reset = async () => {
      setCatchStatus(null);
    };
    await reset();
    const successRate = Math.random();
    successRate > 0.5 ? setCatchStatus("SUCCESS") : setCatchStatus("FAILED");
  };

  const CatchIconStyle = css`
    width: 25px;
    height: 25px;
    border-radius: 9999px;
    background-color: ${iconColor};
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <span onClick={catchPokemon} css={CatchIconStyle}>
      <FontAwesomeIcon icon={faPlus} />
    </span>
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
  imgURL: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Detailpage: FC<DetailPageProps> = (props) => {
  const { id, name, imgURL, setCurrentPage } = props;

  const [catchStatus, setCatchStatus] = useState<null | string>(null);

  const onClose = () => {
    setCatchStatus(null);
  };

  const [currentTab, setCurrentTab] = useState(0);
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { types, ...others } = data.pokemon;

  const primColor = getPrimaryColorFromType(types[0].type.name);
  const seconColor = getSecondaryColorFromType(types[0].type.name)
  const DetailpageStyle = css`
    background-color: ${primColor};
    display: flex;
    flex-direction: column;
    width: 100%;
  `;


  return (
    <div css={DetailpageStyle}>
      {catchStatus === "SUCCESS" ? (
        <Alert level="success" headText={"Catching Pokemon"}>
          <AlertBody name={name} imgURL={imgURL} onClose={onClose} />
        </Alert>
      ) : catchStatus === "FAILED" ? (
        <Alert level="danger" headText={"Catching Pokemon"}>
          <div></div>
        </Alert>
      ) : null}

      <Header caption="" onBack={() => setCurrentPage("LISTPAGE")}>
        <Catch
          catchStatus={catchStatus}
          setPage={setCurrentPage}
          setCatchStatus={setCatchStatus}
          iconColor={seconColor}
        />
      </Header>

      <Overview id={id} name={name} imgURL={imgURL} types={types} />
      <TabContainer currentTab={currentTab} setCurrentTab={setCurrentTab} primColor={primColor}>
        <Tab currentTab={currentTab} id={id} name={name} {...others} />
      </TabContainer>
    </div>
  );
};

export default Detailpage;
