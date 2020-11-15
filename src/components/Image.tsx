import React from "react";
import styled from "@emotion/styled";

const StyledWrapper = styled.div`
  border: none;
  background: none;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

  & img {
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
export const Image: React.FC<ImageProps> = ({ src, alt = "" }) => {
  return (
    <StyledWrapper className="image-component">
      <img src={src} alt={alt} />
    </StyledWrapper>
  );
};
