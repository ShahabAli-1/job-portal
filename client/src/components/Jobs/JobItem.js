import React, { useState, useContext } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import { JobContext } from "../../context/JobContext";
import JobForm from "./JobForm";
import { AuthContext } from "../../context/AuthContext";

const JobItem = ({ job }) => {
  const { updateJob, deleteJob } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Determine if the current user is the owner of the job
  const isOwner = job.postedBy._id === user._id;

  // Handle opening and closing edit dialog
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  // Handle opening and closing delete confirmation dialog
  const handleDeleteOpen = () => setDeleteConfirmOpen(true);
  const handleDeleteClose = () => setDeleteConfirmOpen(false);

  // Handle job update
  const handleUpdate = (updatedData) => {
    updateJob(job._id, updatedData);
    handleEditClose();
  };

  // Handle job deletion
  const handleDelete = () => {
    deleteJob(job._id);
    handleDeleteClose();
  };

  // Format the "Created At" date
  const formattedDate = new Date(job.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Accordion sx={{ mb: 2, boxShadow: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-content-${job._id}`}
          id={`panel-header-${job._id}`}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Job Title and Created At */}
            <Box>
              <Typography variant="h6">{job.title}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption" color="text.secondary">
                  Posted By: {job.postedBy.username}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.25 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Box>

            {/* Edit and Delete Icons */}
            {isOwner && (
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accordion toggle
                    handleEditOpen();
                  }}
                  size="large"
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accordion toggle
                    handleDeleteOpen();
                  }}
                  size="large"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {/* Company */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="subtitle1" component="span">
                  <strong>Company:</strong> {job.company}
                </Typography>
              </Box>
            </Grid>

            {/* Location */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="subtitle1" component="span">
                  <strong>Location:</strong> {job.location}
                </Typography>
              </Box>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <DescriptionIcon fontSize="small" sx={{ mr: 0.5, mt: 0.3 }} />
                <Typography variant="subtitle1">
                  <strong>Description:</strong> {job.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Edit Job Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <JobForm
            onSubmit={handleUpdate}
            initialData={job}
            submitLabel="Update Job"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the job "{job.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobItem;
