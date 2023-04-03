import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import javaAxios from "../../api/javaAxios";
import { StarRateTwoTone } from "@mui/icons-material";

const LOGIN_API = "/auth/signin";
const ACCOUNT_API = "/account/email/";

const initialState = {
  email: "",
  pwd: "",
  token: "",
  err: "",
  loading: false,
  isLoggedIn: false,
  account: {},
  accountStatus: "idle",
};

export const login = createAsyncThunk(
  "account/login",
  async (arg, { getState }) => {
    const state = getState();
    await javaAxios
      .post(
        LOGIN_API,
        JSON.stringify({ email: state.user.email, password: state.user.pwd }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        localStorage.setItem("email", state.email);
        state.token = res.data.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", res.data.token);
        state.loading = false;
      });
  }
);

export const fetchAccountByEmail = createAsyncThunk(
  "account/fetchAccountByEmail",
  async (_, { getState }) => {
    const response = await javaAxios
      .get(ACCOUNT_API + localStorage.getItem("email"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, input) {
      state.err = "";
      state.email = input.payload;
    },
    setPwd(state, input) {
      state.err = "";
      state.pwd = input.payload;
    },

    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      window.location.reload();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccountByEmail.pending, (state, action) => {
        state.accountStatus = "loading";
        state.loading = true;
      })
      .addCase(fetchAccountByEmail.fulfilled, (state, action) => {
        state.accountStatus = "succeded";
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccountByEmail.rejected, (state, action) => {
        state.accountStatus = "failed";
        state.err = action.error.message;
        state.loading = true;
      })
      .addCase(login.pending, (state, action) => {
        state.accountStatus = "loading";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accountStatus = "succeded";
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.accountStatus = "failed";
        state.err = action.error.message;
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
