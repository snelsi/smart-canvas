import * as React from "react";
import { withRouter, Redirect } from "react-router-dom";

import { Sidebar, Main } from "components";
import { scenes } from "scenes";

export const SceneSetup = withRouter(({ location: { pathname } }) => {
  const scene = scenes[pathname];

  if (!scene) return <Redirect to={String(Object.entries(scenes)[0][0])} />;

  return (
    <>
      <Sidebar {...scene} />
      <Main>{scene.scene}</Main>
    </>
  );
});
