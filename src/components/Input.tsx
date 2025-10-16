import type { CSSProperties } from "react";
import styles from "./Input.module.css";

interface Props {
  type?: "text" | "password" | "number" | "email" | 'date';
  id?: string;
  placeholder?: string;
  containerPosition?: CSSProperties["position"];
  width?: string;
  padding?: string;
  borderColor?: string;
  borderRadius?: string;
  bgColor?: string;
  color?: string;
  placeholderFontSize?: string;
  placeholderColor?: string;
  min?: number,
  max?:number;

  // Zod + RHF support
  isWithZod: boolean;
  isValueAsNumber?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  registerValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dirtyFields?: Record<string, any>;
}

function Input({
  containerPosition = "relative",
  type = "text",
  id,
  placeholder,
  width,
  padding,
  borderColor,
  borderRadius,
  bgColor,
  color,
  placeholderFontSize,
  placeholderColor,
  max,min,

  // zod validation with react-hook-form
  isWithZod = false,
  isValueAsNumber = false,
  register,
  registerValue,
  errors = {},
  dirtyFields = {},
}: Props) {
  const containerStyle: CSSProperties = {
    position: containerPosition,
  };

  const inputStyle: CSSProperties = {
    width,
    padding,
    borderColor,
    borderRadius,
    backgroundColor: bgColor,
    color,
    outline: "none",

    // support dynamic placeholder styling
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["--placeholder-color" as any]: placeholderColor,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["--placeholder-size" as any]: placeholderFontSize,
  };

  // Determine error/valid styling
  const hasError = registerValue && errors[registerValue];
  const isDirty = registerValue && dirtyFields[registerValue];

  return (
    <div className={styles.inputContainer} style={containerStyle}>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        min={min}
        max={max}
        style={inputStyle}
        {...(isWithZod && register && registerValue
          ? register(registerValue, isValueAsNumber ? { valueAsNumber: true } : {})
          : {})}
        className={`${hasError ? styles.borderRed : isDirty ? styles.green : ""}`}
      />

      {hasError && (
        <p className={styles.error}>{errors[registerValue!]?.message}</p>
      )}
    </div>
  );
}

export default Input;
