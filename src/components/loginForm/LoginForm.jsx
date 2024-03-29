// REACTS REDUX
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../features/user/userSlice";

// REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";

//STYLESHEETS
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import BeatLoader from "react-spinners/BeatLoader";

export const LoginForm = () => {
  const { err, loading } = useSelector((store) => store.user);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        dispatch(login());
        setTimeout(() => {
          if (localStorage.getItem("token")) {
            navigate("/");
          }
        }, 1000);
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={400}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Typography
          variant="h2"
          padding={3}
          textAlign="center"
          sx={{ color: "#6439ff" }}
        >
          Sign In
        </Typography>
        <Typography variant="span" color={"red"}>
          {err}
        </Typography>
        <FormControl sx={{ m: 1, width: "22ch" }} variant="standard">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type={"email"}
            required
            onChange={(e) => {
              dispatch(userActions.setEmail(e.target.value));
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "22ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            onChange={(e) => {
              dispatch(userActions.setPwd(e.target.value));
            }}
            id="password"
            required
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            endIcon={<LoginIcon />}
            type="submit"
            variant="contained"
            sx={{
              marginTop: 5,
              borderRadius: 3,
              backgroundColor: "#6439ff",
              color: "white",
            }}
            disabled={loading}
          >
            {loading ? (
              <BeatLoader
                color={"#ffffff"}
                loading={loading}
                size={20}
                className="centra"
              />
            ) : (
              <p>sign in</p>
            )}
          </Button>
        </FormControl>
      </Box>
    </form>
  );
};
