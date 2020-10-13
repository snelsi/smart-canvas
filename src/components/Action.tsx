import * as React from "react";
import styled from "styled-components";

import Button from "components/Button";
import { useAction } from "scripts";
import { ActionItem } from "components/MenuItem";

const StyledButton = styled(Button)`
  margin: 1em 0;
`;

interface ActionProps {
  item: ActionItem;
}

export const Action: React.FC<ActionProps> = ({ item: { fieldName, title = "action" } }) => {
  const { call } = useAction(fieldName);

  return (
    <StyledButton type="button" onClick={call} data-full-width>
      {title}
    </StyledButton>
  );
};
