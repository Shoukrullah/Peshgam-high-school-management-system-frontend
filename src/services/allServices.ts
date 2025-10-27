import type { branches } from "../types/branches";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import { APIClient } from "./axios-instance";
interface BranchData {
  branches: branches[];
  totalPages: number | undefined;
}
interface TeacherNewShape {
  teachers: teacherShape[];
  totalPages: number;
}
interface StudentNewShape {
  students: studentShape[];
  totalPages: number;
}
interface ClassesDateShape {
  classes: classes[];
  totalPages: number;
}

const ApiClientBranches = new APIClient<BranchData>("/api/branches");
const ApiClientTeachers = new APIClient<TeacherNewShape>("/api/teachers");
const ApiClientStudents = new APIClient<StudentNewShape>("/api/students");
const ApiClientClasses = new APIClient<ClassesDateShape>("/api/classes");

export { ApiClientBranches, ApiClientTeachers, ApiClientStudents,ApiClientClasses };
