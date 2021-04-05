import * as React from "react";

import * as THREE from "three";
import shallow from "zustand/shallow";
import { useThree } from "@react-three/fiber";

import { useStore } from "AppContext";
import { useField, useAction, degToRad, round } from "scripts";
import { prefix } from "..";

const getSet = (state) => state.set;

interface RotateFigureAroundPointProps {
  rotationPointName?: string;
  objectName?: string;
}

export const RotateFigureAroundPoint: React.FC<RotateFigureAroundPointProps> = ({
  rotationPointName = "2SceneRotationPoint",
  objectName = "2RotationSceneFigure",
}) => {
  const { scene } = useThree();

  const setState = useStore(getSet, shallow);

  const rotateFigureAroundPoint = ({ valX = 0, valY = 0, valZ = 0 } = {}) => {
    const anchor = scene.getObjectByName(rotationPointName);
    const object = scene.getObjectByName(objectName);

    const prevRotationX = object.rotation.x;
    const prevRotationY = object.rotation.y;
    const prevRotationZ = object.rotation.z;

    object.rotateX(-prevRotationX);
    object.rotateY(-prevRotationY);
    object.rotateZ(-prevRotationZ);

    const anchorPoint = new THREE.Vector3(anchor.position.x, anchor.position.y, anchor.position.z);
    const objectPoint = new THREE.Vector3(object.position.x, object.position.y, object.position.z);

    // step 1: calculate move direction and move distance:
    let axis = new THREE.Vector3(
      anchorPoint.x - objectPoint.x,
      anchorPoint.y - objectPoint.y,
      anchorPoint.z - objectPoint.z,
    );

    axis.normalize();
    const moveDist = object.position.distanceTo(anchorPoint);

    // step 2: move camera to anchor point
    object.translateOnAxis(axis, moveDist);

    // step 3: rotate camera
    object.rotateX(degToRad(valX));
    object.rotateY(degToRad(valY));
    object.rotateZ(degToRad(valZ));

    // step4: move camera along the opposite direction
    axis = axis.multiplyScalar(-1);
    object.translateOnAxis(axis, moveDist);

    object.rotateX(prevRotationX);
    object.rotateY(prevRotationY);
    object.rotateZ(prevRotationZ);

    setState((state) => {
      state.fields[`${prefix}x-position`] = round(object.position.x, 10000);
      state.fields[`${prefix}y-position`] = round(object.position.y, 10000);
      state.fields[`${prefix}z-position`] = round(object.position.z, 10000);
      state.fields[`${prefix}x-rotation`] = round(object.rotation.x * THREE.MathUtils.RAD2DEG);
      state.fields[`${prefix}x-rotation`] = round(object.rotation.y * THREE.MathUtils.RAD2DEG);
      state.fields[`${prefix}z-rotation`] = round(object.rotation.z * THREE.MathUtils.RAD2DEG);
    });
  };

  const [value] = useField<number>(`${prefix}rotate-action-value`);
  useAction(`${prefix}rotate-action-1`, () => rotateFigureAroundPoint({ valZ: value || 0 }));
  useAction(`${prefix}rotate-action-2`, () => rotateFigureAroundPoint({ valZ: -value || 0 }));

  return null;
};
