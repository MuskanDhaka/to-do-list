import { v4 as taskId } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const taskItemSlice = createSlice({
  name: "taskItem",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: taskId(),
        value: action.payload,
        isCompleted: false,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    reorderTasks: (state, action) => {
      const { from, to } = action.payload;
      const [movedTask] = state.tasks.splice(from, 1);
      state.tasks.splice(to, 0, movedTask);
    },
  },
});

export default taskItemSlice.reducer;
export const { addTask, deleteTask, toggleTask, reorderTasks } =
  taskItemSlice.actions;
