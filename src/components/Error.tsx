import { RxReload } from "react-icons/rx";
import { useLocation } from "react-router";
import styles from "./Error.module.css";
import Heading from "./Heading";

function Error({ error }: { error: string }) {
  const { pathname } = useLocation();
  return (
    <div className={styles.error}>
      <Heading element="h2">{error}</Heading>
      <a href={pathname} className={`${styles.refresh}`}>
        Refresh the page <RxReload size={12} />
      </a>
    </div>
  );
}

export default Error;
