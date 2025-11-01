import type { CSSProperties } from "react";

interface Props {
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontSize?: string;
  margin?: string;
  padding?: string;
  children: React.ReactNode;
  textAlign?: CSSProperties["textAlign"];
  display?: CSSProperties["display"];
  textTransform?: CSSProperties["textTransform"];
  letterSpacing?: CSSProperties["letterSpacing"];
  wordSpacing?: CSSProperties["wordSpacing"];
  fontWeight?: CSSProperties["fontWeight"] | string;
}
function Heading({
  fontSize ,
  fontWeight,
  margin,
  children,
  textAlign,
  display ="flex",
  textTransform,
  letterSpacing,
  wordSpacing,
  padding,
  element = "h1",
}: Props) {
  const styles: CSSProperties = {
    fontSize,
    margin,
    textAlign,
    display,
    textTransform,
    letterSpacing,
    wordSpacing,
    fontWeight,
    padding,
    alignItems:'center',
    gap: '1rem'
  };
  const Tag = element;
  return <Tag style={styles}>{children}</Tag>;
}

export default Heading;
