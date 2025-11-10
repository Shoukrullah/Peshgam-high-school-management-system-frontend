import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from "../components";
import EachHeaderPerId from "../components/EachHeaderPerId";
import EachRouteShowInfo from "../components/EachRouteShowInfo";
import StudentPerIdChartAndInfo from "../components/StudentPerIdChartAndInfo";
import { useStudent } from "../hooks/useStudents";

function StudentPerId() {
  const params = useParams() || undefined;
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useStudent(id || undefined);
  useEffect(() => {
    if (data) document.title = "P-Teachers - " + data.firstName;
  }, [data]);
  if (!data) return;
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
  return (
    <div>
      <EachHeaderPerId data={data || null} type="students" />
      <EachRouteShowInfo data={data || null} type="students" />
      <StudentPerIdChartAndInfo data={data || null} />
    </div>
  );
}

export default StudentPerId;
