import { BsCheck2 } from "react-icons/bs";
import { Button } from ".";
import type { branches } from "../types/branches";
import {
  eachClassHeader,
  eachStudentHeader,
  eachTeacherHeader,
} from "../utils/headersForTables";
import EachTable from "./EachTable";

interface Props {
  showTable: string;
  onHandleUpdata: (value: "classes" | "students" | "teachers") => void;
  data: branches | null;
}

function TableForPerBranches({ onHandleUpdata, showTable, data }: Props) {
  if (!data?.classes.length)
    return <p className="m-t">Add data to classes to see tables</p>;
  return (
    <div>
      <div className="flex m-t">
        <Button
          bgcolor={showTable === "classes" ? "var(--ternary-color)" : ""}
          onHandelFunction={() => onHandleUpdata("classes")}
        >
          Branch Classes {showTable === "classes" && <BsCheck2 />}
        </Button>
        <Button
          bgcolor={showTable === "students" ? "var(--ternary-color)" : ""}
          onHandelFunction={() => onHandleUpdata("students")}
        >
          Branch Students {showTable === "students" && <BsCheck2 />}
        </Button>
        <Button
          bgcolor={showTable === "teachers" ? "var(--ternary-color)" : ""}
          onHandelFunction={() => onHandleUpdata("teachers")}
        >
          Branch Teachers {showTable === "teachers" && <BsCheck2 />}
        </Button>
      </div>
      {showTable === "classes" && (
        <EachTable
          data={data?.classes || []}
          headerData={eachClassHeader}
          type="classes"
          tableFontSize="1.3rem"
          rowBgColor="#fff"
        />
      )}
      {showTable === "students" && (
        <EachTable
          data={data?.students || []}
          headerData={eachStudentHeader}
          type="students"
          rowBgColor="#fff"
        />
      )}
      {showTable === "teachers" && (
        <EachTable
          data={data?.teachers || []}
          headerData={eachTeacherHeader}
          type="teachers"
          rowBgColor="#ffff"
        />
      )}
    </div>
  );
}

export default TableForPerBranches;
