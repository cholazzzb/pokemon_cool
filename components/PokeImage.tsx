/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState, FC } from "react";
import { getSecondaryColorFromType } from "./util";

interface ImageProps {
  type: string;
  image: string;
}

const PokeImage: FC<ImageProps> = (props) => {
  const { type } = props;
  const bgColor = getSecondaryColorFromType(type);

  const ImageStyle = css`
    position: relative;
    background-color: ${bgColor};
    border-radius: 9999px;
    width: 75px;
    height: 75px;
    transform: translateX(0px) translateY(15px);
    transform-origin: bottom right;
  `;

  const [image, setImage] = useState({
    blobAddress: "",
    success: false,
  });

  useEffect(() => {
    (async () => {
      await fetch(
        `${props.image}`,
        { method: "GET" }
      )
        .then(function (response) {
          return response.blob();
        })
        .then(function (blob) {
          if (blob.type === "image/png") {
            setImage({
              blobAddress: URL.createObjectURL(blob),
              success: true,
            });
          } else {
            setImage({
              blobAddress: "",
              success: false,
            });
          }
        });
    })();
  }, []);

  return (
    <div css={ImageStyle}>
      {image.success ? (
        <Image src={image.blobAddress} alt="pokemon" layout="fill" />
      ) : (
        <p>Failed to load image</p>
      )}
    </div>
  );
};

export default PokeImage;
