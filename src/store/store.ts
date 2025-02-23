import { configureStore } from "@reduxjs/toolkit";
import { userS } from "./Features/user.slice";
import { SliceP } from "./Features/post.slice";
// import { userSignup } from "./Features/user.slice.signup";

export const store = configureStore({
  reducer: {
    userS,
    SliceP,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppsDispatch = typeof store.dispatch;
