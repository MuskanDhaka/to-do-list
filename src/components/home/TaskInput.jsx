import { useState } from "react";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { MdArchive } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { addTask } from "@redux/taskItemSlice";
import { getTask } from "../../api/todoService";
import { VscTasklist } from "react-icons/vsc";
import { BiTask, BiTaskX } from "react-icons/bi";
import { clearTasks } from "@redux/taskItemSlice";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { createTask, getPendingTask } from "../../api/todoService";


const TaskInput = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [heading, setHeading] = useState("");

  // Function to insert a task
  const handleInsertTask = async () => {
    if (!task.trim() || !heading.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    await createTask({ title: heading, description: task, dispatch, addTask });
    setHeading("");
    setTask("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTask();
        console.log("Data: ", data);
        if (data) {
          dispatch(clearTasks());
          data.forEach((task) => {
            dispatch(addTask(task));
          });
        } else {
          dispatch(clearTasks());
        }
      } catch (error) {
        console.log("Error in fetching data: ", error);
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const getCompletedTask = async () => {
    // console.log("Task completed list clicked ...");
    try {
      const data = await getTask();
      // console.log("Data: ", data);
      if (data) {
        dispatch(clearTasks());
        data.forEach((task) => {
          if (task.status === "completed") {
            dispatch(addTask(task));
          }
        });
      } else {
        dispatch(clearTasks());
      }
    } catch (error) {
      console.log("Error in fetching data: ", error);
      toast.error("Failed to fetch data");
    }
  };

  const handlePendingTask = async () => {
    console.log("Task incompleted list clicked ...");
    const data = await getPendingTask();
    console.log("Pending tasks : ", data);
    if (data) {
      dispatch(clearTasks());
      data.forEach((task) => {
        dispatch(addTask(task));
      });
    } else {
      dispatch(clearTasks());
    }
  };

  const getArchivedTask = () => {
    console.log("Task archived list clicked ...");
  };

  const getHiddenTask = () => {
    console.log("Task hidden list clicked ...");
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
