import * as React from "react";
import Epitrochoid from "./epitrochoid.gif";
import { Image } from "components";

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  return (
    <>
      <Image src={Epitrochoid} lightboxSource={Epitrochoid} alt="Figure scheme" />
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Epicycloid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span role="img" aria-label="Twist figure">
            ➰
          </span>{" "}
          Эпициклоида
        </a>
      </p>
    </>
  );
};
