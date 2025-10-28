export const QUERY_KEYS = {
  BRANCH: "branches",
  ATTENDANCE: "attendance",
  CLASSES: "classes",
  STUDENTS: "students",
  TEACHERS: "teachers",
  ALL: "all",
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
