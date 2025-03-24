import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { MdArchive } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { VscTasklist } from "react-icons/vsc";
import { BiTask, BiTaskX } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { addTask, clearTasks } from "@redux/taskItemSlice";
import { createTask, getTask, getPendingTask } from "../../api/todoService";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [heading, setHeading] = useState("");

  // Fetch all tasks on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch all tasks
  const fetchData = async () => {
    try {
      const data = await getTask();
      if (Array.isArray(data) && data.length > 0) {
        dispatch(clearTasks());
        data.forEach((task) => dispatch(addTask(task)));
      } else {
        dispatch(clearTasks());
        toast.info("No tasks found.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  // Insert a new task
  const handleInsertTask = async () => {
    if (!task.trim() || !heading.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    await createTask({ title: heading, description: task, dispatch, addTask });
    setHeading("");
    setTask("");
    fetchData(); // Refresh task list
  };

  // Fetch completed tasks
  const getCompletedTask = async () => {
    try {
      const data = await getTask();
      if (Array.isArray(data)) {
        const completedTasks = data.filter((task) => task.status === "completed");
        dispatch(clearTasks());
        completedTasks.forEach((task) => dispatch(addTask(task)));
      } else {
        dispatch(clearTasks());
        toast.info("No completed tasks found.");
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      toast.error("Failed to fetch completed tasks");
    }
  };

  // Fetch pending tasks
  const handlePendingTask = async () => {
    try {
      const data = await getPendingTask();
      if (Array.isArray(data) && data.length > 0) {
        dispatch(clearTasks());
        data.forEach((task) => dispatch(addTask(task)));
      } else {
        dispatch(clearTasks());
        toast.info("No pending tasks found.");
      }
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
      toast.error("Failed to fetch pending tasks");
    }
  };

  // Fetch archived tasks (if API supports it)
  const getArchivedTask = async () => {
    try {
      const data = await getTask();
      if (Array.isArray(data)) {
        const archivedTasks = data.filter((task) => task.status === "archived");
        dispatch(clearTasks());
        archivedTasks.forEach((task) => dispatch(addTask(task)));
      } else {
        dispatch(clearTasks());
        toast.info("No archived tasks found.");
      }
    } catch (error) {
      console.error("Error fetching archived tasks:", error);
      toast.error("Failed to fetch archived tasks");
    }
  };

  // Fetch hidden tasks (assuming `hidden` is a status or filter)
  const getHiddenTask = async () => {
    try {
      const data = await getTask();
      if (Array.isArray(data)) {
        const hiddenTasks = data.filter((task) => task.status === "hidden");
        dispatch(clearTasks());
        hiddenTasks.forEach((task) => dispatch(addTask(task)));
      } else {
        dispatch(clearTasks());
        toast.info("No hidden tasks found.");
      }
    } catch (error) {
      console.error("Error fetching hidden tasks:", error);
      toast.error("Failed to fetch hidden tasks");
    }
  };

  // Fetch all active tasks (refresh the full list)
  const getActiveTask = () => {
    fetchData();
  };

  return (
    <div className="task-input">
      <Toaster position="top-center" />
      
      <input
        type="text"
        className="title"
        placeholder="Add a title..."
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="task-button" onClick={handleInsertTask}>
        <MdOutlinePlaylistAdd />
      </button>
      <button className="task-button" onClick={getActiveTask}>
        <VscTasklist />
      </button>
      <button className="task-button" onClick={getCompletedTask}>
        <BiTask />
      </button>
      <button className="task-button" onClick={handlePendingTask}>
        <BiTaskX />
      </button>
      <button className="task-button" onClick={getArchivedTask}>
        <MdArchive />
      </button>
      <button className="task-button" onClick={getHiddenTask}>
        <BiSolidHide />
      </button>
    </div>
  );
};

export default TaskInput;
