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
import { loginData } from "@/store/Features/user.slice";
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

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.userS);

  // Form validation schema
  const validationSchema = Yup.object().shape({
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginData(values))
        .then((res) => {
          if (res.payload.data.message == "success") {
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }
        })
        .catch(() => {
          // console.log(error);
          
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
                    Logging in...
                  </Typography>
                </Box>
              ) : (
                "Login"
              )}
            </Button>
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
            Don`t have an account?{" "}
            <Link href="signup" color="primary">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
