import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./ChartHalfCircleForClassAttendance.module.css";
import type { classes } from "../types/classes";

interface Props {
  data: classes;
  isAnimationActive?: boolean;
}

export default function ChartHalfCircleForClassAttendance({
  data,
  isAnimationActive = true,
}: Props) {
  const presentCount = data.attendances.filter(
    (status) => status.status === "PRESENT"
  ).length;
  const absentCount = data.attendances.filter(
    (status) => status.status === "ABSENT"
  ).length;
  const problemCount = data.attendances.filter(
    (status) => status.status === "PROBLEM"
  ).length;
  console.log(presentCount, absentCount, problemCount);

  const chartData = [
    { name: "Present", value: presentCount, fill: "var(--green-brand-1)" }, // green
    { name: "Absent", value: absentCount, fill: "var(--red-brand-2)" }, // red
    { name: "Problem", value: problemCount, fill: "#FF9800" }, // orange
  ];

  if (!presentCount && !absentCount && !presentCount)
    return <p>You have never taken an attendances for this class.</p>;
  return (
    <div className={styles.halfChartContainer}>
      <PieChart width={190} height={130}>
        <Pie
          data={chartData}
          dataKey="value"
          cy={80}
          innerRadius={60}
          outerRadius={80}
          startAngle={180}
          endAngle={0}
          stroke="none"
          isAnimationActive={isAnimationActive}
        />

        <Tooltip content={() => null} active />
      </PieChart>
      <div className={styles.afterContainer}>
        {presentCount !== 0 && (
          <div>
            <p>Present</p>
            <p>
              (
              {Math.ceil(
                (presentCount / (presentCount + absentCount + problemCount)) *
                  100
              )}
              %)
            </p>
          </div>
        )}
        {absentCount !== 0 && (
          <div>
            <p>Absent</p>
            <p>
              (
              {Math.ceil(
                (absentCount / (presentCount + absentCount + problemCount)) *
                  100
              )}
              %)
            </p>
          </div>
        )}
        {problemCount !== 0 && (
          <div>
            <p>Problem</p>
            <p>
              (
              {Math.ceil(
                (problemCount / (presentCount + absentCount + problemCount)) *
                  100
              )}
              %)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
