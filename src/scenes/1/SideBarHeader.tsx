import * as React from "react";
import FigureSvg from "./Figure.svg";
import FigureJpg from "./Figure.jpg";
import { Image } from "components";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <>
      <Image src={FigureSvg} lightboxSource={FigureJpg} alt="Figure scheme" />
      <ul>
        <li>N - Сторона квадрата</li>
        <li>R1 - Внутренний радиус центрального круга</li>
        <li>R2 - Внешний радиус центрального круга</li>
        <li>R3 - Радиус угловых кругов</li>
        <li>R4 - Радиус диагональных кругов</li>
      </ul>
    </>
  );
};
