import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#00acc1",
    },
    background: {
      default: "#f4f6f9",
    },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);