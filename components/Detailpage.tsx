import React, { FC } from "react";

interface DetailPageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  id: number;
  name: string;
}

const Detailpage: FC<DetailPageProps> = (props) => {
  return <div></div>;
};

export default Detailpage;
