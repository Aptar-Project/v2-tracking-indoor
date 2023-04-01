import { createSlice } from "@reduxjs/toolkit";
import map from "../../assets/map.jpg";
import L from "leaflet";
import icon from "../../assets/icons/user.png";

const initialState = {
  center: [350, 350],
  crs: L.CRS.Simple,
  image: map,
  zoom: -1,
  imageBounds: [
    [0, 0],
    [706, 740],
  ],
  marker: L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [20, 45],
    popupAnchor: [0, 0],
  }),
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
});

export default mapSlice.reducer;
