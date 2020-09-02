import * as React from "react";
import { AppLayout, NavBar, SceneSetup } from "components";

import { AppContextProvider } from "AppContext";

const App: React.FC = () => {
  // const [hexagons, setHexagons] = React.useState<IHexagon[]>(() =>
  //   getHexagonsToFillZone({
  //     height: height * dpr,
  //     width: width * dpr,
  //   }),
  // );

  // const getNewHexagons = React.useCallback(
  //   () =>
  //     setHexagons(
  //       getHexagonsToFillZone({
  //         height: height * dpr,
  //         width: width * dpr,
  //       }),
  //     ),
  //   [height, width, dpr],
  // );

  // React.useEffect(() => {
  //   getNewHexagons();
  // }, [getNewHexagons]);

  return (
    <AppContextProvider>
      <AppLayout>
        <NavBar />
        <SceneSetup />
      </AppLayout>
    </AppContextProvider>
  );
};

export default App;
