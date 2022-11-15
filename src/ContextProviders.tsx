/**
 * Want to avoid a large component tree with all theme/state/routing providers we might add to the app
 * So, just add them here, and include it in our index file
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: { main: "#1690c6" },
    secondary: { main: "#fa8d3e", contrastText: "#fff" },
    error: { main: "#f44336" },
    warning: { main: "#ff9800", contrastText: "#fff" },
    success: { main: "#5cb85c", contrastText: "#fff" },
  },
});

interface Props {
  children: React.ReactNode;
}
const ContextProviders: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
};
export default ContextProviders;
