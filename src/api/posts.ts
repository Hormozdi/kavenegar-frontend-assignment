import urls from "@/utils/routes";
import { useCustomQuery } from "@/utils/useCustomQuery";
import { QueryKeys } from "@/assets/consts/enums";

export type RequestPostsList = {};

export type PostItem = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const useGetPostsList = (props: RequestPostsList = {}) => {
  return useCustomQuery<RequestPostsList, PostItem[]>({
    props,
    url: urls.posts,
    method: "get",
    key: QueryKeys.getPostsList,
    enabled: true,
  });
};
