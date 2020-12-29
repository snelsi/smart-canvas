import * as React from "react";

import * as THREE from "three";
import { useUpdate } from "react-three-fiber";

interface ProjectionWrapperProps {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
}

export const ProjectionWrapper: React.FC<ProjectionWrapperProps> = ({
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
  children,
}) => {
  const ref = useUpdate<THREE.Group>(
    (geometry) => {
      geometry.scale.x = scaleX;
      geometry.scale.y = scaleY;
      geometry.scale.z = scaleZ;

      geometry.position.x = positionX;
      geometry.position.y = positionY;
      geometry.position.z = positionZ;
    },
    [positionX, positionY, positionZ, scaleX, scaleY, scaleZ],
  );
  return <group ref={ref}>{children}</group>;
};
