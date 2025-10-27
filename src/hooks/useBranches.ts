import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance, { APIClient } from "../services/axios-instance";
import type { branches } from "../types/branches";
import { ApiClientBranches } from "../services/allServices";

const useBranches = (page?: number) => {
  return useQuery({
    queryKey: ["getBranches", page],
    queryFn: () => ApiClientBranches.getAll({ page }),
    placeholderData: keepPreviousData,
  });
};

export default useBranches;
