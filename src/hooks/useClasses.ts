import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance, { APIClient } from "../services/axios-instance";
import type { classes } from "../types/classes";
import { ApiClientClasses } from "../services/allServices";

const useClasses = (page?: number) => {
  return useQuery({
    queryKey: ["classes", page],
    queryFn: () => ApiClientClasses.getAll({ page }),
    placeholderData: keepPreviousData,
  });
};
export default useClasses;
