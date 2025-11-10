import type { studentShape } from "../types/students";
import ChartStudentAttendancePerId from "./ChartStudentAttendancePerId";
import styles from "./StudentPerIdChartAndInfo.module.css";

function StudentPerIdChartAndInfo({ data }: { data: studentShape | null }) {
  if (!data?.attendances.length)
    return (
      <p className="m-t">You have not taken an attendances for this students</p>
    );
  return (
    <div className={styles.chartAndInfoContainerPerStudent}>
      <ChartStudentAttendancePerId studentData={data} />
    </div>
  );
}

export default StudentPerIdChartAndInfo;
