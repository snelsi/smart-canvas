import React from "react";

import { Grid, GridCameraControls } from "components";
import { BaseSquare, CentralCircle, CornerCircles, DiagonalCircles } from ".";

export const Controls = () => (
  <>
    <GridCameraControls />
    <Grid />
  </>
);

export const Figure = ({ ...props }) => (
  <group {...props}>
    <BaseSquare />

    <CentralCircle />
    <CornerCircles />
    <DiagonalCircles />
  </group>
);

const Scene: React.FC = () => (
  <>
    <Controls />
    <Figure />
  </>
);

export default Scene;
