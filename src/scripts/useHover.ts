import * as React from "react";

const useHover = (): [{ [x: string]: any }, boolean] => {
  const [hovered, setHover] = React.useState(false);
  const hover = React.useCallback((e) => {
    e.stopPropagation();
    setHover(true);
  }, []);
  const unHover = React.useCallback(() => setHover(false), []);
  return [{ onPointerOver: hover, onPointerOut: unHover }, hovered];
};

export default useHover;
