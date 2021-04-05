import * as React from "react";
import styled from "@emotion/styled";

import { useField } from "scripts";
import { ColorItem } from "components/MenuItem";

const Base = styled.label`
  display: block;
  padding-bottom: 11px;
  & > .color-title {
    display: inline-block;
    color: var(--color-gray-70);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 9px;
  }
  & input {
    display: block;
  }
`;

interface ColorProps {
  item: ColorItem;
  disabled?: boolean;
}
export const Color: React.FC<ColorProps> = ({
  item: { title = "", fieldName, defaultValue = "red", ...itemProps },
  disabled = false,
  ...props
}) => {
  const [value, setValue] = useField<string>(fieldName, defaultValue);
  return (
    <Base>
      <div className="color-title">{title}</div>
      <input
        type="color"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        {...itemProps}
        {...props}
      />
    </Base>
  );
};
