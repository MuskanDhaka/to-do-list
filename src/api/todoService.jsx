import axiosInstance from "./apiClient";
import { toast } from "sonner";

export const createTask = async ({ title, description, dispatch, addTask }) => {
  try {
    const response = await axiosInstance.post("/todo", {
      title,
      description,
    });
    if (response.data.success) {
      dispatch(addTask(response.data.data));
      toast.success("Task added successfully");
    } else {
      toast.error("Failed to add task");
    }
  } catch (error) {
    console.log("Error in adding task: ", error);
    toast.error("Failed to add task");
  }
};

export const getTask = async () => {
  try {
    const response = await axiosInstance.get("/todo");
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Failed to fetch tasks");
    }
  } catch (error) {
    console.log("Error in fetching tasks : ", error);
    toast.error("Failed to fetch tasks");
  }
};


export const toggleTask = async ({ id, status }) => {
    try {
      const response = await axiosInstance.put(`/todo/${id}`, { status });
      if (response.data.success) {
        toast.success("Task updated successfully");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("Failed to update task",error);
    }
  };
  


