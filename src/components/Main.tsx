/* eslint-disable @typescript-eslint/no-namespace */
import * as React from "react";
import styled from "styled-components";
import { Canvas, extend, useThree, useResource, ReactThreeFiber } from "react-three-fiber";
import * as THREE from "three";

import { DragControls } from "three/examples/jsm/controls/DragControls";

extend({ DragControls });

const Workspace = styled.main`
  background-color: var(--color-gray-30);
  overflow: hidden;
  width: 100%;
`;
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       // eslint-disable-next-line no-undef
//       dragControls: ReactThreeFiber.Object3DNode<DragControls, typeof DragControls>;
//     }
//   }
// }
// extend({ DragControls });

// function Scene() {
//   const { camera, gl } = useThree();

//   const [ref, object] = useResource<THREE.Line>();
//   const points = React.useMemo(
//     () => [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)],
//     [],
//   );
//   const onUpdate = React.useCallback((self) => self.setFromPoints(points), [points]);

//   return (
//     <>
//       <line ref={ref as any}>
//         <bufferGeometry attach="geometry" onUpdate={onUpdate} />
//         <lineBasicMaterial
//           attach="material"
//           color="#9c88ff"
//           linewidth={10}
//           linecap="round"
//           linejoin="round"
//         />
//       </line>
//       <dragControls args={[[object], camera, gl.domElement]} />
//     </>
//   );
// }

interface MainProps {}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Workspace>
      <Canvas colorManagement>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {children}
        {/* <Scene /> */}
      </Canvas>
    </Workspace>
  );
};
