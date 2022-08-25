import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
// import useStyles from "./styles";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
const StyledAppbar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 50px",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
}));
const StyledBox = styled(Box)({ display: "flex", alignItems: "center" });
const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

//Component

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
  };
  return (
    <StyledAppbar position="static" color="inherit">
      <StyledBox>
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
          component={Link}
          to="/"
        >
          Recipies
        </Typography>
      </StyledBox>
      <StyledToolBar>
        {user ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "center", md: "space-between" },
              width: { sm: "auto", md: "400px" },
              alignItems: "center",
              marginTop: { sm: 2 },
            }}
          >
            <Avatar
              sx={(theme) => ({
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              })}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              sx={{ ml: 1 }}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Button variant="contained" component={Link} to="/auth">
            Sign In
          </Button>
        )}
      </StyledToolBar>
    </StyledAppbar>
  );
}

export default Navbar;
