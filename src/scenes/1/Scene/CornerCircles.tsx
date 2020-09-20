import React from "react";

import { useField } from "scripts";

import { prefix } from "..";
import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

interface CornerCircleProps {
  radius: number;
  shift: [number, number];
}
const CornerCircle: React.FC<CornerCircleProps> = ({ radius, shift }) => {
  const [x, y] = shift;

  const innerCirclePoints = React.useMemo(() => {
    const path = new THREE.Path();

    path.moveTo(radius + x, y);
    path.absarc(x, y, radius, 0, 2 * Math.PI, false);
    path.closePath();

    return path.getPoints();
  }, [radius, x, y]);

  const innerCircleRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(innerCirclePoints);
    },
    [innerCirclePoints],
  );

  return (
    <line>
      <lineBasicMaterial attach="material" color={0xffffff} />
      <bufferGeometry attach="geometry" ref={innerCircleRef} />
    </line>
  );
};

const CornerCircles = () => {
  const [cornerCircleRaduis] = useField<number>(`${prefix}cornerCircleRaduis`);
  const [spaceFromCenter] = useField<number>(`${prefix}spaceFromCenter`);

  return (
    <>
      <CornerCircle radius={cornerCircleRaduis} shift={[spaceFromCenter, 0]} />
      <CornerCircle radius={cornerCircleRaduis} shift={[0, spaceFromCenter]} />
      <CornerCircle radius={cornerCircleRaduis} shift={[-spaceFromCenter, 0]} />
      <CornerCircle radius={cornerCircleRaduis} shift={[0, -spaceFromCenter]} />
    </>
  );
};

export default CornerCircles;
