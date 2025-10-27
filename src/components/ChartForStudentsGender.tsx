import { FaFemale, FaMale } from "react-icons/fa";
import { Pie, PieChart } from "recharts";
import styles from './ChartGender.module.css'

export default function ChartForStudentsGender({
  femaleCount,
  maleCount,
}: {
  maleCount: number;
  femaleCount: number;
}) {
  const data = [
    { name: "Group A", value: maleCount, fill: "#0088FE" },
    { name: "Group D", value: femaleCount, fill: "#FF8042" },
  ];
  const MyPie = () => (
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      outerRadius="100%"
      innerRadius="85%"
      isAnimationActive={true}
    />
  );
  return (
    <div className={styles.genderChartContainer}>
      <div className="flexSpaceBetween">
        <p>Students</p>
        <p>
          &middot;&middot;&middot;
        </p>
      </div>
      <div
        style={{
          display: "flex",
          width: "35rem",
          height: "35rem",
          padding: "0px",
          justifyContent: "space-around",
          alignItems: "stretch",
          position: "relative",
          outline: "none",
        }}
      >
        <PieChart
          responsive
          style={{ aspectRatio: 1 }}
        >
          <MyPie />
        </PieChart>
        <div
          className="flex"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            gap: ".1rem",
          }}
        >
          {maleCount && <FaMale color="#0088FE" fontSize={"3.5rem"} />}
          {femaleCount && <FaFemale color="#FF8042" fontSize={"3.5rem"} />}
        </div>
      </div>
      <div className={styles.afterContainer}>
        <div style={{}}>
          <p>{maleCount}</p>
          <p>
            boys ({Math.ceil((maleCount / (maleCount + femaleCount)) * 100)}%)
          </p>
        </div>
        <div>
          <p>{femaleCount}</p>
          <p>
            girls ({Math.floor((femaleCount / (maleCount + femaleCount)) * 100)}
            %)
          </p>
        </div>
      </div>
    </div>
  );
}
