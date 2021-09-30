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
    <div css={ImageStyle}>
      <Image src={image.blobAddress} alt="pokemon" layout="fill" />
    </div>
  );
};

export default PokeImage;
