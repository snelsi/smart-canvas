import * as React from "react";

import { useField } from "scripts";
import { Grid, GridCameraControls } from "components";
import { Curve } from "./Curve";
import { prefix } from "..";

export const Controls = () => (
  <>
    <Grid />
    <GridCameraControls />
  </>
);

export const Figure = () => {
  const [iterations] = useField<number>(`${prefix}iterations`);
  const [showVolume] = useField<boolean>(`${prefix}show-volume`);
  const [showColor] = useField<boolean>(`${prefix}show-color`);

  const [lineLength] = useField<number>(`${prefix}length`);
  const [startX] = useField<number>(`${prefix}start-x`);
  const [startY] = useField<number>(`${prefix}start-y`);
  const [rotation] = useField<number>(`${prefix}rotation`);

  return (
    <Curve
      depth={iterations}
      lineWidth={2}
      lineLength={lineLength}
      startX={startX}
      startY={startY}
      rotation={rotation}
      showVolume={showVolume}
      showColor={showColor}
    />
  );
};

const Scene: React.FC = () => (
  <>
    <Controls />
    <Figure />
  </>
);

export default Scene;
