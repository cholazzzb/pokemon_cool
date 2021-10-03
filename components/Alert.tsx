/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useState } from "react";

const OverlayStyle = css`
  z-index: 50;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseContainerStyle = css`
  padding: 30px 0px;
  display: flex;
  width: 100%;
`;

const HeadTextStyle = css`
  display: flex;
  width: 80%;
  justify-content: center;
`;

const CloseIconStyle = css`
  display: flex;
  width: 10%;
`;

const AlertBodyStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface IAlertProps {
  headText: string;
  level: string;
  children: any;
}

const Alert: FC<IAlertProps> = (props) => {
  const {headText, level} = props
  const [show, setShow] = useState<boolean>(true);

  const onClose = () => {
    setShow(false);
  };
  let primColor, secondColor;
  switch (level) {
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
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0%;
    height: 60%;
    width: 100%;
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  `;

  if (!show) return <Fragment></Fragment>;

  return (
    <div css={OverlayStyle}>
      <div css={AlertStyle}>
        <div css={CloseContainerStyle}>
          <div css={CloseIconStyle}></div>
          <div css={HeadTextStyle}>{headText}</div>
          <div css={CloseIconStyle}>
            <span onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        </div>
        <div css={AlertBodyStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default Alert;
