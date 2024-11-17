import React, { useContext } from "react";
import { Container, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Job Portal, {user.username}!
        </Typography>
        <Typography variant="body1">
          Here you can create, view, edit, and delete job postings.
        </Typography>
        {/* Future components for job listings will go here */}
      </Box>
    </Container>
  );
};

export default Home;
