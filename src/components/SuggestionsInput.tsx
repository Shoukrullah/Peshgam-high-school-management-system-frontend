import { useState, useRef, useEffect, type CSSProperties } from "react";
import styles from "./SuggestionsInput.module.css";
import { RxCheck } from "react-icons/rx";

interface Props {
  type?: "text" | "password" | "number" | "email" | "date";
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
  min?: number;
  max?: number;

  suggestions?: string[];
  onSelectSuggestion?: (value: string) => void;

  // zod + RHF
  isWithZod: boolean;
  isValueAsNumber?: boolean;
  register?: any;
  registerValue?: string;
  errors?: Record<string, any>;
  dirtyFields?: Record<string, any>;
  setValue?: any;
}

function SuggestionsInput({
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
  max,
  min,

  suggestions = [],
  onSelectSuggestion,

  isWithZod = false,
  isValueAsNumber = false,
  register,
  registerValue,
  errors = {},
  dirtyFields = {},
  setValue,
}: Props) {
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState(suggestions[0] || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const hasError = registerValue && errors[registerValue];
  const isDirty = registerValue && dirtyFields[registerValue];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set default value to first suggestion
  useEffect(() => {
    if (isWithZod && registerValue && setValue && suggestions.length > 0) {
      setValue(registerValue, suggestions[0], { shouldValidate: true });
      setCurrentValue(suggestions[0]);
    }
  }, [isWithZod, registerValue, setValue, suggestions]);

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
    ["--placeholder-color" as any]: placeholderColor,
    ["--placeholder-size" as any]: placeholderFontSize,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentValue(val);

    if (suggestions.length > 0 && val.trim().length > 0) {
      const filteredList = suggestions.filter((item) =>
        item.toLowerCase().startsWith(val.toLowerCase())
      );
      setFiltered(filteredList);
      setShow(filteredList.length > 0);
    } else {
      setShow(false);
    }
  };

  const handleSelect = (item: string) => {
    setCurrentValue(item);

    if (isWithZod && registerValue && setValue) {
      setValue(registerValue, item, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    onSelectSuggestion?.(item);
    setShow(false);
  };

  return (
    <div
      className={styles.inputContainer}
      style={containerStyle}
      ref={containerRef}
    >
      <input
        id={id}
        type={type}
        min={min}
        max={max}
        autoComplete="off"
        placeholder={placeholder}
        style={inputStyle}
        {...(isWithZod && register && registerValue
          ? register(registerValue, {
              valueAsNumber: isValueAsNumber,
              onChange: handleInputChange,
            })
          : { onChange: handleInputChange })}
        onFocus={() => setShow(true)}
        className={`${hasError ? styles.borderRed : isDirty ? styles.green : ""}`}
        value={currentValue}
      />

      {show && filtered.length > 0 && (
        <ul className={styles.suggestionList}>
          {filtered.map((item) => (
            <li
              key={item}
              className={styles.suggestionItem}
              onClick={() => handleSelect(item)}
            >
              {item} {currentValue === item && <RxCheck />}
            </li>
          ))}
        </ul>
      )}

      {hasError && (
        <p className={styles.error}>{errors[registerValue!]?.message}</p>
      )}
    </div>
  );
}

export default SuggestionsInput;
