import { type CSSProperties, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RxCheck } from "react-icons/rx";
import styles from "./reactDropDown/DropDownStructure.module.css";
import { useAddQuery } from "../hooks/useAddQuery";
import toCamelCase from "../utils/toCamelCase";

interface BaseProps<T> {
  options: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  queryKey: string; // e.g. "branchId"
  heightForButton?: string;
  widthBtn?: string;
  widthDropBtn?: string;
  margin?: string;
  scrollToBeAvailable?: number;
}

function DropDownForURL<T extends Record<string, any>>({
  options,
  labelKey,
  valueKey,
  queryKey,
  heightForButton = "2.5rem",
  widthBtn,
  widthDropBtn,
  scrollToBeAvailable = 7,
  margin,
}: BaseProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setQuery, getQuery } = useAddQuery();

  const stylesForButton: CSSProperties = {
    height: heightForButton,
    width: widthBtn,
    margin,
  };

  // 🔹 Get the current value from the URL
  const queryValue = getQuery(queryKey);

  // 🔹 Find selected option based on URL
  const selectedOption = options.find(
    (opt) => String(opt[valueKey]) === String(queryValue ?? "")
  );

  const selectedLabel = selectedOption
    ? String(selectedOption[labelKey])
    : "Select a Class";

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 🔹 Close dropdown when clicking outside
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

  // 🔹 Handle click on an item
  const handleItemClick = (option: T) => {
    const value = String(option[valueKey]);
    setQuery(queryKey, value); // 🟢 Update the URL
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
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
            overflowY: options.length > scrollToBeAvailable ? "scroll" : "auto",
            maxHeight: "21.8rem",
          }}
        >
          {options.map((option, index) => {
            const label = String(option[labelKey]);
            const value = String(option[valueKey]);
            const isSelected = value === String(queryValue);

            return (
              <li
                key={index}
                onClick={() => handleItemClick(option)}
                style={{
                  marginBottom:
                    options.length > scrollToBeAvailable ? ".5rem" : "",
                }}
              >
                {toCamelCase(label)} {isSelected && <RxCheck />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDownForURL;
