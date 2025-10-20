import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { teacherShape } from "../types/teachers";

interface TeacherNewShape {
  teachers: teacherShape[];
  totalPages: number;
}

const useTeacher = (page?: number) => {
  const fetchStudents = async () => {
    const req = await axiosInstance.get<TeacherNewShape>("/api/teachers?page="+page);
    return req.data;
  };

  return useQuery({
    queryKey: ["teachers",page],
    queryFn: fetchStudents,
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60, // 1 min
  });
};
export default useTeacher;
