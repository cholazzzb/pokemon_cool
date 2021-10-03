/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchContainerStyle = css`
  display: flex;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  padding: 5px;
  color: gray;
`;

const IconStyle = css`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <div css={SearchContainerStyle}>
      <span css={IconStyle}>
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </span>
      Search
    </div>
  );
};

export default Search;
