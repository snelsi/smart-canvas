import * as React from "react";
import styled from "@emotion/styled";

import shallow from "zustand/shallow";

import { useAction } from "scripts";
import { useStore } from "AppContext";
import { Image } from "components";
import Bezier from "./bezier.gif";
import { prefix } from ".";

const Header = styled.p`
  input {
    display: none;
  }
`;

const getState = (state) => state.set;

interface SideBarHeaderProps {}

export const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
  const [file, setFile] = React.useState(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onReaderLoad = (e: ProgressEvent<FileReader>) =>
    setFile(JSON.parse(e.target.result as string));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files[0];
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(targetFile);
    event.target.value = null;
  };

  const setState = useStore(getState, shallow);

  React.useEffect(() => {
    if (file) {
      const curves = file?.curves;
      setState((state) => {
        state.fields[`${prefix}curves`] = curves || [];
      });
      setFile(null);
    }
  }, [file]);

  const uploadState = async () => inputRef.current.click();

  useAction(`${prefix}upload`, uploadState);

  return (
    <>
      <Image
        src={Bezier}
        alt="Quadratic curve illustration"
        style={{ padding: "2em 0", backgroundColor: "white" }}
      />
      <Header>
        <input type="file" ref={inputRef} onChange={onChange} />
      </Header>
    </>
  );
};
