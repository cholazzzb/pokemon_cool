/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState, FC } from "react";
import { getSecondaryColorFromType } from "./util";

interface ImageProps {
  type: string;
  image: string;
  size: number;
}

const PokeImage: FC<ImageProps> = (props) => {
  const { type, size } = props;
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
    width: ${size+40}px;
    height: ${size+40}px;
    transform: translateX(-20px) translateY(15px);
    transform-origin: bottom;
  `;

  const [image, setImage] = useState({
    blobAddress: "",
    status: "loading",
  });

  const getImage = async () => {
    await fetch(`${props.image}`, { method: "GET" })
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        if (blob.type === "image/png") {
          setImage({
            blobAddress: URL.createObjectURL(blob),
            status: "success",
          });
        } else {
          setImage({
            blobAddress: "",
            status: "error",
          });
        }
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  if (image.status === "loading") return <div css={ImageStyle}>Loading </div>;

  if (image.status === "error")
    return (
      <div css={ImageStyle}>
        Failed to Fetch image
        <button onClick={getImage}>Retry</button>
      </div>
    );

  return (
    <div css={ImageBackgroundStyle}>
      <div css={ImageStyle}>
        <Image
          data-testid="pokemon-image"
          src={image.blobAddress}
          alt="pokemon"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default PokeImage;
