import * as React from "react";
import styled from "@emotion/styled";

import { DoubleActionItem } from "components/MenuItem";
import { Action } from "components/Action";

const Wrapper = styled.div`
  color: var(--color-gray-70);
  margin: 1em 0;
  & .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

interface DoubleActionProps {
  item: DoubleActionItem;
}

export const DoubleAction: React.FC<DoubleActionProps> = ({
  item: { actionOneName, actionOneTitle, actionTwoName, actionTwoTitle, title = "action" },
}) => {
  return (
    <Wrapper>
      <div>{title}</div>
      <div className="actions">
        <Action item={{ type: "action", fieldName: actionOneName, title: actionOneTitle }} />
        <Action item={{ type: "action", fieldName: actionTwoName, title: actionTwoTitle }} />
      </div>
    </Wrapper>
  );
};
