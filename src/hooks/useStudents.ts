import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { studentShape } from "../types/students";

interface StudentNewShape {
  students: studentShape[];
  totalPages: number;
}

const useStudents = (page: number) => {
  const fetchStudents = async () => {
    const req = await axiosInstance.get<StudentNewShape>("/api/students?page="+page);
    return req.data;
  };

  return useQuery({
    queryKey: ["students",page],
    queryFn: fetchStudents,
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60, // 1 min
  });
};
export default useStudents;
