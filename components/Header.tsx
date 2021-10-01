/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const HeaderStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const IconStyle = css`
padding: 10px;
  width: 15px;
  height: 15px;
`;

const CaptionStyle = css`
  font-size: 30px;
  font-weight: 700;
  padding: 10px;
  margin: 20px 0px;
  height: 30px;
`;

interface IHeaderProps {
  caption: string;
  children?: any;
  onBack?: () => void;
}

const Header: FC<IHeaderProps> = (props) => {
  return (
    <div css={HeaderStyle}>
      {props.onBack && (
        <span css={IconStyle} onClick={props.onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      )}
      <div css={CaptionStyle}>{props.caption}</div>
      <div>{props.children}</div>
    </div>
  );
};

export default Header;
