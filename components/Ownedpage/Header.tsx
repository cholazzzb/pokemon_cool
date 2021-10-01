/** @jsxRuntime classic */
/** @jsx jsx */
import { LISTPAGE } from "@constants/route";
import { css, jsx } from "@emotion/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction } from "react";

interface IHeaderProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Header: FC<IHeaderProps> = (props) => {
  const { setCurrentPage } = props;
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
      <span css={IconStyle} onClick={() => setCurrentPage(LISTPAGE)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      <div></div>
    </div>
  );
};

export default Header;
