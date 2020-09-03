import React from "react";
import { useImmer } from "use-immer";

interface AppContextProps {
  state: object;
  helpers: {
    setAppState: (value: any) => void;
    setStateProp: (name: string, value: any) => void;
    setStateProps: (values: object) => void;
    resetState: (newState?: object) => void;
  };
}
export const AppContext = React.createContext<AppContextProps>({
  state: {},
  helpers: {
    setAppState: () => {},
    setStateProp: () => {},
    setStateProps: () => {},
    resetState: () => {},
  },
});
export const useAppContext = () => React.useContext(AppContext);

export interface AppContextProviderProps {
  initialState?: object;
}
export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  initialState = {},
  children,
  ...props
}) => {
  const [appState, updateAppState] = useImmer(initialState);

  const setStateProp = React.useCallback(
    (name = "", value: any) => {
      updateAppState((draft) => {
        draft[name] = value;
      });
    },
    [updateAppState],
  );

  const setStateProps = React.useCallback(
    (values: object = {}) => {
      updateAppState((draft) => {
        for (const [key, value] of Object.entries(values)) {
          draft[key] = value;
        }
      });
    },
    [updateAppState],
  );
  const resetState = React.useCallback(
    (newState = initialState) => {
      updateAppState(newState);
    },
    [initialState, updateAppState],
  );

  return (
    <AppContext.Provider
      value={{
        state: appState,
        helpers: {
          setAppState: updateAppState,
          setStateProp,
          setStateProps,
          resetState,
        },
      }}
      {...props}
    >
      {children}
    </AppContext.Provider>
  );
};
