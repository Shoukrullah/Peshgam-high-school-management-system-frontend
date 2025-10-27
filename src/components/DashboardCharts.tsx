import AttendanceChart from "./AttendanceChart";
import ChartForStudentsGender from "./ChartForStudentsGender";
import styles from "./DashboardCharts.module.css";

interface Props {
  femaleCount: number;
  maleCount: number;
}

function DashboardCharts({ femaleCount, maleCount }: Props) {
  return (
    <div className={styles.chartsContainer}>
      <ChartForStudentsGender femaleCount={femaleCount} maleCount={maleCount} />
      <AttendanceChart />
    </div>
  );
}

export default DashboardCharts;
