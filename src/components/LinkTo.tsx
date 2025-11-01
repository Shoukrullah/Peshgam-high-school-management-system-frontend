import { Link } from "react-router-dom";
import styles from "./LinkTo.module.css";
import type { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  href: string;
  marginTop?: number;
  width?: string;
  bgColor?: string;
  textDecoration?: CSSProperties["textDecoration"];
  underLineMargin?: CSSProperties["textUnderlineOffset"];
}

function LinkTo({
  children,
  href,
  marginTop,
  width,
  bgColor,
  textDecoration,
  underLineMargin,
}: Props) {
  const newStyles: CSSProperties = {
    marginTop: marginTop + "px",
    width,
    backgroundColor: bgColor,
  };
  return (
    <Link to={href} className={styles.Link} style={newStyles}>
      {children}
    </Link>
  );
}

export default LinkTo;
