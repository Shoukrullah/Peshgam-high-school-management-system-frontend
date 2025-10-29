import { useEffect, useState } from "react";
import { AttendanceDescription, Heading, SelectClass } from "../components";
import type { studentShape } from "../types/students";

function Attendance() {
  const [studentsData, setStudents] = useState<studentShape[] | null>(null);
  const updateAttendance = (data: studentShape[]) => {
    setStudents(data);
  };

  useEffect(() => {
    document.title = "Peshgam - Attendances";
  }, []);
  return (
    <div>
      <Heading margin="1rem 0 0 0" fontSize="2.5rem">
        Attendances
      </Heading>
      <SelectClass OnUpdateAttendance={updateAttendance} />
      <AttendanceDescription data={studentsData} />
    </div>
  );
}

export default Attendance;
