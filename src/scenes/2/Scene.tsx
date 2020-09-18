import React from "react";

import { Box } from "components";
import { useField } from "scripts";

import { prefix } from ".";

export const Scene = () => {
  const [valueX] = useField<number>(`${prefix}squareSideSize`);
  const [size] = useField<number>(`${prefix}innerCircleRaduis`);

  return (
    <>
      <Box position={[-valueX, 0, 0]} scale={[size, size, size]} />
      <Box position={[valueX, 0, 0]} scale={[size, size, size]} />
    </>
  );
};
