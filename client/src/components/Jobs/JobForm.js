import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";

const JobForm = ({
  onSubmit,
  initialData = {},
  submitLabel = "Create Job",
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    company: initialData.company || "",
    location: initialData.location || "",
  });

  const { title, description, company, location } = formData;

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally, reset the form if it's a creation form
    if (!initialData._id) {
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData._id ? "Edit Job" : "Create New Job"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Title"
              name="title"
              value={title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company"
              name="company"
              value={company}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {submitLabel}
        </Button>
      </Box>
    </Paper>
  );
};

export default JobForm;
