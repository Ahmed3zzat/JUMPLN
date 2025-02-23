"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  Grid,
  Button,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import { Cake, Male, CalendarToday, LockClock } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import axios from "axios";
import Loading from "@/components/Loading/Loading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { jwtDecode } from "jwt-decode";
import PostForm from "@/components/PostForm/PostForm";
import PostCard from "@/components/PostCard/PostCard";
import { getUserPosts } from "@/store/Features/post.slice";

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

export default function Profile() {
  const { token } = useAppSelector((store) => store.userS);
  const [data, setData] = useState(null);
  const [UserPosts, setUserPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const photoRef = useRef<HTMLInputElement>(null);
  const [UserId, setUserId] = useState({ user: null, iat: 0 });
  const dispatch = useAppDispatch();
  const { postUser } = useAppSelector((store) => store.SliceP);
  console.log(postUser);
  

  const fetchUserData = async () => {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/users/profile-data`,
        method: `GET`,
        headers: { token },
      };
      const { data } = await axios.request(options);
      setData(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        setLoading(true);
        const options = {
          url: `https://linked-posts.routemisr.com/users/upload-photo`,
          method: `PUT`,
          data: formData,
          headers: { token },
        };
        const { data } = await axios.request(options);
        setSnackbarMessage("Photo uploaded successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchUserData(); // Refresh user data to display the new photo
      } catch (error) {
        console.error("Error uploading photo:", error);
        setSnackbarMessage("Failed to upload photo.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode.user);
    }
  }, [token]);

  console.log(UserId);

  // const getUserDataPosts = async () => {
  //   try {
  //     const options = {
  //       url: `https://linked-posts.routemisr.com/users/$${UserId}/posts?limit=2`,
  //       method: `GET`,
  //       headers: { token },
  //     };
  //     const { data } = await axios.request(options);
  //     setUserPosts(data.user);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  useEffect(() => {
    // getUserDataPosts();
    dispatch(getUserPosts());
  }, []);
  // console.log(UserPosts);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {data ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "20vh",
            p: 3,
            background: "#E3F2FD", // Light blue background
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              maxWidth: 800,
              width: "100%",
              borderRadius: 4,
              background: "#ffffff",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                src={data.photo}
                alt={data.name}
                sx={{
                  width: 150,
                  height: 150,
                  mb: 3,
                  border: "4px solid #1976D2", // Blue border
                }}
              />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 4,
                  py: 1.5,
                  bgcolor: "#1976D2", // Blue background
                  "&:hover": {
                    bgcolor: "#1565C0", // Darker blue on hover
                  },
                }}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Edit Photo"}
                <VisuallyHiddenInput
                  type="file"
                  ref={photoRef}
                  onChange={handleFileChange}
                />
              </Button>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ mt: 3, fontWeight: "bold", color: "#333" }}
              >
                {data.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: "#e0e0e0" }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Cake sx={{ mr: 2, color: "#1976D2", fontSize: "28px" }} />
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>Date of Birth:</strong> {data.dateOfBirth}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Male sx={{ mr: 2, color: "#1976D2", fontSize: "28px" }} />
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>Gender:</strong> {data.gender}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarToday
                    sx={{ mr: 2, color: "#1976D2", fontSize: "28px" }}
                  />
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>Joined:</strong>{" "}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LockClock
                    sx={{ mr: 2, color: "#1976D2", fontSize: "28px" }}
                  />
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>Last Password Change:</strong>{" "}
                    {new Date(data.passwordChangedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Loading />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          p: 3,
          background: "#E3F2FD", // Light blue background
        }}
      >
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
            {postUser ? (
              postUser.map((current) => (
                <PostCard postInfo={current} key={current.id} />
              ))
            ) : (
              <Loading />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
