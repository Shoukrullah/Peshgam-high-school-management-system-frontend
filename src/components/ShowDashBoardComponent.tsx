import { BsHouseDoor } from "react-icons/bs";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import ShowDashboard from "./ShowDashboard";

interface Props {
  branches: number;
  classes: number;
  teachers: number;
  students: number;
}
function ShowDashBoardComponent({
  branches,
  classes,
  students,
  teachers,
}: Props) {
  return (
    <div className="showComponentContainer">
      <ShowDashboard icon={<BsHouseDoor />} label="All Branches">
        {branches}
      </ShowDashboard>
      <ShowDashboard icon={<FaChalkboardTeacher />} label="Total Classes">
        {classes}
      </ShowDashboard>
      <ShowDashboard icon={<FaUsers />} label="Total Teachers">
        {teachers}
      </ShowDashboard>
      <ShowDashboard icon={<PiStudentFill />} label="Total Students">
        {students}
      </ShowDashboard>
    </div>
  );
}

export default ShowDashBoardComponent;
