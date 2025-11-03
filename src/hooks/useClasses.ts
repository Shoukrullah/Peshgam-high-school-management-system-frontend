import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiClientClasses } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";
import { APIClient } from "../services/axios-instance";
import type { classes } from "../types/classes";

const useClasses = (page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLASSES, page],
    queryFn: () => ApiClientClasses.getAll({ page }),
    placeholderData: keepPreviousData,
    staleTime: 1000, // 1 seconds
  });
};
export default useClasses;

export const useClass = (classId: number | undefined) => {
  const ApiCallForClass = new APIClient<classes>(`/api/classes/${classId}`);
  return useQuery({
    queryKey: [QUERY_KEYS.UNIQUECLASS, classId],
    queryFn: ApiCallForClass.getOne,
    enabled: !!classId,
    staleTime: 1000, // 1 minute
  });
};
