import { BsHouse, BsHouseCheck } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import {
  PiChalkboardTeacherThin,
  PiPencilLine,
  PiPhoneCallThin,
  PiStudentThin
} from "react-icons/pi";
import { Heading } from ".";
import type { branches } from "../types/branches";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import toCamelCase from "../utils/toCamelCase";
import SpecialText from "./SpecialText";
import formatAF from "../utils/formatToAF";

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
        <Heading fontSize="2.5rem" margin="1rem 0">
          Branch: {branch.name} <BsHouseCheck color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>City: {branch.city}</SpecialText>
        <SpecialText margin="0 0 0 .5rem">
          Date of creation:{" "}
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
        <Heading fontSize="2.5rem" margin="1rem 0">
          Class: {myClass.name} <FaSchool color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText>Grade: {toCamelCase(myClass.grade)}</SpecialText>
        <SpecialText margin="0 0 0 .5rem">
          Branch: {myClass.branch.name}
          <BsHouse />
        </SpecialText>
        {myClass?.createdAt && (
          <SpecialText margin="0 0 0 .5rem">
            {new Date(myClass.createdAt).toLocaleDateString()}
            <PiPencilLine />
          </SpecialText>
        )}
      </div>
    );
  }
  if (type === "teachers") {
    const teacher = data as teacherShape;
    return (
      <div>
        <Heading fontSize="2.5rem" margin="1rem 0">
          Teacher: {`${teacher.firstName} ${teacher.lastName}`}
          <PiChalkboardTeacherThin color="var(--dark-brand-3)" />
        </Heading>
        <SpecialText margin="0 0 0 .5rem">
          {formatAF(teacher.phone)}
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
        <Heading fontSize="2.5rem" margin="1rem 0">
          Student: {`${student.firstName} ${student.lastName}`}
          <PiStudentThin color="var(--dark-brand-3)" />
        </Heading>
        {student.dob && (
          <SpecialText margin="0 0 0 .5rem">
            Date of birth: {new Date(student.dob).toLocaleDateString()}
          </SpecialText>
        )}
        <SpecialText margin="0 0 0 .5rem">
          Phone: {formatAF(student.phone)}
          <PiPhoneCallThin />
        </SpecialText>
        {student.address && (
          <SpecialText margin="0 0 0 .5rem">
            <address>Home address: {student.address}</address>
          </SpecialText>
        )}
        <SpecialText margin="0 0 0 .5rem">Gender: {student.gender}</SpecialText>
      </div>
    );
  }
}

export default EachHeaderPerId;
