import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Authentication/Auth";
import Postdetails from "./components/PostDetails/postdetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <HashRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/posts" />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/search" element={<Home />} />
          <Route
            exact
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
          <Route exact path="/posts/:id" element={<Postdetails />} />
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
