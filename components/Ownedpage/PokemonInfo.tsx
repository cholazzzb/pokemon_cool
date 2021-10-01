/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Fragment, useState } from "react";

const OverlayStyle = css`
  z-index: 50;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const PokemonInfoStyle = css`
  z-index: 50;
  position: relative;
  height: 100%;
  width: 100px;
  background-color: white;
`;

const PokemonInfo = () => {
  const [show, setShow] = useState(false);

  if (!show) return <Fragment></Fragment>;

  return (
    <div css={OverlayStyle}>
      <div css={PokemonInfoStyle}>
        <button>Release</button>
      </div>
    </div>
  );
};
export default PokemonInfo;
