import { useState } from "react";
import { Toaster, toast } from "sonner";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BiTask, BiTaskX } from "react-icons/bi";

import { MdArchive } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { addTask } from "@redux/taskItemSlice";
//add task is action
const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch(); //useDispatch is to dispatch actions
  const insertTask = () => {
    console.log("Task : ", task);
    toast.success("task added successfully");
    dispatch(addTask(task));
    setTask("");
  };
  return (
    <div className="task-input">
      <Toaster position="top-center" />
      <input
        type="text"
        placeholder="Add a  task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="task-button" onClick={insertTask}>
        <MdOutlinePlaylistAdd />
      </button>
      <button
        className="task-button"
        onClick={() => toast.info("Task deleted")}
      >
        <BiTask />
      </button>
      <button
        className="task-button"
        onClick={() => toast.error("Task completed")}
      >
        <BiTaskX />
      </button>
      <button
        className="task-button"
        onClick={() => toast.warning("Task archived")}
      >
        <MdArchive />
      </button>
      <button
        className="task-button"
        onClick={() => toast.success("Task hidden")}
      >
        <BiSolidHide />
      </button>
    </div>
  );
};

export default TaskInput;
