import React from "react";

import { useField, degToRad } from "scripts";

import * as THREE from "three";

import { Grid, GridCameraControls } from "components";
import { Figure as SceneFigure } from "scenes/1/Scene/Scene";
import { ResetScene, RotateFigureAroundPoint, RotationPoint } from ".";
import { prefix } from "..";

export const Figure = () => {
  const [scale] = useField<number>(`${prefix}scale`);
  const [valueX] = useField<number>(`${prefix}x-position`);
  const [valueY] = useField<number>(`${prefix}y-position`);

  const [rotation] = useField<number>(`${prefix}z-rotation`);

  // Optional props
  const [showAdvanced] = useField<number>(`${prefix}show-advanced`);

  const [valueZ] = useField<number>(`${prefix}z-position`);
  const [rotationX] = useField<number>(`${prefix}x-rotation`);
  const [rotationY] = useField<number>(`${prefix}y-rotation`);

  const groupRef = React.useRef<THREE.Group>();
  React.useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.x = scale;
      groupRef.current.scale.y = scale;
      groupRef.current.scale.z = scale;

      groupRef.current.position.x = valueX;
      groupRef.current.position.y = valueY;
      groupRef.current.rotation.z = degToRad(rotation);

      if (showAdvanced) {
        groupRef.current.position.z = valueZ;
        groupRef.current.rotation.x = degToRad(rotationX);
        groupRef.current.rotation.y = degToRad(rotationY);
      } else {
        groupRef.current.position.z = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.y = 0;
      }
    }
  }, [scale, valueX, valueY, rotation, showAdvanced, valueZ, rotationX, rotationY]);

  return (
    <group ref={groupRef} name="2RotationSceneFigure">
      <SceneFigure />
    </group>
  );
};

export const Scene = () => (
  <>
    <GridCameraControls />
    <Grid />
    <Figure />
    <RotationPoint />

    {/* Scripts */}
    <RotateFigureAroundPoint />
    <ResetScene />
  </>
);
