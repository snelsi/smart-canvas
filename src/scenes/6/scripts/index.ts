import { IPoint, ICurve } from "../Scene/Curve";

export const pointToKey = (point: IPoint): string =>
  point ? `${point.x}-${point.y}-${point.z}` : undefined;
export const curveToKey = (curve: ICurve) =>
  curve
    ? `${pointToKey(curve.points[0])}-${pointToKey(curve.points[1])}-${pointToKey(curve.points[2])}`
    : undefined;
