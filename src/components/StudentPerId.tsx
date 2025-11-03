import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useUniqueTeacher } from "../hooks/useTeachers";
import EachHeaderPerId from "./EachHeaderPerId";
import EachRouteShowInfo from "./EachRouteShowInfo";
import TableForPerTeacher from "./TableForPerTeacher";
import { useStudent } from "../hooks/useStudents";

function StudentPerId() {
  const params = useParams() || undefined;
  const [showTable, setShowTable] = useState<
    "classes" | "students" | "teachers" | ""
  >("");
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useStudent(id || undefined);
  useEffect(() => {
    if (data) document.title = "P-Teachers - " + data.firstName;
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const onHandelUpdate = (value: "students" | "classes" | "teachers") => {
    setShowTable((pre) => (pre === value ? pre : value));
  };

  return (
    <div>
      <EachHeaderPerId data={data || null} type="students" />
      <EachRouteShowInfo data={data || null} type="students" />
      
    </div>
  );
}

export default StudentPerId;
