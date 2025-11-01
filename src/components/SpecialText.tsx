import type { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
  borderRadius?: string;
  width?: string;
  gap?: string;
  textSize?: string;
  padding?: string;
  margin?: string;
}

function SpecialText({
  children,
  bgColor = "var(--primary-color-weak)",
  gap = ".5rem",
  borderRadius = "2rem",
  color,
  width,
  textSize = "1.2rem",
  padding = ".1rem 1rem",
  margin,
}: Props) {
  const style: CSSProperties = {
    backgroundColor: bgColor,
    borderRadius,
    color,
    width,
    display: "inline-flex",
    alignItems: "center",
    gap,
    fontSize: textSize,
    padding,
    margin,
  };
  return <p style={style}>{children}</p>;
}

export default SpecialText;
