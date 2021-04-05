import * as React from "react";

import * as THREE from "three";

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
  const ref = React.useRef<THREE.Group>();
  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.x = scaleX;
      ref.current.scale.y = scaleY;
      ref.current.scale.z = scaleZ;

      ref.current.position.x = positionX;
      ref.current.position.y = positionY;
      ref.current.position.z = positionZ;
    }
  }, [positionX, positionY, positionZ, scaleX, scaleY, scaleZ]);
  return <group ref={ref}>{children}</group>;
};
