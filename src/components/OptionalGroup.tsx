import * as React from "react";
import styled from "@emotion/styled";
import { Checkbox } from "@chakra-ui/react";

import { useField } from "scripts";

import { OptionalGroupItem, MenuItems } from "components";

const Group = styled.div`
  margin-top: 2em;
  margin-bottom: 1.5em;
`;

const StyledCheckbox = styled(Checkbox)`
  color: var(--color-gray-70);
  margin-bottom: 1.5em;
`;

const GroupWrapper = styled.fieldset`
  margin-bottom: 0.5em;
  &:not([data-show="true"]) {
    height: 0;
    pointer-events: none;
    cursor: default;
    margin-bottom: 0;
    overflow: hidden;

    & * {
      pointer-events: none !important;
    }
  }

  transition: height 0.2s ease;
`;

interface OptionalGroupProps {
  item: OptionalGroupItem;
  disabled?: boolean;
}

export const OptionalGroup: React.FC<OptionalGroupProps> = ({
  item: { fieldName, title, items, defaultValue },
  disabled = false,
}) => {
  const [showGroup, setShowGroup] = useField<boolean>(fieldName, defaultValue);

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
