import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./AttendanceChart.module.css";

const data = [
  { day: "Mon", present: 60, absent: 50 },
  { day: "Tue", present: 70, absent: 60 },
  { day: "Wed", present: 90, absent: 80 },
  { day: "Thu", present: 70, absent: 75 },
  { day: "Fri", present: 60, absent: 55 },
];

function AttendanceChart() {
  return (
    <div className={styles.chartContainer}>
      <p className={styles.chartTitle}>Attendance</p>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#0e0a0a0f"
          />
          <XAxis dataKey="day" tick={{ fill: "var(--dark-brand-4)" }} />
          <YAxis tick={{ fill: "var(--dark-brand-4)" }} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ top: -1 }}
          />
          <Bar
            dataKey="present"
            fill="var(--primary-color)"
            name="Present"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="var(--red-brand-2)"
            name="Absent"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
