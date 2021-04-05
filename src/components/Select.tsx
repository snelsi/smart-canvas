import * as React from "react";
import styled from "@emotion/styled";
import { MdArrowDropDown } from "react-icons/md";
import { Select as ChakraSelect } from "@chakra-ui/react";

import { useField } from "scripts";
import { SelectItem } from "components/MenuItem";

const Base = styled.label`
  color: var(--color-gray-70);
  display: block;
  padding-bottom: 11px;

  & > .select-title {
    display: inline-block;
    color: var(--color-gray-70);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 9px;
  }
  & select {
    background-color: var(--color-gray-30);
    border-radius: 4px;
    border: none;
    color: var(--color-gray-70);
    cursor: pointer;
    height: 40px;
  }
  & option {
    color: var(--color-gray-10);
  }
`;

interface SelectProps {
  item: SelectItem;
  disabled?: boolean;
}
export const Select: React.FC<SelectProps> = ({
  item: { title = "", fieldName, defaultValue, options, placeholder = "", ...itemProps },
  disabled = false,
  ...props
}) => {
  const [value, setValue] = useField<string>(fieldName, defaultValue);

  return (
    <Base>
      <div className="select-title">{title}</div>
      <ChakraSelect
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        icon={<MdArrowDropDown color="inherit" />}
        {...itemProps}
        {...props}
      >
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </ChakraSelect>
    </Base>
  );
};
