"use client";

import { useAtom } from "jotai";
import { Back } from "./Back";
import { postsList } from "@/store/posts";
import { useEffect, useState } from "react";
import { PostItem } from "@/api/posts";

export default function Home({ params }: { params: { id: number } }) {
  const [posts] = useAtom(postsList);

  const [post, setPost] = useState<PostItem>();

  useEffect(() => {
    setPost(posts.find((el) => el.id == params.id));
  }, [posts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Back />
        {posts.length ? (
          <>
            <div>title: {post?.title}</div>
            <div>body: {post?.body}</div>
          </>
        ) : (
          <>No Content</>
        )}
      </div>
    </main>
  );
}
