"use client";
import React from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
  Divider,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signup } from "@/store/Features/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { useRouter } from "next/navigation";

// Define the theme with a fresh color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // A deeper purple
    },
    secondary: {
      main: "#FF7E67", // A richer orange
    },
    background: {
      default: "#F3F4F6", // Soft gray background
    },
  },
  typography: {
    fontFamily: `"Poppins", sans-serif`,
  },
});

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, message, isError } = useAppSelector(
    (store) => store.userS
  );

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must contain at least three letter")
      .max(25, "Name must contain at maximum of twenty five letter")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Must include uppercase, lowercase, number, and special character"
      ),
    rePassword: Yup.string()
      .required("Re-Password number is required")
      .min(8, "Re-Password must be at least 8 characters")
      .oneOf([Yup.ref("password")], "Re-Password must matches with Password"),
    dateOfBirth: Yup.string().required("dateOfBirth is required"),
    gender: Yup.string()
      .required("gender is required")
      .oneOf(["male", "female"], "must be `male` or `female`"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signup(values))
        .then((res) => {
          if (res.payload.data.message == "success") {
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        })
        .catch(() => {
          // console.log(error);
          // console.log("no");
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #4F46E5, #FF7E67)", // Smoother gradient
          padding: "20px",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            width: "420px",
            borderRadius: 5,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            Welcome to Jumpln 🚀
          </Typography>

          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="RePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.rePassword && Boolean(formik.errors.rePassword)
              }
              helperText={formik.touched.rePassword && formik.errors.rePassword}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="DateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.8,
                fontSize: "16px",
                mt: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  backgroundColor: "#ddd",
                  cursor: "not-allowed",
                },
                position: "relative",
              }}
              type="submit"
              disabled={!formik.dirty || !formik.isValid || isLoading}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <CircularProgress
                    size={24}
                    thickness={4}
                    sx={{
                      color: "white",
                      animationDuration: "0.75s",
                    }}
                  />
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Signing up...
                  </Typography>
                </Box>
              ) : (
                "Signup"
              )}
            </Button>

            {isError ? (
              <TextField sx={{ color: "red" }}>{message}</TextField>
            ) : (
              ""
            )}
          </form>

          <Divider sx={{ my: 3, color: "#B0BEC5" }}>OR</Divider>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              fontSize: "16px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "#E0E7FF",
              },
            }}
          >
            Continue with Google
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{
              py: 1.5,
              fontSize: "16px",
              mt: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                backgroundColor: "#FFD6C1",
              },
            }}
          >
            Continue with Facebook
          </Button>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Do you have an account?{" "}
            <Link href="/login" color="primary">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
