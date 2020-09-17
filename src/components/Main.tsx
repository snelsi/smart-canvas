import * as React from "react";
import styled from "styled-components";
import { Canvas } from "react-three-fiber";

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
