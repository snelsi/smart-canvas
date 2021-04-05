import * as React from "react";

import * as THREE from "three";
import { useField, degToRad } from "scripts";
import { Circle, Grid, GridCameraControls } from "components";
import { StartPoint } from "./StartPoint";
import { Epicycloid } from ".";
import { prefix } from "..";

export const Controls = () => (
  <>
    <GridCameraControls />
    <Grid />
  </>
);

export const Figure = () => {
  const [R] = useField<number>(`${prefix}big-radius`);
  const [r] = useField<number>(`${prefix}small-radius`);
  const [limits] = useField<number>(`${prefix}limits`);
  const [rotation] = useField<number>(`${prefix}rotation`);
  const [showVolume] = useField<boolean>(`${prefix}show-volume`);

  const [showAdvanced] = useField<number>(`${prefix}show-advanced`);

  const groupRef = React.useRef<THREE.Group>();
  React.useLayoutEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = showAdvanced ? degToRad(rotation) : 0;
    }
  }, [rotation, showAdvanced]);

  const circleZ = React.useMemo(
    () => (showAdvanced && showVolume ? Math.sqrt((R + 2 * r) * (R + 2 * r) - R * R) : 0),
    [showAdvanced, showVolume, R, r],
  );

  return (
    <group ref={groupRef}>
      <Circle radius={R} z={circleZ} color={0x00ffc2} />
      <Epicycloid
        bigRadius={R}
        smallRadius={r}
        color={0xff0000}
        showVolume={showAdvanced ? showVolume : false}
        pointsLimit={showAdvanced ? limits : 100000}
      />
      <StartPoint x={R} y={0} z={circleZ} />
    </group>
  );
};

const Scene: React.FC = () => (
  <>
    <Controls />
    <Figure />
  </>
);

export default Scene;
