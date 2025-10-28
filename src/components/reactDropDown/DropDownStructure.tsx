import { type CSSProperties, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RxCheck } from "react-icons/rx";
import type { ControllerRenderProps } from "react-hook-form";
import styles from "./DropDownStructure.module.css";
import toCamelCase from "../../utils/toCamelCase";

interface BaseProps<T> {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  heightForButton?: string;
  widthBtn?: string;
  widthDropBtn?: string;
  margin?: string;
  scrollToBeAvailable?: number;
  field?: ControllerRenderProps<any, any>;
  disabled?:boolean
}

function DropDownStructure<T>({
  options,
  labelKey,
  valueKey,
  heightForButton = "2.5rem",
  widthBtn,
  widthDropBtn,
  scrollToBeAvailable = 7,
  margin,
  field,
  disabled = false
}: BaseProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const stylesForButton: CSSProperties = {
    height: heightForButton,
    width: widthBtn,
    margin,
  };

  // 🔹 Determine selected item (form value or default first)
  const selectedOption =
    options.find(
      (opt) => (valueKey ? opt[valueKey] : opt[labelKey]) === field?.value
    ) || options[0];

  // 🔹 Automatically set first option as default if field is empty
  useEffect(() => {
    if (field && !field.value && options.length > 0) {
      const firstValue = valueKey ? options[0][valueKey] : options[0][labelKey];
      field.onChange(firstValue);
    }
  }, [field, options, valueKey, labelKey]);

  const selectedLabel = selectedOption ? String(selectedOption[labelKey]) : "";

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleItemClick = (option: T) => {
    setIsOpen(false);
    const value = valueKey ? option[valueKey] : option[labelKey];
    field?.onChange(value);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
      disabled = {disabled}
        style={stylesForButton}
        className={`${styles.btn} ${
          isOpen ? `${styles.btnActive} ${styles.activeOutline}` : ""
        }`}
        onClick={toggleDropdown}
        type="button"
      >
        {toCamelCase(selectedLabel)}
        <FaChevronDown className={isOpen ? styles.rotateSVG : ""} />
      </button>

      {isOpen && (
        <ul
          style={{
            width: widthDropBtn,
            overflowY: options.length > 7 ? "scroll" : "auto",
            maxHeight: "21.8rem",
          }}
        >
          {options.map((option, index) => {
            const label = String(option[labelKey]);
            const value = valueKey ? option[valueKey] : label;
            return (
              <li
                key={index}
                onClick={() => handleItemClick(option)}
                style={{
                  marginBottom:
                    options.length > scrollToBeAvailable ? ".5rem" : "",
                }}
              >
                {toCamelCase(label)} {field?.value === value && <RxCheck />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDownStructure;
