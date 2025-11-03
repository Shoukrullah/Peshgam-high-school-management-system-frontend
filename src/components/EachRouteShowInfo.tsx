import { BsPerson, BsStar } from "react-icons/bs";
import { PiStudentFill, PiUser } from "react-icons/pi";
import { RxHome } from "react-icons/rx";
import type { branches } from "../types/branches";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import styles from "./BranchPerId.module.css";
import ShowInfo from "./ShowInfo";

function EachRouteShowInfo({
  data,
  type,
}: {
  data: branches | classes | studentShape | teacherShape | null;
  type: "students" | "teachers" | "branches" | "classes";
}) {
  if (!data) return;
  if (type === "branches") {
    const branch = data as branches;
    return (
      <div className={styles.ShowInfoContainer}>
        <ShowInfo icon={<RxHome />} label="Total Classes">
          {branch?.classes.length}
        </ShowInfo>
        <ShowInfo icon={<PiStudentFill />} label="Total Students">
          {branch?.students.length}
        </ShowInfo>
        <ShowInfo icon={<PiUser />} label="Total Teachers">
          {branch?.teachers.length}
        </ShowInfo>
      </div>
    );
  }

  if (type === "classes") {
    const MyClass = data as classes;
    return (
      <div className={styles.ShowInfoContainer}>
        <ShowInfo icon={<PiStudentFill />} label="Total Students">
          {MyClass.students.length}
        </ShowInfo>
        {MyClass.teacher && (
          <ShowInfo icon={<BsPerson />} label="Instructor">
            {MyClass.teacher?.firstName + " " + MyClass.teacher?.lastName}
          </ShowInfo>
        )}
        <div>
          <p>A Chart must be added</p>
        </div>
      </div>
    );
  }
  if (type === "teachers") {
    const teacher = data as teacherShape;
    return (
      <div
        className={styles.ShowInfoContainer}
        style={{ justifyContent: "flex-start", gap: "3rem" }}
      >
        <ShowInfo icon={<PiStudentFill />} label="Total Classes">
          {teacher.classes.length}
        </ShowInfo>
        {teacher.degree && (
          <ShowInfo icon={<BsStar />} label="Degree (Study level)">
            {teacher.degree?.charAt(0).toUpperCase() + teacher.degree?.slice(1)}
          </ShowInfo>
        )}
      </div>
    );
  }
}

export default EachRouteShowInfo;
