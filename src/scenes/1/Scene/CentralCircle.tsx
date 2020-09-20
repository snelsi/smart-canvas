import React from "react";

import { useField } from "scripts";

import { prefix } from "..";
import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

const CentralCircle = () => {
  const [innerCircleRaduis] = useField<number>(`${prefix}innerCircleRaduis`);
  const [outterCircleRaduis] = useField<number>(`${prefix}outterCircleRaduis`);

  const innerCirclePoints = React.useMemo(() => {
    const path = new THREE.Path();

    path.moveTo(innerCircleRaduis, 0);
    path.absarc(0, 0, innerCircleRaduis, 0, 2 * Math.PI, false);
    path.closePath();

    return path.getPoints();
  }, [innerCircleRaduis]);

  const innerCircleRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(innerCirclePoints);
    },
    [innerCirclePoints],
  );

  const outerCirclePoints = React.useMemo(() => {
    const path = new THREE.Path();

    path.moveTo(outterCircleRaduis, 0);
    path.absarc(0, 0, outterCircleRaduis, 0, 2 * Math.PI, false);
    path.closePath();

    return path.getPoints();
  }, [outterCircleRaduis]);

  const outerCircleRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      geometry.setFromPoints(outerCirclePoints);
    },
    [outerCirclePoints],
  );

  return (
    <>
      <line>
        <lineBasicMaterial attach="material" color={0xffffff} />
        <bufferGeometry attach="geometry" ref={innerCircleRef} />
      </line>
      <line>
        <lineBasicMaterial attach="material" color={0xffffff} />
        <bufferGeometry attach="geometry" ref={outerCircleRef} />
      </line>
    </>
  );
};

export default CentralCircle;
