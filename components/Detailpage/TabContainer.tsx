/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Dispatch, FC, SetStateAction } from "react";

const TabContainerStyle = css`
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
`;

const TabHeaderStyle = css`
  display: flex;
  width: 100%;
  padding-top: 30px;
`;

const TabStyle = css`
  width: 25%;
  font-size: 12px;
  color: gray;
  text-align: center;
  padding: 10px;
  border-style: solid;
  border-color: #dbe1f3;
  border-width: 0px 0px 2px 0px;
`;

const ActiveTabStyle = css`
  width: 25%;
  font-size: 12px;
  text-align: center;
  padding: 10px;
  border-style: solid;
  border-color: #aeb5d2;
  border-width: 0px 0px 2px 0px;
`;

const TabBodyStyle = css``;

const tabs: string[] = ["About", "Base Stats", "Evolution", "Moves"];

interface TabContainerProps {
  children: any;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}
const TabContainer: FC<TabContainerProps> = (props) => {
  return (
    <div css={TabContainerStyle}>
      <div css={TabHeaderStyle}>
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            onClick={() => props.setCurrentTab(idx)}
            css={idx === props.currentTab ? ActiveTabStyle : TabStyle}
          >
            {tab}
          </div>
        ))}
      </div>
      <div css={TabBodyStyle}>{props.children}</div>
    </div>
  );
};

export default TabContainer;
