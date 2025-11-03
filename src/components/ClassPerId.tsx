import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useBranch } from "../hooks/useBranches";
import EachHeaderPerId from "./EachHeaderPerId";
import EachRouteShowInfo from "./EachRouteShowInfo";
import TableForPerBranches from "./TableForPerBranches";
import { useClass } from "../hooks/useClasses";
import TableForPerClasses from "./TableForPerClasses";

function ClassPerId() {
  const params = useParams() || undefined;
  const [showTable, setShowTable] = useState<
    "classes" | "students" | "teachers"
  >("classes");
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useClass(id || undefined);
  useEffect(() => {
    if (data) document.title = "Peshgam - Classes - " + data.name;
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const onHandelUpdate = (value: "students" | "classes" | "teachers") => {
    setShowTable((pre) => (pre === value ? pre : value));
  };
  console.log(data);

  return (
    <div>
      <EachHeaderPerId data={data || null} type="classes" />
      <EachRouteShowInfo data={data || null} type="classes" />
      <TableForPerClasses
        data={data || null}
        onHandleUpdata={onHandelUpdate}
        showTable={showTable}
      />
    </div>
  );
}

export default ClassPerId;
