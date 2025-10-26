import { useAddQuery } from "../hooks/useAddQuery";
import type { studentShape } from "../types/students";
import toCamelCase from "../utils/toCamelCase";
import styles from "./AttendanceDescription.module.css";
import AttendanceForm from "./AttendanceForm";
import Heading from "./Heading";

interface Props {
  data: studentShape[] | null;
}

function AttendanceDescription({ data }: Props) {
  const { getQuery } = useAddQuery();
  const classId = getQuery("classId") || undefined;

  if (!classId) return;

  if (!data) return;

  if (data.length === 0) return <p>No students are found.</p>;
  const className = data?.map((stu) => stu.class?.name)[0];

  return (
    <div className={styles.attendanceDescriptionContainer}>
      <Heading element="h2" textAlign="center">
        Attendance for Class {toCamelCase(className || "")}
      </Heading>
      <AttendanceForm studentData={data} />
    </div>
  );
}

export default AttendanceDescription;
