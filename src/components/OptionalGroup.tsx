import * as React from "react";
import styled from "styled-components";
import { Checkbox } from "@chakra-ui/core";

import { useField } from "scripts";

import { OptionalGroupItem, MenuItems } from "components";

const Group = styled.div`
  margin-top: 2em;
`;

const StyledCheckbox = styled(Checkbox)`
  color: var(--color-gray-70);
  margin-bottom: 1.5em;
`;

const GroupWrapper = styled.fieldset`
  &:not([data-show="true"]) {
    height: 0;
    pointer-events: none;
    cursor: default;

    & * {
      pointer-events: none !important;
    }
  }

  overflow: hidden;
  transition: height 0.2s ease;
`;

interface OptionalGroupProps {
  item: OptionalGroupItem;
  disabled?: boolean;
}

export const OptionalGroup: React.FC<OptionalGroupProps> = ({
  item: { fieldName, title, items },
  disabled = false,
}) => {
  const [showGroup, setShowGroup] = useField<boolean>(fieldName);

  return (
    <Group>
      <StyledCheckbox
        isChecked={showGroup}
        onChange={(e) => setShowGroup(e.target.checked)}
        isDisabled={disabled}
      >
        {title}
      </StyledCheckbox>

      <GroupWrapper data-show={showGroup} disabled={!showGroup}>
        <MenuItems items={items} disabled={!showGroup || disabled} />
      </GroupWrapper>
    </Group>
  );
};
