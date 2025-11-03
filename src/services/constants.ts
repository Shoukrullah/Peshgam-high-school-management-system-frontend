export const QUERY_KEYS = {
  BRANCH: "branches",
  UNIQUEBRANCH: "branch",
  ATTENDANCE: "attendance",
  CLASSES: "classes",
  UNIQUECLASS: "class",
  STUDENTS: "students",
  UNIQUESTUDENT: "student",
  TEACHERS: "teachers",
  UNIQUETEACHER: "teacher",
  ALL: "all",
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
