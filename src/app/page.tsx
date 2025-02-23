"use client";
import { Box, Grid } from "@mui/material";
import PostCard from "@/components/PostCard/PostCard";
import { getPosts } from "@/store/Features/post.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import PostForm from "@/components/PostForm/PostForm";

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((store) => store.SliceP);
  const Token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getPosts());
  }, []);
// console.log(posts);

  return (
    <Box>
      <Box sx={{ mt: 4 }}>{Token && <PostForm />}</Box>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
          {posts ? (
            posts.map((current) => (
              <PostCard postInfo={current} key={current.id} />
            ))
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

{
  /* <PostCard /> */
}
