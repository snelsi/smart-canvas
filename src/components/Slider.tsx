import * as React from "react";
import styled from "styled-components";
import { useField } from "scripts";

import {
  Input,
  Slider as BaseSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps as BaseSliderProps,
} from "@chakra-ui/core";

const Base = styled.div`
  & .slider-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    & > .slider-title {
      color: var(--color-gray-50);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    & input {
      align-items: center;
      background-color: var(--color-gray-30);
      border-radius: 12px;
      color: var(--color-gray-60);
      display: flex;
      justify-content: center;
      text-align: center;
      height: 24px;
      width: 64px;
    }
  }

  & div[data-slider-track],
  & div[data-slider-filled-track] {
    height: 4px;
  }
  & div[data-slider-track] {
    background-color: var(--color-gray-30);
  }
  & div[data-slider-filled-track] {
    background-color: var(--color-primary);
  }
`;

interface SliderProps extends BaseSliderProps {
  title: string;
  fieldName: string;
}

export const Slider: React.FC<SliderProps> = ({
  title = "",
  fieldName,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  ...props
}) => {
  const {
    value,
    helpers: { setStateProp },
  } = useField(fieldName);
  const [key, setKey] = React.useState(value);

  React.useEffect(() => {
    if (value === undefined) {
      console.log(`set ${fieldName} to ${defaultValue}`);
      setStateProp(fieldName, defaultValue);
    }
  }, [value, fieldName, defaultValue]);

  return (
    <Base>
      <label>
        <div className="slider-header">
          <div className="slider-title">{title}</div>
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const { value } = e.target;
              setKey(value);
              setStateProp(fieldName, value);
            }}
            variant="filled"
            min={min}
            max={max}
            step={step}
          />
        </div>
      </label>
      <BaseSlider
        value={value}
        defaultValue={defaultValue}
        onChange={(newValue) => setStateProp(fieldName, newValue)}
        min={min}
        max={max}
        step={step}
        {...props}
        key={key}
      >
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
      </BaseSlider>
    </Base>
  );
};
