/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const HeaderStyle = css`
  font-size: 30px;
  font-weight: 700;
  padding: 10px;
  margin: 20px 0px;
  height: 30px;
`;

const Header = () => {
  return <div css={HeaderStyle}>Pokemon List Total Owned:</div>;
};

export default Header;
