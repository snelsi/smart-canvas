import React from "react";

import useField from "./useField";

const useAction = (fieldName: string, callback?: () => void) => {
  const [value, setValue] = useField<number>(fieldName);
  const prevValue = React.useRef(value);

  const call = () => setValue((value || 0) + 1);

  React.useEffect(() => {
    if (value && prevValue.current !== value && callback) {
      callback();
      prevValue.current = value;
    }
  }, [value]);

  return { call, calledTimes: value };
};

export default useAction;
