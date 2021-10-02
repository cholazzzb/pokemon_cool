/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const HeaderStyle = css`
  color: black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BackStyle = css`
  display: flex;
  justify-content: center;
  width: 15%;
`;

const IconStyle = css`
  padding: 10px;
  width: 15px;
  height: 15px;
`;

const CaptionStyle = css`
  color: black;
  font-size: 30px;
  font-weight: 700;
  padding: 10px;
  margin: 20px 0px;
  max-height: 30px;
  width: 70%;
`;

const ChildrenStyle = css`
  display: flex;
  justify-content: center;
  width: 15%;
`;

interface IHeaderProps {
  caption: string;
  children?: any;
  onBack?: () => void;
}

const Header: FC<IHeaderProps> = (props) => {
  return (
    <div css={HeaderStyle}>
      <div css={BackStyle}>
        {props.onBack && (
          <span
            data-testid="header-backicon"
            css={IconStyle}
            onClick={props.onBack}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
        )}
      </div>
      <div data-testid="header-label" css={CaptionStyle}>
        {props.caption}
      </div>
      <div data-testid="header-children-label" css={ChildrenStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default Header;
