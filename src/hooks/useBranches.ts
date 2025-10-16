import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { Branches } from "../types/branches";
const useBranches = () => {
  const fetchBranches = async () => {
      const req = await axiosInstance.get<Branches[]>("/api/branches");
      return req.data
  };

  return useQuery({
    queryKey: ["getBranches"],
    queryFn: fetchBranches,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};

export default useBranches
