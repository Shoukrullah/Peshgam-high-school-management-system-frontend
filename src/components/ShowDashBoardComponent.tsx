import { BsHouseDoor } from "react-icons/bs";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import ShowDashboard from "./ShowDashboard";

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
      <ShowDashboard icon={<BsHouseDoor />} label="All Branches">
        {branches || 0}
      </ShowDashboard>
      <ShowDashboard icon={<FaChalkboardTeacher />} label="Total Classes">
        {classes || 0}
      </ShowDashboard>
      <ShowDashboard icon={<FaUsers />} label="Total Teachers">
        {teachers || 0}
      </ShowDashboard>
      <ShowDashboard icon={<PiStudentFill />} label="Total Students">
        {students || 0}
      </ShowDashboard>
    </div>
  );
}

export default ShowDashBoardComponent;
