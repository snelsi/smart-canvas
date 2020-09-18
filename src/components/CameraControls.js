import React from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useFrame, useThree } from "react-three-fiber";

extend({ OrbitControls });

export const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = React.useRef();
  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      touches={{
        ONE: THREE.TOUCH.DOLLY_PAN,
        TWO: THREE.TOUCH.ROTATE,
      }}
    />
  );
};
