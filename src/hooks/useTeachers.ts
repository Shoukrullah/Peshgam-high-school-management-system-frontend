import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/axios-instance";
import type { teacherShape } from "../types/teachers";
import { ApiClientTeachers } from "../services/allServices";

const useTeacher = (page?: number) => {
  return useQuery({
    queryKey: ["teachers", page],
    queryFn: () => ApiClientTeachers.getAll({ page }),
    placeholderData: keepPreviousData,
  });
};
export default useTeacher;
