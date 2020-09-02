export const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getPositionBetween = (min: number, max: number, variance: number) =>
  random(min - variance, max + variance);

const defaultHueVariance = 40;

const getRandomColor = (baseHue: number, hueVariance: number = defaultHueVariance) => {
  const hue = randomInt(baseHue - hueVariance, baseHue + hueVariance);
  const saturation = randomInt(4, 55);

  return `hsla(${hue}, ${saturation}%, ${randomInt(30, 80)}%, ${random(0.2, 0.6)})`;
};

interface getRandomHexagonProps {
  baseSize: number;
  baseHue: number;
  x: number | number[];
  y: number | number[];
}
export interface IHexagon {
  initialRotation: number;
  rotationSpeed: number;
  x: number;
  y: number;
  size: number;
  color: string;
}
export const getRandomHexagon = ({ baseSize, baseHue, x, y }: getRandomHexagonProps): IHexagon => {
  const size = randomInt(baseSize * 1.2, baseSize * 2);
  const positionVariance = Math.round(0.1 * baseSize);

  const [Xmin, Xmax] = Array.isArray(x) ? x : [x, x];
  const [Ymin, Ymax] = Array.isArray(y) ? y : [y, y];

  return {
    x: getPositionBetween(Xmin - size * 0.5, Xmax - size * 0.5, positionVariance),
    y: getPositionBetween(Ymin - size * 0.5, Ymax - size * 0.5, positionVariance),
    size,
    color: getRandomColor(baseHue, defaultHueVariance),
    initialRotation: randomInt(0, 90),
    rotationSpeed: random(-0.1, 0.1),
  };
};

interface getHexagonsToFillZoneProps {
  width: number;
  height: number;
}
export const getHexagonsToFillZone = ({ width, height }: getHexagonsToFillZoneProps) => {
  const baseHue = randomInt(200, 300);

  const smallerSize = Math.min(width, height);

  /* putting big hexagons in the screen corners */
  /* so that we have the whole screen covered */
  const cornerHexagons: IHexagon[] = [];
  for (let i = 0; i <= Math.round(width / smallerSize); i++) {
    for (let j = 0; j <= Math.round(height / smallerSize); j++) {
      cornerHexagons.push(
        getRandomHexagon({
          baseSize: Math.max(width, height),
          x: i * width,
          y: j * height,
          baseHue,
        }),
      );
    }
  }

  /* Then adding some more hexagons randomly on the screen */
  const extraHexagons = [...new Array(randomInt(5, 10))].map(() => {
    return getRandomHexagon({
      baseSize: smallerSize,
      x: [0, width],
      y: [0, height],
      baseHue,
    });
  });
  return [...cornerHexagons, ...extraHexagons];
};
