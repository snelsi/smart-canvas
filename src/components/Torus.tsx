import * as React from "react";

import * as THREE from "three";
import { useFrame } from "react-three-fiber";

export interface TorusProps {
  // extends THREE.Mesh
  position?: [number, number, number];
  scale?: [number, number, number];
}
export const Torus: React.FC<TorusProps> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} {...props}>
      <torusKnotGeometry args={[1.5, 0.2, 100, 16]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
};
