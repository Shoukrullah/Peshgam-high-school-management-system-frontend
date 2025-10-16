import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { Classes } from "../types/classes";

const useClasses = () => {
  const fetchClasses = async () => {
    const req = await axiosInstance.get<Classes[]>("/api/classes");
    return req.data;
  };

  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
    staleTime: 1000 * 60, // i minute
  });
};
export default useClasses
