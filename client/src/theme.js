import { createTheme } from "@mui/material/styles";

// Define your custom theme here
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    secondary: {
      main: "#dc004e", // Customize your secondary color
    },
    background: {
      default: "#f5f5f5", // Set the default background color
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // Make h4 headers bold
    },
    body1: {
      fontSize: "1rem", // Customize body text size
    },
  },
  components: {
    // Override default MUI component styles here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Make buttons more rounded
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px", // Add spacing below text fields
        },
      },
    },
    // Add more component overrides as needed
  },
});

export default theme;
