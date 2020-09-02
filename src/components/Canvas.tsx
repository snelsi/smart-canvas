import * as React from "react";
import { random } from "scripts";

export const CanvasContext = React.createContext<CanvasRenderingContext2D>(null);
export const FrameContext = React.createContext(0);

interface CanvasProps {
  height: number;
  width: number;
  dpr: number;
  isAnimating: boolean;
  onClick?: () => void;
}
export const Canvas: React.FC<CanvasProps> = ({
  height,
  width,
  dpr,
  isAnimating,
  onClick,
  children,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const actualWidth = width * dpr;
  const actualHeight = height * dpr;

  // the canvas' context is stored once it's created
  const [context, setContext] = React.useState<CanvasRenderingContext2D>();
  React.useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext !== null) {
        canvasContext.scale(dpr, dpr);
        canvasContext.globalCompositeOperation = "soft-light";
        setContext(canvasContext);
      }
    }
  }, [dpr]);

  // making the component and the context re-render at every frame
  const [frameCount, setFrameCount] = React.useState(0);
  React.useEffect(() => {
    let frameId: number;
    if (isAnimating) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1);
      });
    }
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isAnimating, frameCount, setFrameCount]);

  // whenever the canvas' dimensions change, it's automatically cleared
  // we need to re-draw all its children in this case */
  React.useLayoutEffect(() => {
    setFrameCount(random(1));
  }, [width, height]);

  // we need to clear the whole canvas before drawing the children
  if (context !== undefined) {
    context.clearRect(0, 0, actualWidth, actualHeight);
  }

  return (
    <CanvasContext.Provider value={context}>
      <FrameContext.Provider value={frameCount}>
        <canvas
          ref={canvasRef}
          height={actualHeight}
          width={actualWidth}
          style={{ width, height }}
          onClick={onClick}
        />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  );
};
