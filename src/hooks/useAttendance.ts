import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/axios-instance";
import type { attendance } from "../types/attendance";

const useAttendance = (id?: number, fetchAll: boolean = false) => {
  const ApiClient = new APIClient<attendance[]>(
    fetchAll ? "/api/attendances" : `/api/attendances/${id}`
  );
  const query = useQuery({
    queryKey: ["attendances", fetchAll ? "all" : id],
    queryFn: ApiClient.getAll,
    enabled: fetchAll || Boolean(id),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useAttendance;
