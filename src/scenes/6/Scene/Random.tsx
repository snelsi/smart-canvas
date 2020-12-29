import * as React from "react";

import shallow from "zustand/shallow";

import { useStore } from "AppContext";
import { useAction } from "scripts";
import { prefix } from "..";

const getState = (state) => state.fields;

interface DownloadProps {}

export const Download: React.FC<DownloadProps> = () => {
  const fields = useStore(getState, shallow);

  const curves = fields[`${prefix}curves`];
  const save = React.useMemo(() => ({ curves }), [curves]);
  const setState = React.useCallback(() => {}, [save]);

  useAction(`${prefix}random`, setState);

  return null;
};
