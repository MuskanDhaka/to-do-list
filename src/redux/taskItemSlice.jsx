import { createSlice } from "@reduxjs/toolkit";

const taskItemSlice = createSlice({
  name: "taskItem",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      console.log("Payload:", action.payload);

      const { _id, title, description, status, priority, filter, isDeleted } =
        action.payload;

      if (!isDeleted) {
        state.tasks.push({
          id: _id,
          title,
          value: description,
          status: status || "pending",
          priority: priority || "medium",
          filter: filter || "visible",
          isCompleted: status === "completed",
        });
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        task.status = task.isCompleted ? "completed" : "pending";
      }
    },
    reorderTasks: (state, action) => {
      const { from, to } = action.payload;
      if (from === to) return;

      const updatedTasks = [...state.tasks];
      const [movedTask] = updatedTasks.splice(from, 1);
      updatedTasks.splice(to, 0, movedTask);

      state.tasks = updatedTasks;
    },
    clearTasks: (state) => {
      state.tasks.length = 0;
    },
  },
});

export default taskItemSlice.reducer;
export const { addTask, deleteTask, toggleTask, reorderTasks, clearTasks } =
  taskItemSlice.actions;
