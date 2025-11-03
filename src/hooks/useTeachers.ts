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


export const useUniqueTeacher = (teacherId:number | undefined) => {
  const ApiClientTeacher = new APIClient<teacherShape>('/api/teachers/'+ teacherId)
  return useQuery({
    queryKey: [QUERY_KEYS.UNIQUETEACHER, teacherId],
    queryFn: ApiClientTeacher.getOne,
    staleTime: 1000, // 1 minute
    enabled: !! teacherId
  })
}
