"use client";
import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, indigo } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box, Button, Divider, TextField, Avatar } from "@mui/material";
import { Post } from "@/types/posts.types";
import CommentCard from "../CommentCard/CommentCard";
import Link from "next/link";
import { useAppSelector } from "@/hooks/store.hook";
import axios from "axios";



export default function PostCard({
  postInfo,
  showAllComments = false,
}: {
  postInfo: Post;
  showAllComments?: boolean;
}) {
  const { token } = useAppSelector((store) => store.userS);
  // const [expanded, setExpanded] = React.useState(false);
  const commentContent = useRef<HTMLInputElement>(null);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const createComment = async (id: string) => {
    const content = commentContent.current?.value;

    if (!content) {
      console.error("Comment content cannot be empty");
      return;
    }

    try {
      const options = {
        url: `https://linked-posts.routemisr.com/comments`,
        method: `POST`,
        headers: { token },
        data: {
          content,
          post: id,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);

      if (commentContent.current) {
        commentContent.current.value = "";
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "75%",
        mx: "auto",
        mt: 3,
        borderRadius: "12px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={postInfo.user.photo}
            alt={postInfo.user.name}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {postInfo.user.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color={grey[600]}>
            {new Date(postInfo.createdAt).toDateString()}
          </Typography>
        }
      />

      <CardContent>
        <Typography variant="body1" sx={{ color: grey[800], mb: 2 }}>
          {postInfo.body}
        </Typography>
      </CardContent>

      {postInfo.image && (
        <CardMedia
          component="img"
          height="400"
          image={postInfo.image}
          alt={postInfo.user.name}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
      )}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="text"
            startIcon={<ThumbUpIcon />}
            sx={{ color: grey[700], "&:hover": { color: indigo[500] } }}
          >
            1.2K
          </Button>
          <Button
            variant="text"
            startIcon={<CommentIcon />}
            sx={{ color: grey[700], "&:hover": { color: indigo[500] } }}
          >
            345
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton aria-label="share" sx={{ color: grey[700], "&:hover": { color: indigo[500] } }}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="bookmark" sx={{ color: grey[700], "&:hover": { color: indigo[500] } }}>
            <BookmarkIcon />
          </IconButton>
        </Box>
      </CardActions>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: indigo[800] }}>
          Comments
        </Typography>
        {postInfo.comments.length > 0 && !showAllComments && (
          <CommentCard commentInfo={postInfo.comments[0]} />
        )}

        {postInfo.comments.length > 1 &&
          showAllComments &&
          postInfo.comments.map((current) => (
            <CommentCard commentInfo={current} key={current._id} />
          ))}

        {!showAllComments && (
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              py: 1,
              color: indigo[800],
              borderColor: indigo[800],
              "&:hover": {
                backgroundColor: indigo[50],
                borderColor: indigo[800],
              },
            }}
          >
            <Link href={`/post/${postInfo._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              Show more Comments
            </Link>
          </Button>
        )}
        {showAllComments && (
          <Box>
            <TextField
              inputRef={commentContent}
              multiline
              minRows={2}
              placeholder="Add your comment..."
              fullWidth
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: indigo[300],
                  },
                  "&:hover fieldset": {
                    borderColor: indigo[500],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: indigo[800],
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => createComment(postInfo._id)}
              sx={{
                mt: 2,
                backgroundColor: indigo[800],
                "&:hover": {
                  backgroundColor: indigo[900],
                },
              }}
            >
              Send
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}