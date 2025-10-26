import { BsClock } from "react-icons/bs";
import { RxCheck, RxCross1 } from "react-icons/rx";
import Button from "./Button";
import type { studentShape } from "../types/students";
import type { AttendanceStatus } from "./AttendanceForm";
import styles from "./AttendanceTable.module.css";
import AttendanceStudentStatus from "./AttendanceStudentStatus";

interface Props {
  studentData: (studentShape & { attendanceStatus?: AttendanceStatus })[];
  onStatusChange: (id: number, status: AttendanceStatus) => void;
}

function AttendanceTable({ studentData, onStatusChange }: Props) {
  const getButtonColors = (
    currentStatus: AttendanceStatus | undefined,
    buttonStatus: AttendanceStatus
  ) => {
    if (currentStatus === buttonStatus) {
      if (buttonStatus === "PRESENT")
        return {
          bgcolor: "var(--green-brand-1)",
          color: "var(--light-brand-1)",
        };
      if (buttonStatus === "ABSENT")
        return {
          bgcolor: "var(--red-brand-2)",
          color: "var(--light-brand-1)",
        };
      if (buttonStatus === "PROBLEM")
        return {
          bgcolor: "var(--yellow-brand-1)",
          color: "var(--dark-brand-1)",
        };
    }
    return {
      bgcolor: "var(--light-brand-1)",
      color: "var(--dark-brand-1)",
    };
  };

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Mark</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((stu) => (
          <tr key={stu.id}>
            <td>{stu.firstName + " " + stu.lastName}</td>
            <td>
              <AttendanceStudentStatus
                student={stu.attendanceStatus || "Not Marked"}
              />
            </td>
            <td>
              <div className="flex" style={{ gap: ".5rem" }}>
                {/* PRESENT */}
                <Button
                  {...getButtonColors(stu.attendanceStatus, "PRESENT")}
                  padding="1rem 1rem"
                  boxShadow="0 0 3px 1px rgba(0, 0, 0, 0.05)"
                  onHandelFunction={() => onStatusChange(stu.id, "PRESENT")}
                >
                  <RxCheck /> Present
                </Button>

                {/* ABSENT */}
                <Button
                  {...getButtonColors(stu.attendanceStatus, "ABSENT")}
                  padding="1rem 1rem"
                  boxShadow="0 0 3px 1px rgba(0, 0, 0, 0.05)"
                  onHandelFunction={() => onStatusChange(stu.id, "ABSENT")}
                >
                  <RxCross1 /> Absent
                </Button>

                {/* PROBLEM */}
                <Button
                  {...getButtonColors(stu.attendanceStatus, "PROBLEM")}
                  padding="1rem 1rem"
                  boxShadow="0 0 3px 1px rgba(0, 0, 0, 0.05)"
                  onHandelFunction={() => onStatusChange(stu.id, "PROBLEM")}
                >
                  <BsClock /> Problem
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AttendanceTable;
