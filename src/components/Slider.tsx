import * as React from "react";
import styled from "@emotion/styled";

import {
  Input,
  Slider as BaseSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

import { useField } from "scripts";
import { SliderItem } from "components/MenuItem";

const Base = styled.div`
  padding-bottom: 11px;

  & .slider-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9px;
    & > .slider-title {
      display: inline-block;
      color: var(--color-gray-70);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    & input {
      align-items: center;
      background-color: var(--color-gray-30);
      border-radius: 12px;
      color: var(--color-gray-70);
      display: inline-flex;
      justify-content: center;
      text-align: center;
      padding: 0;
      height: 24px;
      width: 64px;
    }
  }

  & .chakra-slider {
    display: block;
  }
  & div.chakra-slider__track,
  & div.chakra-slider__filled-track {
    height: 4px;
  }
  & div.chakra-slider__track {
    background-color: var(--color-gray-30);
  }
  & div.chakra-slider__filled-track {
    background-color: var(--color-primary);
  }
`;

const isNumber = (str: string) => /^-?\d+([\.\,]\d+)?$/.test(str) || /^[\.\,]\d+$/.test(str);

interface SliderProps {
  item: SliderItem;
  disabled?: boolean;
}

const SliderShouldUpdate = (prev: SliderProps, cur: SliderProps) =>
  prev.item.fieldName !== cur.item.fieldName || prev.item.title !== cur.item.title;

const SliderMemo: React.FC<SliderProps> = ({
  item: {
    title = "",
    fieldName,
    minValue: min = 0,
    maxValue: max = 100,
    step = 1,
    defaultValue = (min + max) / 2,
    ...itemProps
  },
  disabled = false,
  ...props
}) => {
  const [value, setValue] = useField<number>(fieldName, defaultValue);
  const [inputValue, setInputValue] = React.useState<string | number>(defaultValue);
  const [key, setKey] = React.useState(value);

  React.useEffect(() => {
    if (inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Base>
      <label className="slider-header">
        <div className="slider-title">{title}</div>
        <Input
          type="number"
          inputMode="decimal"
          value={inputValue}
          onChange={(e) => {
            const { value } = e.target;
            setInputValue(value);
            if (isNumber(value)) {
              const num = Number(value);
              setKey(num);
              setValue(num);
            }
          }}
          variant="filled"
          min={min}
          max={max}
          step={step}
          isDisabled={disabled}
        />
      </label>
      <BaseSlider
        value={value}
        defaultValue={defaultValue}
        onChange={(v) => {
          setValue(v);
          setInputValue(v);
        }}
        min={min}
        max={max}
        step={step}
        isDisabled={disabled}
        {...itemProps}
        {...props}
        key={key}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </BaseSlider>
    </Base>
  );
};
export const Slider: React.FC<SliderProps> = React.memo(SliderMemo, SliderShouldUpdate);
