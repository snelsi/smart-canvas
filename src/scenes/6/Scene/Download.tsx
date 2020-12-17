import * as React from "react";

import shallow from "zustand/shallow";

import { useStore } from "AppContext";
import { useAction } from "scripts";
import { prefix } from "..";

const downloadObjectAsJson = (exportObj, exportName) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const getState = (state) => state.fields;

interface DownloadProps {}

export const Download: React.FC<DownloadProps> = () => {
  const fields = useStore(getState, shallow);

  const curves = fields[`${prefix}curves`];
  const save = React.useMemo(() => ({ curves }), [curves]);
  const downloadState = React.useCallback(() => {
    downloadObjectAsJson(save, "points");
  }, [save]);

  useAction(`${prefix}download`, downloadState);

  return null;
};
