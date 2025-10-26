import type { CSSProperties } from "react";
import styles from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onHandelFunction?: () => void;
  type?: "button" | "submit" | "reset";
  bgcolor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  color?: string;
  border?:string;
  fontSize?:string;
  gap?: string,
  boxShadow?:string;
}

function Button({
  children,
  bgcolor,
  borderRadius,
  height,
  margin,
  padding,
  type = "button",
  width,
  onHandelFunction,
  disabled = false,
  color,
  border,
  fontSize,
  gap = '0.5rem',
  boxShadow

}: Props) {
  const myButtonStyle: CSSProperties = {
    width,
    height,
    margin,
    padding,
    backgroundColor: bgcolor,
    borderRadius,
    color,
    border,
    fontSize,
    gap,
    boxShadow
  };
  return (
    <button
      onClick={onHandelFunction}
      className={styles.button}
      style={myButtonStyle}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
