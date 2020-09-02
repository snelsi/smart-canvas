import React from "react";
import styled from "styled-components";
import FsLightbox from "fslightbox-react";

const StyledButton = styled.button`
  border: none;
  background: none;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

  & > img {
    margin: 0;
    padding: 0;
    border-radius: inherit;
    display: block;
    height: 100%;
    width: 100%;
  }
`;

interface ImageProps {
  src: string;
  lightboxSource?: string;
  alt: string;
}
export const Image: React.FC<ImageProps> = ({ src, lightboxSource = src, alt = "" }) => {
  const [toggler, setToggler] = React.useState(false);

  return (
    <div className="image-component">
      <StyledButton onClick={() => setToggler(!toggler)}>
        <img src={src} alt={alt} />
      </StyledButton>
      <FsLightbox toggler={toggler} sources={[lightboxSource]} />
    </div>
  );
};
