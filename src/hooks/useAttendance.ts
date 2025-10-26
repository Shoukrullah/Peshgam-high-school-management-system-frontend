import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { attendance } from "../types/attendance";

const useAttendance = (id?: number, fetchAll?: boolean) => {
  const fetchAttendance = async () => {
    const { data } = await axiosInstance.get<attendance[]>(
      `/api/attendances${id ? "/" + id : ""}`
    );
    return data;
  };

  const query = useQuery({
    queryKey: ["attendances", id],
    queryFn: fetchAttendance,
    enabled: Boolean(id)
  });

  return query;
};

export default useAttendance
