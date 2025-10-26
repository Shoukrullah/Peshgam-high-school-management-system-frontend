import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { studentShape } from "../types/students";

interface StudentNewShape {
  students: studentShape[];
  totalPages: number;
}

interface UseStudentsOptions {
  enabled?: boolean; // control if the query should run
}

const useStudents = (
  page?: number,
  classId?: number,
  options?: UseStudentsOptions
) => {
  const fetchStudents = async () => {
    const params: Record<string, string | number> = {};
    if (page) params.page = page;
    if (classId) params.classId = classId;

    const res = await axiosInstance.get<StudentNewShape>("/api/students", {
      params,
    });
    return res.data;
  };

  // Determine when query should run
  const isEnabled =
    (options?.enabled ?? !!page) || !!classId || (page === undefined && classId === undefined);

  return useQuery({
    queryKey: ["students", { page, classId }],
    queryFn: fetchStudents,
    enabled: isEnabled,
  });
};

export default useStudents;
