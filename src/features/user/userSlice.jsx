import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import javaAxios from "../../api/javaAxios";

const LOGIN_API = "/auth/signin";

const initialState = {
  email: "",
  pwd: "",
  token: "",
  err: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, input) {
      state.email = input.payload;
    },
    setPwd(state, input) {
      state.pwd = input.payload;
    },
    async login(state) {
      state.loading = true;
      await javaAxios
        .post(
          LOGIN_API,
          JSON.stringify({ email: state.email, password: state.pwd }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          state.token = res.data.token;
          state.isLoggedIn = true;
          localStorage.setItem("token", res.data.token);
          state.loading = false;
          return "okay";
        })
        .catch((err) => {
          state.loading = false;
          throw err;
        });
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      window.location.reload();
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
