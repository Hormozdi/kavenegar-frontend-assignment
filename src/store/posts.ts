import { PostItem } from "@/api/posts";
import { atom } from "jotai";

export const postsList = atom<PostItem[]>([]);
