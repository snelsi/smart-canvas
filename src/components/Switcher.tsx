import * as React from "react";
import styled from "@emotion/styled";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { useField } from "scripts";

import { SwitcherItem } from "components";

const StyledCheckbox = styled(Checkbox)`
  color: var(--color-gray-70);
  margin-bottom: 1.5em;
`;

interface SwitcherProps {
  item: SwitcherItem;
  disabled?: boolean;
}

export const Switcher: React.FC<SwitcherProps> = ({
  item: { fieldName, title, defaultValue },
  disabled = false,
}) => {
  const [checked, setChecked] = useField<boolean>(fieldName, defaultValue);

  return (
    <CheckboxGroup value={checked ? ["1"] : []} onChange={(st) => setChecked(st.length > 0)}>
      <StyledCheckbox value="1" isDisabled={disabled}>
        {title}
      </StyledCheckbox>
    </CheckboxGroup>
  );
};
