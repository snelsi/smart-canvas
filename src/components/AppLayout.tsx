import styled from "styled-components";

export interface AppLayoutProps {}
export const AppLayout = styled.div<AppLayoutProps>`
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
