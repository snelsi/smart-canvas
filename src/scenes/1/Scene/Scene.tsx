import React from "react";

import { Grid, CameraControls } from "components";
import { BaseSquare, CentralCircle, CornerCircles, DiagonalCircles } from ".";

export const Controls = () => (
  <>
    <CameraControls />
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
