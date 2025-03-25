import axiosInstance from "./apiClient";
import { toast } from "sonner";


//create Task API 
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


//get all tasks API 
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


//update task API 
export const updateTask = async ({ id, status }) => {
  try {
    const response = await axiosInstance.patch(`/todo/${id}`, { status });
    console.log("response", response);

    if (response.data.success) {
      // toast.success("Task updated successfully");
      return response.data.message;
    } else {
      toast.error("Failed to update task");
    }
  } catch (error) {
    toast.error("Failed to update task", error);
  }
};


//remove task API 
export const removeTask = async ({ id }) => {
  try {
    console.log("todoId: ", id);

    const response = await axiosInstance.delete(`/todo/${id}`, {
      todoId: id,
    });    
    if (response.data.success) {
      return response.data.message;
    } else {
      toast.error("Failed to delete task");
    }
  } catch (error) {
    toast.error("Failed to delete task", error);
  }
};



//get pending tasks API
export const getPendingTask = async () => {
  try {
    const response = await axiosInstance.get(
      `todo?status=pending&priority=medium`
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Failed to fetch pending tasks");
    }
  } catch (error) {
    console.log("Error in fetching pending tasks : ", error);
    toast.error("Failed to fetch pending tasks");
  }
};


//get archive task API 
export const archiveTask = async ({ id, filter }) => {
  try {
    const response = await axiosInstance.patch(`/todo/${id}`, { filter });
    if (response.data.success) {
      return response.data.message;
    } else {
      toast.error("Failed to archive task");
    }
  } catch (error) {
    toast.error("Failed to archive task", error);
  }                 
}
