import styled from "@emotion/styled";

export interface AppLayoutProps {}
export const AppLayout = styled.div<AppLayoutProps>`
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  @media (max-width: 720px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 1fr;

    & > .navbar {
      grid-column: 1 / 3;
    }
  }
`;
