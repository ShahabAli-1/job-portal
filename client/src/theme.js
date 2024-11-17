import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#f39c12",
    },
    background: {
      default: "#fdfdfd",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: "#2c3e50",
      fontFamily: "'Lora', serif",
    },
    body1: {
      fontSize: "1rem",
      color: "#7f8c8d",
      fontFamily: "'Open Sans', sans-serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#2c3e50",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#34495e",
          },
        },
        containedSecondary: {
          backgroundColor: "#f39c12",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#f1c40f",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          backgroundColor: "#ffffff",
          borderRadius: 6,
          border: "1px solid #dcdcdc",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          padding: "16px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
  },
});

export default theme;
