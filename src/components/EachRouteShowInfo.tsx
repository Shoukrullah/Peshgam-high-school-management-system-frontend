import { BsBuilding, BsGear, BsPerson, BsStar } from "react-icons/bs";
import { PiChair, PiStudentFill, PiUser } from "react-icons/pi";
import { RxHome } from "react-icons/rx";
import type { branches } from "../types/branches";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import styles from "./BranchPerId.module.css";
import ShowInfo from "./ShowInfo";
import ChartHalfCircleForClassAttendance from "./ChartHalfCircleForClassAttendance";

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
          <ChartHalfCircleForClassAttendance data={MyClass} />
        </div>
      </div>
    );
  }
  if (type === "teachers") {
    const teacher = data as teacherShape;
    return (
      <div className={styles.ShowInfoContainer}>
        <ShowInfo icon={<BsBuilding />} label="Branch">
          {teacher.branch.name}
        </ShowInfo>
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
  if (type === "students") {
    const student = data as studentShape;
    return (
      <div>
        <div className={styles.ShowInfoContainer}>
          <ShowInfo icon={<BsBuilding />} label="Branch">
            {student.branch.name}
          </ShowInfo>
          <ShowInfo icon={<PiChair />} label="Class">
            {student.class?.name}
          </ShowInfo>
          <ShowInfo icon={<BsGear />} label="Student Current Status">
            {student.status}
          </ShowInfo>
        </div>
      </div>
    );
  }
}

export default EachRouteShowInfo;
