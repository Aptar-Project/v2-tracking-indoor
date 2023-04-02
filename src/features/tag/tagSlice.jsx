import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tagsIcon from "../../assets/icons/user.png";
import javaAxios from "../../api/javaAxios";

import L from "leaflet";

const initialState = {
  tags: [],
  loading: false,
  tagsStatus: "idle",
  status: "idle",
  error: null,
  tagsIcon: L.icon({
    iconUrl: tagsIcon,
    iconSize: [50, 50],
    iconAnchor: [25, 48],
    popupAnchor: [0, 0],
  }),
  detailTag: {},
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

export const fetchTag = createAsyncThunk("tag/fetchTag", async (id) => {
  const response = await javaAxios
    .get(GET_TAGS + `/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  return response.data;
});

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTagList.pending, (state, action) => {
        state.tagsStatus = "loading";
        state.loading = true;
      })
      .addCase(fetchTagList.fulfilled, (state, action) => {
        state.tagsStatus = "succeded";
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTagList.rejected, (state, action) => {
        state.tagsStatus = "failed";
        state.error = action.error.message;
        state.loading = true;
      })
      .addCase(fetchTag.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchTag.fulfilled, (state, action) => {
        state.status = "succeded";
        state.detailTag = action.payload;
        state.loading = false;
      })
      .addCase(fetchTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = true;
      });
  },
});

export default tagSlice.reducer;
