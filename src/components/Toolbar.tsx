import { BsPlus, BsSortDown, BsSortUp } from "react-icons/bs";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { useAddQuery } from "../hooks/useAddQuery";
import Heading from "./Heading";
import styles from "./Toolbar.module.css";
import { useEffect, useState } from "react";

interface Props {
  route: string;
  add: string;
}

function Toolbar({ route, add }: Props) {
  const [isClicked, setClicked] = useState(false);

  const handelChanges = (query: string) => {
    if (!isClicked) {
      setQuery("sort", query);
      setClicked(true);
    } else {
      setQuery("sort", " ");
      console.log("I am weak as those colors", isClicked);
      setClicked(false);
    }
  };

  const { setQuery } = useAddQuery();
  return (
    <div className={styles.ToolbarContainer}>
      <Heading margin="1rem 0 0 0" fontSize="2.5rem">All {route}</Heading>
      <div className={styles.rightSideTool}>
        <div className={styles.searchBarContainer}>
          <label htmlFor="search">
            <PiMagnifyingGlassThin />
          </label>
          <input id="search" type="text" placeholder="Search..." />
        </div>

        {/* buttons and search */}
        <div className={styles.Buttons}>
          <div
            className={styles.sortBtn}
            onClick={() => {
              handelChanges("asc");
            }}
          >
            <BsSortDown />
          </div>
          <div className={styles.sortBtn}>
            <BsSortUp
              onClick={() => {
                handelChanges("desc");
              }}
            />
          </div>
          <div className={styles.addBtn} onClick={() => setQuery("add", add)}>
            <BsPlus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
