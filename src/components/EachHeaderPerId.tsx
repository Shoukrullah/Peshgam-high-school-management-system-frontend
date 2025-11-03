import {
  BsGenderAmbiguous,
  BsHouse,
  BsHouseCheck,
  BsPhone,
  BsUpc,
} from "react-icons/bs";
import {
  FaHome,
  FaLandmark,
  FaMale,
  FaOldRepublic,
  FaSchool,
  FaStar,
} from "react-icons/fa";
import {
  PiAddressBookTabsThin,
  PiAtThin,
  PiCallBell,
  PiChalkboardTeacher,
  PiChalkboardTeacherThin,
  PiCityLight,
  PiFastForwardThin,
  PiHourglassMediumThin,
  PiHouseLineThin,
  PiHouseThin,
  PiLineVerticalThin,
  PiMapPinSimpleThin,
  PiNeedleDuotone,
  PiPencilLine,
  PiPhoneCall,
  PiPhoneCallThin,
  PiStairs,
  PiStairsThin,
  PiStarThin,
  PiStudentThin,
  PiUploadLight,
  PiUserThin,
} from "react-icons/pi";
import { Heading } from ".";
import type { branches } from "../types/branches";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import toCamelCase from "../utils/toCamelCase";
import SpecialText from "./SpecialText";
import { RxDrawingPin, RxHome, RxSewingPin } from "react-icons/rx";

interface Props {
  data: branches | classes | teacherShape | studentShape | null;
  type: "students" | "teachers" | "branches" | "classes";
}

function EachHeaderPerId({ data, type }: Props) {
  if (!data) return;

  if (type === "branches") {
    const branch = data as branches;
    return (
      <div>
        <Heading fontSize="2.5rem">
          Branch {branch.name} <BsHouseCheck color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>
          {branch.address} <PiCityLight color="var(--primary-color)" />
        </SpecialText>
        <SpecialText>{branch.city}</SpecialText>
        <SpecialText>
          {branch?.createdAt && new Date(branch.createdAt).toLocaleDateString()}
          <PiPencilLine />
        </SpecialText>
      </div>
    );
  }

  if (type === "classes") {
    const myClass = data as classes;
    return (
      <div>
        <Heading fontSize="2.5rem">
          Class: {myClass.name} <FaSchool color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>
          {toCamelCase(myClass.grade)} <PiChalkboardTeacher />
        </SpecialText>
        <SpecialText>
          {myClass.branch.name}
          <BsHouse />
          {myClass?.createdAt &&
            new Date(myClass.createdAt).toLocaleDateString()}
          <PiPencilLine />
        </SpecialText>
      </div>
    );
  }
  if (type === "teachers") {
    const teacher = data as teacherShape;
    return (
      <div>
        <Heading fontSize="2.5rem">
          Teacher: {`${teacher.firstName} ${teacher.lastName}`}
          <PiChalkboardTeacherThin color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>
          Branch:
          {teacher.branch.name}
        </SpecialText>
        <SpecialText>
          {teacher.phone}
          <PiPhoneCallThin />
        </SpecialText>
        {teacher.homeAddress && (
          <SpecialText>
            <address>Home address: {teacher.homeAddress}</address>
          </SpecialText>
        )}
      </div>
    );
  }
  if (type === "students") {
    const student = data as studentShape;
    return (
      <div>
        <Heading fontSize="2.5rem">
          Student: {`${student.firstName} ${student.lastName}`}
          <PiStudentThin color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>
          Branch:
          {student.branch.name}
          <PiHouseLineThin />
        </SpecialText>
        {student.dob && (
          <SpecialText>{new Date(student.dob).toDateString()}</SpecialText>
        )}
        <SpecialText>
          {student.phone}
          <PiPhoneCallThin />
        </SpecialText>
        {student.address && (
          <SpecialText>
            <address>Home address: {student.address}</address>
          </SpecialText>
        )}
        <SpecialText>{student.gender}</SpecialText>
      </div>
    );
  }
}

export default EachHeaderPerId;
