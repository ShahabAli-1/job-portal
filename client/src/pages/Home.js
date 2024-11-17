import React, { useContext } from "react";
import { Container, Typography, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { JobProvider } from "../context/JobContext";
import JobList from "../components/Jobs/JobList";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <JobProvider>
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
            Welcome to the Job Portal, {user.username}!
          </Typography>
          <Typography variant="body1" gutterBottom></Typography>
          {/* Job Listings */}
          <JobList />
        </Box>
      </Container>
    </JobProvider>
  );
};

export default Home;
