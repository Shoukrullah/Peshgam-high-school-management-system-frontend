import AttendanceChart from "./AttendanceChart";
import ChartForStudentsGender from "./ChartForStudentsGender";
import styles from "./DashboardCharts.module.css";

interface Props {
  femaleCount: number;
  maleCount: number;
}

function DashboardCharts({ femaleCount, maleCount }: Props) {
  if (femaleCount === 0 && maleCount === 0)
    return (
      <p className={styles.noStudents}>
        There is no students to display the charts!
      </p>
    );
  return (
    <div className={styles.chartsContainer}>
      <ChartForStudentsGender femaleCount={femaleCount} maleCount={maleCount} />
      <AttendanceChart />
    </div>
  );
}

export default DashboardCharts;
