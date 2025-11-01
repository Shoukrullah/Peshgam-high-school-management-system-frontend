import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export class APIClient<T> {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  getAll = async (params?: Record<string, any>) => {
    return (await axiosInstance.get<T>(this.endPoint, { params })).data;
  };
  getOne = async () => {
    return (await axiosInstance.get<T>(this.endPoint)).data;
  };
  post = async (data: T) => {
    return (await axiosInstance.post<T>(this.endPoint, data)).data;
  };
  update = async (data: T, id: number) => {
    return (await axiosInstance.patch<T>(`${this.endPoint}/${id}`, data)).data;
  };
  delete = async (id: number) => {
    return await axiosInstance.delete<T>(`${this.endPoint}/${id}`);
  };
}

export default axiosInstance;
