import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import React, { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppSelector } from "@/hooks/store.hook";
import axios from "axios";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function PostForm() {
  const postContentRef = useRef<HTMLInputElement>(null);
  const fileContent = useRef<HTMLInputElement>(null);

  const { token } = useAppSelector((store) => store.userS);

  async function createPost() {
    const content = postContentRef.current?.value || "";
    const file = fileContent.current?.files?.[0];

    const formData = new FormData();
    formData.append("body", content);
    if (file) {
      formData.append("image", file);
    }

    try {
      const options = {
        url: "https://linked-posts.routemisr.com/posts",
        method: "POST",
        headers: {
          token,
        },
        data: formData,
      };
      const { data } = await axios.request(options);
      console.log(data);

      if (postContentRef.current) {
        postContentRef.current.value = "";
      }
      if (fileContent.current) {
        fileContent.current.value = "";
      }
      toast.success("Post Upload");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Check Your Data");
    }
  }

  return (
    <Box
      sx={{
        width: "45%",
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        What’s on your mind?
      </Typography>

      <TextField
        inputRef={postContentRef}
        fullWidth
        multiline
        minRows={5}
        placeholder="Share your thoughts..."
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            py: 1,
          }}
        >
          Upload files
          <VisuallyHiddenInput type="file" ref={fileContent} />
        </Button>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            py: 1,
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={createPost}
        >
          Post
        </Button>
      </Stack>
    </Box>
  );
}
