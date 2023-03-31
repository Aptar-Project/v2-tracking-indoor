import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import mapReducer from "./features/map/mapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
  },
});
