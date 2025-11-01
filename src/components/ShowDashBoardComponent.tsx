import { BsHouseDoor } from "react-icons/bs";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import ShowInfo from "./ShowInfo";

interface Props {
  branches: number | undefined;
  classes: number | undefined;
  teachers: number | undefined;
  students: number | undefined;
}
function ShowDashBoardComponent({
  branches,
  classes,
  students,
  teachers,
}: Props) {
  return (
    <div className="showComponentContainer">
      <ShowInfo icon={<BsHouseDoor />} label="All Branches">
        {branches || 0}
      </ShowInfo>
      <ShowInfo icon={<FaChalkboardTeacher />} label="Total Classes">
        {classes || 0}
      </ShowInfo>
      <ShowInfo icon={<FaUsers />} label="Total Teachers">
        {teachers || 0}
      </ShowInfo>
      <ShowInfo icon={<PiStudentFill />} label="Total Students">
        {students || 0}
      </ShowInfo>
    </div>
  );
}

export default ShowDashBoardComponent;
