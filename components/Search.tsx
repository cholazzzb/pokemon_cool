/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SearchCountainerStyle = css`
  z-index: 20;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: blue;
`;

const SearchButtonStyle = css`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button css={SearchButtonStyle}>
        <span style={{ width: 20, height: 20 }}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </button>

      {open && <div css={SearchCountainerStyle}>Searching</div>}
    </div>
  );
};

export default Search;
