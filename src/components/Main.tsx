import * as React from "react";
import styled from "styled-components";
import useDimensions from "react-use-dimensions";

import { Canvas } from "components";

const Workspace = styled.main`
  background-color: var(--color-gray-30);
`;

interface MainProps {}

export const Main: React.FC<MainProps> = ({ children }) => {
  const [ref, { width, height }] = useDimensions();
  const dpr = window.devicePixelRatio || 1;

  return (
    <Workspace ref={ref}>
      {width === undefined || height === undefined || dpr === undefined ? (
        <span role="img" aria-label="thinking face">
          🤔
        </span>
      ) : (
        <Canvas width={width} height={height} dpr={dpr} isAnimating>
          {children}
        </Canvas>
      )}
    </Workspace>
  );
};
