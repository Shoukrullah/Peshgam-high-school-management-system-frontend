import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useClass } from "../hooks/useClasses";
import EachHeaderPerId from "./EachHeaderPerId";
import EachRouteShowInfo from "./EachRouteShowInfo";
import TableForPerClasses from "./TableForPerClasses";
import { useUniqueTeacher } from "../hooks/useTeachers";
import TableForPerTeacher from "./TableForPerTeacher";

function TeacherPerId() {
  const params = useParams() || undefined;
  const [showTable, setShowTable] = useState<
    "classes" | "students" | "teachers" | ""
  >("");
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useUniqueTeacher(id || undefined);
  useEffect(() => {
    if (data) document.title = "Peshgam - Teachers - " + data.firstName;
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const onHandelUpdate = (value: "students" | "classes" | "teachers") => {
    setShowTable((pre) => (pre === value ? pre : value));
  };

  return (
    <div>
      <EachHeaderPerId data={data || null} type="teachers" />
      <EachRouteShowInfo data={data || null} type="teachers" />
      <TableForPerTeacher
        data={data || null}
        onHandleUpdata={onHandelUpdate}
        showTable={showTable}
      />
    </div>
  );
}

export default TeacherPerId;
