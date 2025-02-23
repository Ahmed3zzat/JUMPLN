"use client";
import React from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "@/store/Features/user.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { useRouter } from "next/navigation";

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
export default function ChangePassword() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, message, isError } = useAppSelector(
      (store) => store.userS
    );
  
    // Form validation schema
    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          "Must include uppercase, lowercase, number, and special character"
        ),
      newPassword: Yup.string()
        .required("Re-Password number is required")
        .min(8, "Re-Password must be at least 8 characters")
    });
  
    const formik = useFormik({
      initialValues: {
        password: "",
        newPassword: "",
      },
      validationSchema,
      onSubmit: (values) => {
        dispatch(changePassword(values))
          .then((res) => {
            if (res.payload.data.message == "success") {
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            }
          })
          .catch((error) => {
            console.log(error);
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
                label="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword && Boolean(formik.errors.newPassword)
                }
                helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                      Changing...
                    </Typography>
                  </Box>
                ) : (
                  "Change Password"
                )}
              </Button>
  
              {isError ? (
                <TextField sx={{ color: "red" }}>{message}</TextField>
              ) : (
                ""
              )}
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }
  