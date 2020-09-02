import * as React from "react";
import { CanvasContext, FrameContext } from "components/Canvas";

import { useAppContext } from "AppContext";

export const useField = (field = "") => {
  const { state, ...props } = useAppContext();
  return {
    value: state[field],
    state,
    ...props,
  };
};
export const useCanvas = () => {
  React.useContext(FrameContext);
  const renderingContext = React.useContext(CanvasContext);
  return renderingContext;
};

export const useAnimation = <T extends any>(initialValue: T, valueUpdater: (oldValue: T) => T) => {
  const animatedValue = React.useRef(initialValue);
  animatedValue.current = valueUpdater(animatedValue.current);
  return animatedValue.current;
};
