import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sensorIcon from "../../assets/icons/sensor.png";
import javaAxios from "../../api/javaAxios";

import L from "leaflet";

const initialState = {
  sensors: [],
  sensorStatus: "idle",
  error: null,
  loading: false,
  sensorIcon: L.icon({
    iconUrl: sensorIcon,
    iconSize: [50, 50],
    iconAnchor: [20, 45],
    popupAnchor: [0, 0],
  }),
  detailSensor: {},
};

const GET_SENSORS = "/sensore";

export const fetchSensorList = createAsyncThunk(
  "sensor/fetchSensorList",
  async () => {
    const response = await javaAxios
      .get(GET_SENSORS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    return response.data.content;
  }
);

export const fetchSensor = createAsyncThunk(
  "sensor/fetchSensor",
  async (id) => {
    const response = await javaAxios
      .get(GET_SENSORS + `/${id}`, {
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

export const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSensorList.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchSensorList.fulfilled, (state, action) => {
        state.status = "succeded";
        state.sensors = action.payload;
        state.loading = false;
      })
      .addCase(fetchSensorList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = true;
      })
      .addCase(fetchSensor.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchSensor.fulfilled, (state, action) => {
        state.status = "succeded";
        state.detailSensor = action.payload;
        state.loading = false;
      })
      .addCase(fetchSensor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = true;
      });
  },
});

export default sensorSlice.reducer;
