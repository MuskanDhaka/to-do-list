import { useState } from "react";
import { Toaster, toast } from "sonner";
import { IoIosAdd } from "react-icons/io";
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
        <IoIosAdd />
      </button>
    </div>
  );
};

export default TaskInput;
