import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import mapReducer from "./features/map/mapSlice";
import legendReducer from "./features/legend/legendSlice";
import tagReducer from "./features/tag/tagSlice";
import sensorReducer from "./features/sensor/sensorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    legend: legendReducer,
    tag: tagReducer,
    sensor: sensorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
