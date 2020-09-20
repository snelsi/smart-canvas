import React from "react";

import { useField } from "scripts";

import { prefix } from "..";
import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

interface DiagonalCircleProps {
  radius: number;
  shift: [number, number];
}
const DiagonalCircle: React.FC<DiagonalCircleProps> = ({ radius, shift }) => {
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

const DiagonalCircles = () => {
  const [squareSideSize] = useField<number>(`${prefix}squareSideSize`);
  const [diagonalCircleRaduis] = useField<number>(`${prefix}diagonalCircleRaduis`);

  const shift = Math.sqrt(squareSideSize / 2) / 2;
  return (
    <>
      <DiagonalCircle radius={diagonalCircleRaduis} shift={[shift, shift]} />
      <DiagonalCircle radius={diagonalCircleRaduis} shift={[shift, -shift]} />
      <DiagonalCircle radius={diagonalCircleRaduis} shift={[-shift, shift]} />
      <DiagonalCircle radius={diagonalCircleRaduis} shift={[-shift, -shift]} />
    </>
  );
};

export default DiagonalCircles;
