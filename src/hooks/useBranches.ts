import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance, { APIClient } from "../services/axios-instance";
import type { branches } from "../types/branches";
import { ApiClientBranches } from "../services/allServices";
import { QUERY_KEYS } from "../services/constants";

const useBranches = (page?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH, page],
    queryFn: () => ApiClientBranches.getAll({ page }),
    placeholderData: keepPreviousData,
    staleTime: 1000  // 1 seconds

  });
};

export default useBranches;
