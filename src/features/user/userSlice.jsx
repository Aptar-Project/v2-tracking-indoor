import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import javaAxios from "../../api/javaAxios";

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
          localStorage.setItem("email", state.email);
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
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
