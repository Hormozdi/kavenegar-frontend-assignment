"use client";

import { Suspense, useEffect } from "react";
import { useGetPostsList } from "@/api/posts";
import Link from "next/link";
import { useAtom } from "jotai";
import { postsList } from "@/store/posts";

export function List() {
  const { data } = useGetPostsList();

  const [, setPosts] = useAtom(postsList);

  useEffect(() => {
    setPosts(data || []);
  }, [data]);

  return (
    <div>
      <Suspense fallback="Loaing ..."></Suspense>
      {data?.map((post) => (
        <div key={post.id} className="p-4 mb-8 bg-slate-200 rounded-md">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}
