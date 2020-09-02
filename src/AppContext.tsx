import React from "react";

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
  const [appState, setAppState] = React.useState(() => initialState);
  const stateRef = React.useRef(appState);

  const setStateProp = React.useCallback((name = "", value: any) => {
    const newState = { ...stateRef.current, [name]: value };
    stateRef.current = newState;
    setAppState(newState);
  }, []);
  const setStateProps = React.useCallback((values: object = {}) => {
    const newState = { ...stateRef.current, ...values };
    stateRef.current = newState;
    setAppState(newState);
  }, []);
  const resetState = React.useCallback(
    (newState = initialState) => {
      stateRef.current = newState;
      setAppState(newState);
    },
    [initialState],
  );

  return (
    <AppContext.Provider
      value={{
        state: appState,
        helpers: {
          setAppState,
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
