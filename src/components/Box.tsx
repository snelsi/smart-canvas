import React from "react";
import { useFrame } from "react-three-fiber";

export interface BoxProps {
  // extends THREE.Mesh
  position?: [number, number, number];
  scale?: [number, number, number];
}
export const Box: React.FC<BoxProps> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={mesh}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
