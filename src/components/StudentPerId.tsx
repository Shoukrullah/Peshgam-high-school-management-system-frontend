import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useStudent } from "../hooks/useStudents";
import EachHeaderPerId from "./EachHeaderPerId";
import EachRouteShowInfo from "./EachRouteShowInfo";
import ChartStudentAttendancePerId from "./ChartStudentAttendancePerId";
import StudentPerIdChartAndInfo from "./StudentPerIdChartAndInfo";

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
      <StudentPerIdChartAndInfo data={data} />
    </div>
  );
}

export default StudentPerId;
