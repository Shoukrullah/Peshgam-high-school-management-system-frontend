import { BsCheck2 } from "react-icons/bs";
import { Button } from ".";
import type { classes } from "../types/classes";
import { eachClassHeader, eachStudentHeader } from "../utils/headersForTables";
import EachTable from "./EachTable";
import type { teacherShape } from "../types/teachers";

interface Props {
  showTable: string;
  onHandleUpdata: (value: "classes" | "students" | "teachers") => void;
  data: teacherShape | null;
}

function TableForPerTeacher({ onHandleUpdata, showTable, data }: Props) {
  if (!data?.classes.length)
    return (
      <p className="m-t">Teacher {data?.firstName} teaches in no class.</p>
    );
  return (
    <div>
      <div className="flex m-t">
        <Button
          bgcolor={showTable === "teachers" ? "var(--ternary-color)" : ""}
          onHandelFunction={() => onHandleUpdata("teachers")}
        >
          All Classes {data.firstName} teaches{" "}
          {showTable === "teachers" && <BsCheck2 />}
        </Button>
      </div>

      {showTable === "teachers" && (
        <EachTable
          data={data?.classes || []}
          headerData={eachClassHeader}
          type="classes"
          rowBgColor="#fff"
        />
      )}
    </div>
  );
}

export default TableForPerTeacher;
