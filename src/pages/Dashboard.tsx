import ChartForStudentsGender from "../components/ChartForStudentsGender";
import PieChartInGrid from "../components/ChartForStudentsGender";
import DashboardCharts from "../components/DashboardCharts";
import Heading from "../components/Heading";
import ShowDashBoardComponent from "../components/ShowDashBoardComponent";
import useBranches from "../hooks/useBranches";
import useClasses from "../hooks/useClasses";
import useStudents from "../hooks/useStudents";
import useTeacher from "../hooks/useTeachers";

function Dashboard() {
  const { data, isLoading, error } = useBranches();
  const { data: classes } = useClasses();
  const { data: teachers } = useTeacher();
  const { data: students } = useStudents();
  const totalMale = students?.students.filter(
    (stu) => stu.gender === "MALE"
  ).length;

  const totalFemale =
    students?.students && totalMale && students.students.length - totalMale;

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (
    !data ||
    !classes ||
    !teachers ||
    !students ||
    totalMale === undefined ||
    totalFemale === undefined
  )
    return null;

  return (
    <div>
      <Heading margin="1rem 0 0 0" fontSize="2.5rem">Dashboard</Heading>
      <ShowDashBoardComponent
        branches={data?.branches.length}
        classes={classes?.classes.length}
        students={students?.students.length}
        teachers={teachers?.teachers.length}
      />
      <DashboardCharts femaleCount={totalFemale} maleCount={totalMale} />
    </div>
  );
}

export default Dashboard;
