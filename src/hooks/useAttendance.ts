import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { attendance } from "../types/attendance";

const useAttendance = () => {
  const fetchAttendance = async () => {
    const req = await axiosInstance.get<attendance[]>("/api/attendances");
    return req.data;
  };

  return useQuery({
    queryKey: ["attendances"],
    queryFn: fetchAttendance,
    staleTime: 1000, // 1 sec
  });
};

export default useAttendance;
