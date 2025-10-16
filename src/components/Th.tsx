import { type CSSProperties } from "react";

interface Props {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
  children: React.ReactNode;
  textTransform?: CSSProperties["textTransform"];
}

function Th({
  textTransform,
  color,
  fontSize,
  fontWeight,
  padding,
  children,
}: Props) {
  const myStyle: CSSProperties = {
    textTransform,
    padding,
    color,
    fontSize,
    fontWeight,
  };

  return <th style={myStyle}>{children}</th>;
}

export default Th;
