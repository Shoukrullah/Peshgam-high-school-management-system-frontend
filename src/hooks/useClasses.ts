import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiClientClasses } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";

const useClasses = (page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLASSES,],
    queryFn: () => ApiClientClasses.getAll({ page }),
    placeholderData: keepPreviousData,
    staleTime: 1000  // 1 seconds
  });
};
export default useClasses;
