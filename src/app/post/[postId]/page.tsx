"use client";
import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { getPostDetails } from "@/store/Features/post.slice";
import { use, useEffect } from "react";

export default function PostForID({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const dispatch = useAppDispatch();
  const { postDetails } = useAppSelector((store) => store.SliceP);
  // عملتها كدا علشان انا هستخدم useSelector & useDispatch
  const p = use(params);

  useEffect(() => {
    dispatch(getPostDetails(p.postId));
  }, []);

  return (
    <>
      {postDetails ? (
        <PostCard key={postDetails.id} showAllComments={true} postInfo={postDetails} />
      ) : (
        <Loading />
      )}
    </>
  );
}
