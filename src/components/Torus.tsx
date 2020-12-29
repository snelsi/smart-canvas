import * as React from "react";

import * as THREE from "three";
import { useFrame } from "react-three-fiber";

export interface TorusProps {
  // extends THREE.Mesh
  position?: [number, number, number];
  scale?: [number, number, number];

  radius?: number;
  tube?: number;
  tubularSegments?: number;
  radialSegments?: number;
}
export const Torus: React.FC<TorusProps> = ({
  radius = 1.5,
  tube = 0.4,
  tubularSegments = 100,
  radialSegments = 16,
  ...props
}) => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} {...props}>
      <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments]} />
      <meshPhongMaterial color="hotpink" />
    </mesh>
  );
};
