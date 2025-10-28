import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/axios-instance";
import type { attendance } from "../types/attendance";
import { QUERY_KEYS } from "../services/constants";

const useAttendance = (id?: number, fetchAll: boolean = false) => {
  const ApiClient = new APIClient<attendance[]>(
    fetchAll ? "/api/attendances" : `/api/attendances/${id}`
  );
  const query = useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, fetchAll ? QUERY_KEYS.ALL : id],
    queryFn: ApiClient.getAll,
    enabled: fetchAll || Boolean(id),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useAttendance;
