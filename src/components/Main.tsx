/* eslint-disable @typescript-eslint/no-namespace */
import * as React from "react";
import styled from "@emotion/styled";
import { Canvas, extend } from "react-three-fiber";

import { DragControls } from "three/examples/jsm/controls/DragControls";

extend({ DragControls });

const Workspace = styled.main`
  background-color: var(--color-gray-30);
  overflow: hidden;
  width: 100%;
`;

interface MainProps {}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Workspace>
      <Canvas colorManagement>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Canvas>
    </Workspace>
  );
};
