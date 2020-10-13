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
      state.fields[`${prefix}Syx`] = 0;
      state.fields[`${prefix}Szx`] = 0;
      state.fields[`${prefix}Sxy`] = 0;
      state.fields[`${prefix}Szy`] = 0;
      state.fields[`${prefix}Sxz`] = 0;
      state.fields[`${prefix}Syz`] = 0;

      state.fields[`${prefix}scale-x`] = 1;
      state.fields[`${prefix}scale-y`] = 1;
    });
  };

  useAction(`${prefix}reset-scene`, resetScene);

  return null;
};
