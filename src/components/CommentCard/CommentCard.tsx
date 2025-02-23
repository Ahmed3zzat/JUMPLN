import { Box, CardHeader, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import { Comment } from "@/types/posts.types";
import userReplace from "@/assets/images/user (1).png";

export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  function handelMyImage(imgPath: string) {
    if (imgPath.includes("undefined")) {
      return userReplace;
    } else {
      return imgPath;
    }
  }
  return (
    <Box sx={{ bgcolor: "#eee", px: 3, py: 2, borderRadius: "8px", mt:2}}>
      <CardHeader
        avatar={
          <Image
            src={handelMyImage(commentInfo.commentCreator.photo)}
            width={50}
            height={50}
            alt={commentInfo.commentCreator.name}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {commentInfo.commentCreator.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color={grey[600]}>
            {new Date(commentInfo.createdAt).toDateString()}
          </Typography>
        }
      />
      <Typography component={"p"}>{commentInfo.content}</Typography>
    </Box>
  );
}
