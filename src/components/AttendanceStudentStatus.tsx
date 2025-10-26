import type { studentShape } from "../types/students";
import toCamelCase from "../utils/toCamelCase";

function AttendanceStudentStatus({ student }: { student: string }) {
  const takeBgColor = (status: string) => {
    if (status === "PRESENT")
      return {
        bg: "var(--green-brand-1)",
        color: "var(--light-brand-1)",
      };
    else if (status === "ABSENT")
      return {
        bg: "var(--red-brand-2)",
        color: "var(--light-brand-1)",
      };
    else if (status === "PROBLEM")
      return {
        bg: "var(--yellow-brand-1)",
        color: "var(--dark-brand-1)",
      };
    else
      return {
        bg: "var(--light-brand-1)",
        color: "var(--dark-brand-1)",
      };
  };
  const { bg, color } = takeBgColor(student);
  return (
    <span
      style={{
        backgroundColor: bg,
        color,
        fontSize:'1.2rem',
        padding: '.5rem 1rem',
        borderRadius: '2rem'
      }}
    >
      {toCamelCase(student)}
    </span>
  );
}

export default AttendanceStudentStatus;
