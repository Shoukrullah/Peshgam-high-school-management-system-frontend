import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading } from ".";
import { useBranch } from "../hooks/useBranches";
import EachBranchHeader from "./EachBranchHeader";
import EachBranchShowInfo from "./EachBranchShowInfo";
import TableForPerBranches from "./TableForPerBranches";

function BranchPerId() {
  const params = useParams() || undefined;
  const [showTable, setShowTable] = useState<
    "classes" | "students" | "teachers"
  >("classes");
  const id = params ? parseInt(params.id || "") : undefined;
  const { data, isLoading, error } = useBranch(id);
  useEffect(() => {
    if (data) document.title = "Peshgam - Branches - " + data.name;
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
  console.log(data?.teachers);

  const onHandelUpdate = (value: "students" | "classes" | "teachers") => {
    setShowTable((pre) => (pre === value ? pre : value));
  };

  return (
    <div>
      <EachBranchHeader data={data || null} />
      <EachBranchShowInfo data={data || null} />
      <TableForPerBranches
        data={data || null}
        onHandleUpdata={onHandelUpdate}
        showTable={showTable}
      />
    </div>
  );
}

export default BranchPerId;
