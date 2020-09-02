import * as React from "react";
import FigureSvg from "./Figure.svg";
import FigureJpg from "./Figure.jpg";
import { Image } from "components";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <>
      <h2>
        <a href="tasks/lab1.pdf" target="_blank" rel="noopener noreferrer">
          Лiнiйнi перетворення
        </a>
      </h2>
      <Image src={FigureSvg} lightboxSource={FigureJpg} alt="Figure scheme" />
      <ul>
        <li>N - Сторона квадрата</li>
        <li>R1 - Внутрiшнiй радiус центрального кола</li>
        <li>R2 - Зовнiшнiй радiус центрального кола</li>
        <li>R3 - Радiус кутових кiл</li>
        <li>R4 - Радiус дiагональних кiл</li>
        <li>D - Вiдстань вiд центра фiгури до центра до центра кутових кiл</li>
      </ul>
    </>
  );
};
