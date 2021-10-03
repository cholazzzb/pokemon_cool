/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { LISTPAGE, OWNEDPAGE } from "@constants/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";

const NavigatorContainerStyle = css`
  z-index: 10;
  display: flex;
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100%;
  justify-content: center;
  background-color: #f2f3f5;
`;

const IconStyle = css`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

interface INavigatorProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Navigator: FC<INavigatorProps> = (props) => {
  const { currentPage, setCurrentPage } = props;

  const ButtonContainerStyle = (page: string) => {
    let color;
    if (currentPage === page) {
      color = "black";
    } else {
      color = "gray";
    }

    const style = css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33%;
      padding: 5px;
      color: ${color};
    `;

    return style;
  };

  return (
    <div css={NavigatorContainerStyle}>
      <div
        css={ButtonContainerStyle(LISTPAGE)}
        onClick={() => setCurrentPage(LISTPAGE)}
      >
        <span css={IconStyle}>
          <FontAwesomeIcon icon={faBook} size="2x" />
        </span>
        Pokemon List
      </div>
      <Search />
      <div
        css={ButtonContainerStyle(OWNEDPAGE)}
        onClick={() => setCurrentPage(OWNEDPAGE)}
      >
        <span css={IconStyle}>
          <Image
            src={
              currentPage === OWNEDPAGE
                ? "/pokeballSelected.svg"
                : "/pokeball.png"
            }
            width={30}
            height={30}
          />
        </span>
        Owned Pokemon
      </div>
    </div>
  );
};

export default Navigator;
