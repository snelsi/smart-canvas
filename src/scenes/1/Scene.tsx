import React from "react";

import { Box } from "components";
import { useField } from "scripts";

import { prefix } from ".";

export const Scene = () => {
  const [value] = useField<number>(`${prefix}squareSideSize`);

  return (
    <>
      <Box position={[-1.2, 0, 0]} scale={[value, value, value]} />
      <Box position={[1.2, 0, 0]} scale={[value, value, value]} />
    </>
  );
};
