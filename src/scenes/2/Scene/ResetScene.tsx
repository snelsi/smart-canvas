import * as React from "react";

import shallow from "zustand/shallow";

import { useStore } from "AppContext";
import { useAction } from "scripts";
import { prefix } from "..";

const getSet = (state) => state.set;

interface ResetSceneProps {}

export const ResetScene: React.FC<ResetSceneProps> = () => {
  const setState = useStore(getSet, shallow);

  const resetScene = () => {
    setState((state) => {
      state.fields[`${prefix}scale`] = 1;
      state.fields[`${prefix}x-position`] = 0;
      state.fields[`${prefix}y-position`] = 0;
      state.fields[`${prefix}z-position`] = 0;
      state.fields[`${prefix}x-rotation`] = 0;
      state.fields[`${prefix}y-rotation`] = 0;
      state.fields[`${prefix}z-rotation`] = 0;

      state.fields[`${prefix}rotation-point-x`] = -8;
      state.fields[`${prefix}rotation-point-y`] = 8;
      state.fields[`${prefix}rotation-point-z`] = 0;
    });
  };

  useAction(`${prefix}reset-scene`, resetScene);

  return null;
};
