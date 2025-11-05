import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useBranch } from "../hooks/useBranches";
import EachHeaderPerId from "./EachHeaderPerId";
import EachRouteShowInfo from "./EachRouteShowInfo";
import TableForPerBranches from "./TableForPerBranches";

function BranchPerId() {
  const params = useParams() || undefined;
  const [showTable, setShowTable] = useState<
    "classes" | "students" | "teachers" | ""
  >("");
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useBranch(id);
  useEffect(() => {
    if (data) document.title = "P - Branches - " + data.name;
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
  console.log(data?.teachers);

  const onHandelUpdate = (value: "students" | "classes" | "teachers" | "") => {
    setShowTable((pre) => (pre === value ? pre : value));
  };

  return (
    <div>
      <EachHeaderPerId type="branches" data={data || null} />
      <EachRouteShowInfo data={data || null} type="branches" />
      <TableForPerBranches
        data={data || null}
        onHandleUpdata={onHandelUpdate}
        showTable={showTable}
      />
    </div>
  );
}

export default BranchPerId;
