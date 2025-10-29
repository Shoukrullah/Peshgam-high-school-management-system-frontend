import { useEffect } from "react";
import {
  DashboardCharts,
  Heading,
  Loading,
  ShowDashBoardComponent,
} from "../components";
import { useBranches, useClasses, useStudents, useTeacher } from "../hooks";

function Dashboard() {
  const { data, isLoading } = useBranches();
  const { data: classes, isLoading: loadingClasses } = useClasses();
  const { data: teachers, isLoading: loadingTeachers } = useTeacher();
  const { data: students, isLoading: loadingStudents } = useStudents();

  const totalMale = students?.students.filter(
    (stu) => stu.gender === "MALE"
  ).length;

  const totalFemale = students?.students.map(
    (stu) => stu.gender === "FEMALE"
  ).length;

  useEffect(() => {
    document.title = "Peshgam - HomePage";
  }, []);

  if (isLoading || loadingClasses || loadingTeachers || loadingStudents)
    return <Loading />;

  return (
    <div>
      <Heading margin="1rem 0 0 0" fontSize="2.5rem">
        Dashboard
      </Heading>
      <ShowDashBoardComponent
        branches={data?.branches.length}
        classes={classes?.classes.length || 0}
        students={students?.students.length || 0}
        teachers={teachers?.teachers.length || 0}
      />
      <DashboardCharts
        femaleCount={totalFemale || 0}
        maleCount={totalMale || 0}
      />
    </div>
  );
}

export default Dashboard;
