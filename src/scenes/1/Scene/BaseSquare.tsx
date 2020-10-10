import React from "react";

import { useField } from "scripts";

import { prefix } from "..";
import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

const BaseSquare = () => {
  const [N] = useField<number>(`${prefix}squareSideSize`);
  const [cornerCircleRaduis] = useField<number>(`${prefix}cornerCircleRaduis`);

  const sqrtN = Math.sqrt(N / 2);

  const vertices = React.useMemo(() => {
    const spaceFromCenter = sqrtN - cornerCircleRaduis;

    const points = [
      [cornerCircleRaduis, spaceFromCenter],
      [spaceFromCenter, cornerCircleRaduis],
      [spaceFromCenter, -cornerCircleRaduis],
      [cornerCircleRaduis, -spaceFromCenter],
      [-cornerCircleRaduis, -spaceFromCenter],
      [-spaceFromCenter, -cornerCircleRaduis],
      [-spaceFromCenter, cornerCircleRaduis],
      [-cornerCircleRaduis, spaceFromCenter],
    ];

    const path = new THREE.Path();
    const firstPoint = points[0];

    path.moveTo(firstPoint[0], firstPoint[1]);
    points.forEach((point) => path.lineTo(point[0], point[1]));
    path.closePath();

    return path.getPoints();
  }, [sqrtN, cornerCircleRaduis]);

  const bufferRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(vertices);
    },
    [vertices],
  );

  return (
    <line>
      <lineBasicMaterial color={0xffffff} />
      <bufferGeometry ref={bufferRef} />
    </line>
  );
};

export default BaseSquare;
