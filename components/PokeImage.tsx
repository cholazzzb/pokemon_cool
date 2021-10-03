/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import useFetchPokeImage from "hooks/useFetchPokeImage";
import Image from "next/image";
import { FC } from "react";
import { getSecondaryColorFromType } from "./util";

interface ImageProps {
  type: string;
  imgURL: string;
  size: number;
}

const PokeImage: FC<ImageProps> = (props) => {
  const { type, imgURL, size } = props;
  const bgColor = getSecondaryColorFromType(type);

  const ImageBackgroundStyle = css`
    background-color: ${bgColor};
    border-radius: 9999px;
    width: ${size}px;
    height: ${size}px;
  `;

  const ImageStyle = css`
    position: relative;
    border-radius: 9999px;
    width: ${size + 40}px;
    height: ${size + 40}px;
    transform: translateX(-20px) translateY(15px);
    transform-origin: bottom;
  `;

  const image = useFetchPokeImage(imgURL);

  if (image === null) return <div>Failed Fetch Image</div>;

  return (
    <div css={ImageBackgroundStyle}>
      <div css={ImageStyle}>
        <Image
          data-testid="pokemon-image"
          src={image}
          alt="pokemon"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default PokeImage;
