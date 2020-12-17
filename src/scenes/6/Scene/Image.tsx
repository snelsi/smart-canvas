import * as React from "react";

import * as THREE from "three";
import { useLoader, useUpdate } from "react-three-fiber";
import img from "./cat.png";

const Image = () => {
  const meshRef = useUpdate<THREE.Mesh>((geometry) => {
    geometry.position.z = -0.0001;
  }, []);

  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Image;
