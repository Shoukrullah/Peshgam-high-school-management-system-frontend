// src/hooks/useMutate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axios-instance";
import type { QueryKey } from "../services/constants";

type Method = "post" | "patch" | "delete";

interface UseMutateProps<TData = any, TVariables = any> {
  endpoint: string;
  method: Method;
  invalidateKeys?: QueryKey[]; // Queries to refetch after success
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  optimisticUpdate?: (oldData: TData[], newItem: TVariables) => TData[];
}

export function useMutate<TData = any, TVariables = any>({
  endpoint,
  method,
  invalidateKeys = [],
  onSuccess,
  onError,
  optimisticUpdate,
}: UseMutateProps<TData, TVariables>) {
  const queryClient = useQueryClient();

  const mutationFn = async (variables?: TVariables): Promise<TData> => {
    switch (method) {
      case "post":
        return (await axiosInstance.post<TData>(endpoint, variables)).data;
      case "patch":
        return (await axiosInstance.patch<TData>(endpoint, variables)).data;
      case "delete":
        return (
          await axiosInstance.delete<TData>(endpoint, { data: variables })
        ).data;
      default:
        throw new Error("Invalid HTTP method");
    }
  };

  return useMutation({
    mutationFn,

    // ✅ Optimistic update
    onMutate: async (newItem: TVariables) => {
      if (!optimisticUpdate || invalidateKeys.length === 0) return;

      const previousDataMap: Record<string, TData[]> = {};

      // Cancel and snapshot all relevant queries
      await Promise.all(
        invalidateKeys.map(async (key) => {
          await queryClient.cancelQueries({ queryKey: [key] });
          previousDataMap[key] = queryClient.getQueryData<TData[]>([key]) || [];
          const updatedData = optimisticUpdate(previousDataMap[key], newItem);
          queryClient.setQueryData([key], updatedData);
        })
      );

      // Return rollback snapshot
      return { previousDataMap };
    },

    onError: (error, _vars, context: any) => {
      // Rollback all queries if mutation fails
      if (context?.previousDataMap) {
        Object.entries(context.previousDataMap).forEach(([key, data]) => {
          queryClient.setQueryData([key], data);
        });
      }
      onError?.(error);
    },

    onSuccess: (data) => {
      // Refetch all affected queries to ensure consistency
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      onSuccess?.(data);
    },
  });
}
