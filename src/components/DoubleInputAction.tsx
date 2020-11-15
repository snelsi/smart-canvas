import * as React from "react";
import styled from "@emotion/styled";

import Button from "components/Button";
import { Input } from "@chakra-ui/react";
import { useField, useAction } from "scripts";
import { DoubleInputActionItem } from "./MenuItem";

const Wrapper = styled.div`
  margin-top: 1.5em;
  margin-bottom: 1.5em;

  & .double-action-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    & .double-action-title {
      color: var(--color-gray-70);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
  & .double-action-main {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr auto;

    & input,
    & button {
      height: 40px;
    }

    & input {
      background-color: var(--color-gray-30);
      color: var(--color-gray-70);
    }

    & .double-action-actions {
      display: grid;
      gap: 8px;
      grid-auto-flow: column;
    }
  }
`;

interface DoubleInputActionProps {
  item: DoubleInputActionItem;
  disabled?: boolean;
}

export const DoubleInputAction: React.FC<DoubleInputActionProps> = ({
  item: {
    fieldName,
    title,
    defaultValue,
    actionOneName,
    actionOneTitle,
    actionTwoName,
    actionTwoTitle,
    minValue,
    maxValue,
    step,
  },
  disabled = false,
}) => {
  const [value, setValue] = useField<number>(fieldName);

  const { call: call1 } = useAction(actionOneName);
  const { call: call2 } = useAction(actionTwoName);

  React.useEffect(() => {
    if (value === undefined) {
      setValue(defaultValue);
    }
  }, [value, fieldName, defaultValue, setValue]);

  return (
    <Wrapper>
      <div className="double-action-header">
        <div className="double-action-title">{title}</div>
      </div>
      <div className="double-action-main">
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const { value } = e.target;
            const num = Number(value);
            setValue(num);
          }}
          variant="filled"
          min={minValue}
          max={maxValue}
          step={step}
          isDisabled={disabled}
        />
        <div className="double-action-actions">
          <Button onClick={call1} data-icon>
            {actionOneTitle}
          </Button>
          <Button onClick={call2} data-icon>
            {actionTwoTitle}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
