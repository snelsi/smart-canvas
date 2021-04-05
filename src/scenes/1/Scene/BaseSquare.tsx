import React from "react";
import * as THREE from "three";
import { useField } from "scripts";
import { prefix } from "..";

const BaseSquare = () => {
  const [N] = useField<number>(`${prefix}squareSideSize`);
  const [cornerCircleRadius] = useField<number>(`${prefix}cornerCircleRaduis`);

  const sqrtN = Math.sqrt(N / 2);

  const vertices = React.useMemo(() => {
    const spaceFromCenter = sqrtN - cornerCircleRadius;

    const points = [
      [cornerCircleRadius, spaceFromCenter],
      [spaceFromCenter, cornerCircleRadius],
      [spaceFromCenter, -cornerCircleRadius],
      [cornerCircleRadius, -spaceFromCenter],
      [-cornerCircleRadius, -spaceFromCenter],
      [-spaceFromCenter, -cornerCircleRadius],
      [-spaceFromCenter, cornerCircleRadius],
      [-cornerCircleRadius, spaceFromCenter],
    ];

    const path = new THREE.Path();
    const firstPoint = points[0];

    path.moveTo(firstPoint[0], firstPoint[1]);
    points.forEach((point) => path.lineTo(point[0], point[1]));
    path.closePath();

    return path.getPoints();
  }, [sqrtN, cornerCircleRadius]);

  const bufferRef = React.useRef<THREE.BufferGeometry>();
  React.useLayoutEffect(() => {
    bufferRef?.current?.setFromPoints(vertices);
  }, [vertices]);

  return (
    <line>
      <lineBasicMaterial color={0xffffff} />
      <bufferGeometry ref={bufferRef} />
    </line>
  );
};

export default BaseSquare;
