import { useQuery } from "@tanstack/react-query";
import axiosInstance, { APIClient } from "../services/axios-instance";
import type { studentShape } from "../types/students";
import { ApiClientStudents } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";

interface UseStudentsOptions {
  enabled?: boolean; // control if the query should run
}

const useStudents = (
  page?: number,
  classId?: number,
  options?: UseStudentsOptions
) => {
  const params: Record<string, string | number> = {};
  if (page) params.page = page;
  if (classId) params.classId = classId;
  const isEnabled =
    (options?.enabled ?? !!page) ||
    !!classId ||
    (page === undefined && classId === undefined);

  return useQuery({
    queryKey: [QUERY_KEYS.STUDENTS, { page, classId }],
    queryFn: () => ApiClientStudents.getAll({ page, classId }),
    enabled: isEnabled,
    staleTime: 1000  // 1 seconds

  });
};

export default useStudents;
