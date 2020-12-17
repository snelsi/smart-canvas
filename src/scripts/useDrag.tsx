import * as React from "react";

import * as THREE from "three";
import { useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei/OrbitControls";

export const dragContext = React.createContext([null, (newValue: any) => {}]);

export const DragContext = ({
  children,
  maxAzimuthAngle = 0,
  minAzimuthAngle = 0,
  maxPolarAngle = Math.PI / 2,
  minPolarAngle = Math.PI / 2,
  enableZoom = true,
  mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.ROTATE,
  },
  touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN,
    THREE: THREE.TOUCH.ROTATE,
  },
}) => {
  const { gl, camera } = useThree();
  const api = React.useState<any>(true);

  return (
    <>
      <OrbitControls
        args={[camera, gl.domElement]}
        enableDamping={false}
        enabled={api[0]}
        enableZoom={enableZoom}
        maxAzimuthAngle={maxAzimuthAngle}
        maxPolarAngle={maxPolarAngle}
        minAzimuthAngle={minAzimuthAngle}
        minPolarAngle={minPolarAngle}
        mouseButtons={mouseButtons}
        touches={touches}
      />
      <dragContext.Provider value={api}>{children}</dragContext.Provider>
    </>
  );
};

const useDrag = (onDrag, onEnd) => {
  const [active, setActive] = React.useState(false);
  const [, toggle] = React.useContext(dragContext);
  const activeRef = React.useRef<boolean>();
  const down = React.useCallback(
    (e) => {
      setActive(true);
      toggle(false);
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
    },
    [toggle],
  );
  const up = React.useCallback(
    (e) => {
      setActive(false);
      toggle(true);
      e.target.releasePointerCapture(e.pointerId);
      onEnd?.();
    },
    [onEnd, toggle],
  );
  const move = React.useCallback(
    (event) => {
      if (activeRef.current) {
        event.stopPropagation();
        onDrag(event);
      }
    },
    [onDrag],
  );
  React.useEffect(() => {
    activeRef.current = active;
  }, [active]);
  return { onPointerDown: down, onPointerUp: up, onPointerMove: move };
};

export default useDrag;
