import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // While checking authentication status, show a loading spinner
    return (
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    // If user is authenticated, redirect to Home page
    return <Navigate to="/" replace />;
  }

  // If user is not authenticated, render the public component
  return children;
};

export default PublicRoute;
