import { useDispatch } from "react-redux";
import { Avatar, Button, Container, Grid, Icon } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import React, { useEffect, useState } from "react";
import { StyledPaper } from "./styles";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth.js";

const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "863257703687-no20qj1u713bbs9ot4ppo92f6k8d5hr1.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLogin"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  const handleGoogleResponse = async (response) => {
    const token = response.credential;
    console.log(token);
    const userObjId = jwt_decode(response.credential);
    try {
      dispatch({ type: "AUTH", data: { result: userObjId, token } });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const clickshowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(userData, navigate));
    } else {
      dispatch(signin(userData, navigate));
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevMode) => !prevMode);
  };
  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper>
        <Avatar sx={{ margin: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={handleSubmit} sx={{ width: 1, marginTop: 3 }}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleClickShowPassword={clickshowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="confirmPassword"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleClickShowPassword={clickshowPassword}
              />
            )}
          </Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ mx: "auto", mt: "10px" }}
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "New User! Sign Up"}
            </Button>
          </Grid>
          <Grid container>
            <Button
              id="googleLogin"
              variant="contained"
              fullWidth
              sx={{ mx: "auto", mt: "10px" }}
            >
              Login With Google
            </Button>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
}

export default Auth;
