import tagIcon from "../../assets/icons/user.png";
import sensorIcon from "../../assets/icons/sensor.png";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [
    {
      name: "Sensor",
      icon: sensorIcon,
    },
    {
      name: "Tag",
      icon: tagIcon,
    },
  ],
};

const legendSlice = createSlice({
  name: "legend",
  initialState,
  reducers: {},
});

export default legendSlice.reducer;
