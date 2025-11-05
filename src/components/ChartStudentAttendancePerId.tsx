import { Pie, PieChart } from "recharts";
import type { studentShape } from "../types/students";
import styles from "./ChartHalfCircleForClassAttendance.module.css";
import SpecialText from "./SpecialText";

interface Props {
  studentData: studentShape;
}

export default function ChartStudentAttendancePerId({ studentData }: Props) {
  const presentCount = studentData.attendances.filter(
    (pres) => pres.status === "PRESENT"
  ).length;
  const absentCount = studentData.attendances.filter(
    (pres) => pres.status === "ABSENT"
  ).length;
  const problemCount = studentData.attendances.filter(
    (pres) => pres.status === "PROBLEM"
  ).length;

  const data = [
    { name: "Group A", value: presentCount, fill: "var(--green-brand-1)" },
    { name: "Group D", value: absentCount, fill: "var(--red-brand-2)" },
    { name: "Group E", value: problemCount, fill: "#FF8042" },
  ];
  const MyPie = () => (
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      outerRadius="100%"
      innerRadius="80%"
      isAnimationActive={true}
    />
  );
  return (
    <div className={styles.genderChartContainer}>
      <div
        style={{
          display: "flex",
          width: "20rem",
          height: "20rem",
          padding: "0px",
          justifyContent: "space-around",
          alignItems: "stretch",
          position: "relative",
          outline: "none",
        }}
      >
        <PieChart
          responsive
          width={200}
          height={200}
          style={{ aspectRatio: 1 }}
        >
          <MyPie />
        </PieChart>
      </div>
      <div className={styles.afterContainer} style={{ padding: "4rem 0 0 0" }}>
        <div className={styles.firstChild}>
          <p>Present</p>
          <p>
            (
            {Math.ceil(
              (presentCount / (presentCount + absentCount + problemCount)) * 100
            )}
            %)
          </p>
          <SpecialText
            bgColor="var(--light-brand-1)"
            color="var(--green-brand-1)"
            margin=".1rem 0 0 0"
          >
            {presentCount} present
          </SpecialText>
        </div>

        <div className={styles.secondChild}>
          <p>Absent</p>
          <p>
            (
            {Math.ceil(
              (absentCount / (presentCount + absentCount + problemCount)) * 100
            )}
            %)
          </p>
          <SpecialText
            bgColor="var(--light-brand-1)"
            color="var(--red-brand-1)"
            margin=".1rem 0 0 0"
          >
            {absentCount} absent
          </SpecialText>
        </div>

        <div className={styles.thirdChild}>
          <p>Problem</p>
          <p>
            (
            {Math.ceil(
              (problemCount / (presentCount + absentCount + problemCount)) * 100
            )}
            %)
          </p>
          <SpecialText
            bgColor="var(--light-brand-1)"
            color="#fa5300ff"
            margin=".1rem 0 0 0"
          >
            {problemCount} problem
          </SpecialText>
        </div>
      </div>
    </div>
  );
}
