/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FC } from "react";
import Alert from "@components/Alert";

const AlertContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-center:center;
`;

interface IFailedAlertProps {
  iconColor: string;
  catchPokemon: () => void;
}

const FailedAlert: FC<IFailedAlertProps> = (props) => {
  const { iconColor, catchPokemon } = props;
  const TryAgainStyle = css`
    padding: 10px;
    border-radius: 20px;
    background-color: ${iconColor};
  `;

  return (
    <Alert level="danger" headText="Catching Pokemon">
      <div css={AlertContainerStyle}>
        <div>FAILED!</div>
        <div onClick={catchPokemon} css={TryAgainStyle}>
          Try Again
        </div>
      </div>
    </Alert>
  );
};

export default FailedAlert;
