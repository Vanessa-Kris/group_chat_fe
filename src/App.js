import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Pages/Home";
import Topics from "./Components/Topics";
import Posts from "./Components/Posts";
import Threads from "./Components/Threads";
import Layout from "./Layout";
import Search from "./Components/Search";

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#1B2A41", // Light purple
            contrastText: "#ffffff", // White text for better contrast
          },
          secondary: {
            main: "#585481", // Dark purple
            contrastText: "#ffffff",
          },
          // background: {
          //   default: "#1e1e2e", // Dark background with a purple tint
          //   paper: "#2c2c3a", // Slightly lighter background for cards/dialogs
          // },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/threads/:id" element={<Threads />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
