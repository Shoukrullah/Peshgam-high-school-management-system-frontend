import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/axios-instance";
import { QUERY_KEYS } from "../services/constants";
import type { branches } from "../types/branches";

interface BranchData {
  branches: branches[];
  totalPages: number | undefined;
}

const useBranches = (page?: number) => {
  const ApiClientBranches = new APIClient<BranchData>("/api/branches");

  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH, page],
    queryFn: () => ApiClientBranches.getAll({ page }),
    placeholderData: keepPreviousData,
    staleTime: 1000,
  });
};
export default useBranches;

// for one Branch
export const useBranch = (branchId: number | undefined) => {
  const ApiClientBranch = new APIClient<branches>(`/api/branches/${branchId}`);

  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH, branchId],
    queryFn: () => ApiClientBranch.getOne(),
    staleTime: 1000,
    enabled: !!branchId,
  });
};
