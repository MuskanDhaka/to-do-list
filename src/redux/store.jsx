import taskItemsReducer from "./taskItemSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    taskItems: taskItemsReducer,
  },
});

export default store;
