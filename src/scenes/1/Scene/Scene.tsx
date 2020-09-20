import React from "react";

import { Grid, CameraControls } from "components";
import { BaseSquare, CentralCircle, CornerCircles, DiagonalCircles } from ".";

const Scene: React.FC = () => (
  <>
    <CameraControls />
    <Grid />

    <BaseSquare />

    <CentralCircle />
    <CornerCircles />
    <DiagonalCircles />
  </>
);

export default Scene;
