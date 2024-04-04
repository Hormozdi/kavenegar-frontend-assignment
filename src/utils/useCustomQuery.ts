import { useQuery } from "@tanstack/react-query";
import { axiosInstanceV1 } from "./axios";
import { AxiosRequestConfig } from "axios";

export const useCustomQuery = <T extends object, P>({
  props,
  url,
  method,
  key,
  headers,
  enabled = false,
}: {
  props: T;
  url: string;
  method: "get" | "post" | "put" | "delete";
  key: string;
  headers?: { "Content-Type": string };
  enabled?: boolean;
}) => {
  const options: AxiosRequestConfig = {
    method,
    headers,
  };
  if (method === "get") {
    options.params = props;
  } else {
    options.data = props;
  }

  const { data, isPending, isFetching, refetch, isRefetching } = useQuery({
    queryKey: [key, ...Object.values(props)],
    queryFn: async (): Promise<{ data: P }> => {
      return await axiosInstanceV1(url, options);
    },
    enabled,
  });

  return {
    data: data?.data,
    isLoading: isPending || isFetching,
    refetch,
    isRefetching: isFetching || isRefetching,
  };
};
