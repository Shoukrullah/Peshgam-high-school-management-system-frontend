import { PiStudentFill, PiUser } from "react-icons/pi";
import { RxHome } from "react-icons/rx";
import type { branches } from "../types/branches";
import styles from "./BranchPerId.module.css";
import ShowInfo from "./ShowInfo";

function EachBranchShowInfo({ data }: { data: branches | null }) {
  if (!data) return;
  return (
    <div className={styles.ShowInfoContainer}>
      <ShowInfo icon={<RxHome />} label="Total Classes">
        {data?.classes.length}
      </ShowInfo>
      <ShowInfo icon={<PiStudentFill />} label="Total Students">
        {data?.students.length}
      </ShowInfo>
      <ShowInfo icon={<PiUser />} label="Total Teachers">
        {data?.teachers.length}
      </ShowInfo>
    </div>
  );
}

export default EachBranchShowInfo;
