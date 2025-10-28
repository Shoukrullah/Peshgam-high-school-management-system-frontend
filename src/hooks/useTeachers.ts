import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/axios-instance";
import type { teacherShape } from "../types/teachers";
import { ApiClientTeachers } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";

const useTeacher = (page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TEACHERS, page],
    queryFn: () => ApiClientTeachers.getAll({ page }),
    placeholderData: keepPreviousData,
    staleTime: 1000, // 1 seconds
  });
};
export default useTeacher;
