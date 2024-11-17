// import React, { useState } from "react";
// import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";

// const JobForm = ({
//   onSubmit,
//   initialData = {},
//   submitLabel = "Create Job",
// }) => {
//   const [formData, setFormData] = useState({
//     title: initialData.title || "",
//     description: initialData.description || "",
//     company: initialData.company || "",
//     location: initialData.location || "",
//   });

//   const { title, description, company, location } = formData;

//   // Handle input changes
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     // Optionally, reset the form if it's a creation form
//     if (!initialData._id) {
//       setFormData({
//         title: "",
//         description: "",
//         company: "",
//         location: "",
//       });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         {initialData._id ? "Edit Job" : "Create New Job"}
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Job Title"
//               name="title"
//               value={title}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Company"
//               name="company"
//               value={company}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Location"
//               name="location"
//               value={location}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               name="description"
//               value={description}
//               onChange={handleChange}
//               fullWidth
//               required
//               multiline
//               rows={4}
//             />
//           </Grid>
//         </Grid>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//         >
//           {submitLabel}
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default JobForm;

// client/src/components/Jobs/JobForm.js

import React from "react";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const JobForm = ({
  onSubmit,
  initialData = {},
  submitLabel = "Create Job",
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      company: initialData.company || "",
      location: initialData.location || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Job title must be at most 100 characters")
        .required("Job title is required"),
      company: Yup.string()
        .max(100, "Company name must be at most 100 characters")
        .required("Company name is required"),
      location: Yup.string()
        .max(100, "Location must be at most 100 characters")
        .required("Location is required"),
      description: Yup.string()
        .max(1000, "Description must be at most 1000 characters")
        .required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      if (!initialData._id) {
        resetForm();
      }
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData._id ? "Edit Job" : "Create New Job"}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Job Title */}
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          {/* Company */}
          <Grid item xs={12}>
            <TextField
              label="Company"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              multiline
              rows={4}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          {submitLabel}
        </Button>
      </Box>
    </Paper>
  );
};

export default JobForm;
