import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { branches } from "../types/branches";

interface BranchData {
  branches: branches[],
  totalPages: number | undefined
}

const useBranches = (page?: number) => {
  const fetchBranches = async () => {
    const req = await axiosInstance.get<BranchData>("/api/branches", {
      params: {
        page,
      },
    });
    return req.data;
  };

  return useQuery({
    queryKey: ["getBranches",page],
    queryFn: fetchBranches,
    staleTime: 1000  , // 1 sec
    placeholderData: keepPreviousData,
  });
};

export default useBranches;
