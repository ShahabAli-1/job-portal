import React, { useContext, useState } from "react";
import { JobContext } from "../../context/JobContext";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobItem from "./JobItem";
import JobForm from "./JobForm";
import { AuthContext } from "../../context/AuthContext";

const JobList = () => {
  const { jobs, loading, error, createJob } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // 0: All Jobs, 1: My Jobs

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to handle job creation
  const handleCreateJob = async (jobData) => {
    await createJob(jobData);
    handleClose();
  };

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Determine which jobs to display
  const filteredJobs =
    selectedTab === 0
      ? jobs // All Jobs
      : jobs.filter((job) => job.postedBy._id === user._id); // My Jobs

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Job Listings
        </Typography>

        {/* Create Job Posting Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Create Job Posting
          </Button>
        </Box>

        {/* Job Creation Modal */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Create New Job</DialogTitle>
          <DialogContent>
            <JobForm onSubmit={handleCreateJob} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Tabs for All Jobs and My Jobs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="All Jobs" />
            <Tab label="My Jobs" />
          </Tabs>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error Handling */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && filteredJobs.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No job postings available.
          </Typography>
        )}

        {/* Job Listings */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} key={job._id}>
              <JobItem job={job} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobList;
