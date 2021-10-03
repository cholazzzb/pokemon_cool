import { FC } from "react";
import TabAbout from "./TabAbout";
import TabBaseStats from "./TabBaseStats";
import TabEvolution from "./TabEvolution";
import TabMoves from "./TabMoves";

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

export default Tab;
