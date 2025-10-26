import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { classes } from "../types/classes";

interface ClassesDateShape {
  classes: classes[];
  totalPages: number;
}

const useClasses = (page?: number) => {
  const fetchClasses = async () => {
    const req = await axiosInstance.get<ClassesDateShape>("/api/classes", {
      params: {
        page,
      },
    });
    return req.data;
  };

  return useQuery({
    queryKey: ["classes", page],
    queryFn: fetchClasses,
    placeholderData: keepPreviousData,
  });
};
export default useClasses;
