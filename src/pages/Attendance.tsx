import { useState } from "react";
import Heading from "../components/Heading";
import SelectClass from "../components/SelectClass";
import type { studentShape } from "../types/students";
import AttendanceDescription from "../components/AttendanceDescription";

function Attendance() {
  const [studentsData, setStudents] = useState<studentShape[] | null>(null);

  const updateAttendance = (data: studentShape[]) => {
    setStudents(data);
  };

  // if(!studentsData?.length) return;
  return (
    <div>
      <Heading fontSize="2.5rem">Attendances</Heading>
      <SelectClass OnUpdateAttendance={updateAttendance} />
      <AttendanceDescription data={studentsData} />
    </div>
  );
}

export default Attendance;
