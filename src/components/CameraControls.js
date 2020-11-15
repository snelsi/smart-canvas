import React from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useFrame, useThree } from "react-three-fiber";

extend({ OrbitControls });

export const CameraControls = ({ ...props }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  React.useEffect(() => {
    camera.position.set(0, 0, 15);
  }, [camera.position]);

  const controls = React.useRef();
  useFrame(() => controls.current?.update());

  return <orbitControls ref={controls} args={[camera, domElement]} {...props} />;
};
