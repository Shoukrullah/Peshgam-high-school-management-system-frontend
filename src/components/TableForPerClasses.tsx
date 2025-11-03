import { BsCheck2 } from "react-icons/bs";
import { Button } from ".";
import type { classes } from "../types/classes";
import { eachStudentHeader } from "../utils/headersForTables";
import EachTable from "./EachTable";

interface Props {
  showTable: string;
  onHandleUpdata: (value: "classes" | "students" | "teachers") => void;
  data: classes | null;
}

function TableForPerClasses({ onHandleUpdata, showTable, data }: Props) {
  if (!data?.students.length)
    return <p className="m-t">Add students to classes to see tables</p>;
  return (
    <div>
      <div className="flex m-t">
        <Button
          bgcolor={showTable === "students" ? "var(--ternary-color)" : ""}
          onHandelFunction={() => onHandleUpdata("students")}
        >
          All Students {showTable === "students" && <BsCheck2 />}
        </Button>
      </div>

      {showTable === "students" && (
        <EachTable
          data={data?.students || []}
          headerData={eachStudentHeader}
          type="students"
          rowBgColor="#fff"
        />
      )}
    </div>
  );
}

export default TableForPerClasses;
