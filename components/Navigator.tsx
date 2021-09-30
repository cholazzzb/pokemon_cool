/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { OWNEDPAGE } from "@constants/route";

const NavigatorContainerStyle = css`
  z-index: 10;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 0px;
  justify-content: center;
`;

const OwnedPageStyle = css`
  border-style: solid;
  border-width: 1px 1px 1px 0px;
  border-color: blue;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 40px;
  height: 30px;
  padding: 5px;
`;

interface INavigatorProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Navigator: FC<INavigatorProps> = (props) => {
  const { currentPage, setCurrentPage } = props;

  return (
    <div css={NavigatorContainerStyle}>
      <div css={OwnedPageStyle} onClick={() => setCurrentPage(OWNEDPAGE)}>
        <Image src="/pokeball.svg" width={30} height={30} />
      </div>
    </div>
  );
};

export default Navigator;
