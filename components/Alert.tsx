/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useState } from "react";

const OverlayStyle = css`
  z-index: 50;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CloseContainerStyle = css`
  display: flex;
  flex-direction: row-reverse;
`;

const AlertBodyStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface IAlertProps {
  children: any;
  level: string;
}

const Alert: FC<IAlertProps> = (props) => {
  const [show, setShow] = useState<boolean>(true);

  const onClose = () => {
    setShow(false);
  };
  let primColor, secondColor;
  switch (props.level) {
    case "danger":
      primColor = "red";
      secondColor = "red";
      break;

    case "success":
      primColor = "green";
      secondColor = "green";

    default:
      break;
  }
  const AlertStyle = css`
    z-index: 50;
    position: relative;
    top: 5%;
    height: 100px;
    background-color: white;
    border-style: solid;
    border-color: ${primColor};
    margin: 20px;
    padding: 20px;
  `;

  if (!show) return <Fragment></Fragment>;

  return (
    <div css={OverlayStyle}>
      <div css={AlertStyle}>
        <div css={CloseContainerStyle}>
          <span onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div css={AlertBodyStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default Alert;
