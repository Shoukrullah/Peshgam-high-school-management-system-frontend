import { FaFemale, FaMale } from "react-icons/fa";
import { Pie, PieChart } from "recharts";

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
      outerRadius="75%"
      innerRadius="62%"
      isAnimationActive={true}
    />
  );
  return (
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
        style={{ height: "100%", width: "100%", aspectRatio: 1 }}
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
        <FaMale color="#0088FE" fontSize={"3.5rem"} />
        <FaFemale color="#FF8042" fontSize={"3.5rem"} />
      </div>
    </div>
  );
}
