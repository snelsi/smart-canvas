import { useCallback, useEffect } from "react";
import shallow from "zustand/shallow";

import { useStore } from "AppContext";

const useField = <T>(fieldName: string, defaultValue?: T) => {
  const [state, setState] = useStore(
    useCallback((state) => [state.fields[fieldName], state.set], [fieldName]),
    shallow,
  );

  const setFieldValue = useCallback(
    (filter: T) => {
      setState((state) => {
        state.fields[fieldName] = filter;
      });
    },
    [setState, fieldName],
  );

  useEffect(() => {
    if (state === undefined && defaultValue !== undefined) {
      setFieldValue(defaultValue);
    }
  }, [state, defaultValue]);

  return [state, setFieldValue] as [T, typeof setFieldValue];
};

export default useField;
