import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tagsIcon from "../../assets/icons/user.png";
import javaAxios from "../../api/javaAxios";

import L from "leaflet";

const initialState = {
  tags: [],
  tagsStatus: "idle",
  error: null,
  tagsIcon: L.icon({
    iconUrl: tagsIcon,
    iconSize: [50, 50],
    iconAnchor: [10, 45],
    popupAnchor: [0, 0],
  }),
};

const GET_TAGS = "/tag";

export const fetchTagList = createAsyncThunk("user/fetchUserList", async () => {
  const response = await javaAxios
    .get(GET_TAGS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data.content;
});

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTagList.pending, (state, action) => {
        state.tagsStatus = "loading";
      })
      .addCase(fetchTagList.fulfilled, (state, action) => {
        state.tagsStatus = "succeded";
        state.tags = action.payload;
      })
      .addCase(fetchTagList.rejected, (state, action) => {
        state.tagsStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;
