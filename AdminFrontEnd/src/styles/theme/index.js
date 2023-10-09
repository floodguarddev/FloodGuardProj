import { createTheme } from "@mui/material/styles";

// Create a blue theme instance.
const theme = createTheme({
  palette: {
    text: {
      primary: '#333', // Dark text color
      secondary: '#666', // Secondary text color
      disabled: '#999', // Disabled text color
      hint: '#999', // Hint text color
    },
    primary: {
      main: "#2196F3", // Blue primary color
    },
    secondary: {
      main: "#64B5F6", // Light blue secondary color
    },
    success: {
      main: "#00B69B", // Success color
    },
    info: {
      main: "#2DB6F5", // Info color
    },
    warning: {
      main: "#FFBC2B", // Warning color
    },
    danger: {
      main: "#EE368C", // Danger color
    },
    dark: {
      main: "#260944", // Dark background color
    },
  },

  typography: {
    fontSize: 12,
  },
});

export default theme;
