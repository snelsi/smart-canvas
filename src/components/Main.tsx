import * as React from "react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";

const Workspace = styled.main`
  background-color: var(--color-gray-30);
  overflow: hidden;
  width: 100%;
`;

interface MainProps {}

export const Main: React.FC<MainProps> = ({ children }) => (
  <Workspace>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  </Workspace>
);
