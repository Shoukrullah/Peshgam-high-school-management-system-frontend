import type { CSSProperties } from "react";
import styles from "./Spinner.module.css";

interface Props {
  marginTop?: number;
  width?: number;
  height?: number;
  margin?: string;
}

function Spinner({marginTop = 0,height=40,width=40,margin} : Props) {
  const stylesCSS: CSSProperties = {
    marginTop: marginTop +'px',
    height: height + 'px',
    width: width + 'px',
    margin
  }
  return (
    <div className={styles.spinnerContainer} >
      <div className={styles.spinner} style={stylesCSS}></div>
    </div>
  );
}

export default Spinner;
