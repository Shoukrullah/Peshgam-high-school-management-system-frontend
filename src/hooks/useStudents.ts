import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance"
import type { studentShape } from "../types/students";

const useStudents = ()=> {
    const fetchStudents = async() => {
        const req = await axiosInstance.get<studentShape[]>('/api/students');
        return req.data
    }

    return useQuery({
        queryKey:['students'],
        queryFn: fetchStudents,
        staleTime: 1000 * 60, // 1 min
    })
}
export default useStudents