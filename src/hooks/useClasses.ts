import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiClientClasses } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";

const useClasses = (page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLASSES, page],
    queryFn: () => ApiClientClasses.getAll({ page }),
    placeholderData: keepPreviousData,
  });
};
export default useClasses;
