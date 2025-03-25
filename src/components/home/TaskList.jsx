import { toast } from "sonner";
import { IoMdArchive } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { removeTask, updateTask, archiveTask } from "../../api/todoService";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "@redux/taskItemSlice";
import { BiSolidHide } from "react-icons/bi";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async (id) => {
    try {
      const msg = await removeTask({ id });
      if (msg) {
        dispatch(deleteTask(id));
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleCompletedTask = async (id, status) => {
    try {
      // console.log("id:", id);
      // console.log("status before toggle:", status);
      const updatedStatus = status === "completed" ? "pending" : "completed";

      const msg = updateTask({ id, status: updatedStatus });
      if (msg) {
        dispatch(toggleTask(id));
        toast.success("Task status updated successfully");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleArchiveTask = async (id) => {
    console.log("Archive clicked");
    try {
      const msg = await archiveTask({ id, filter: "archive" });
      if (msg) {
        dispatch(deleteTask(id));
        toast.success("Task archived successfully");
      }
    } catch (error) {
      console.error("Error archive task:", error);
      toast.error("Failed to archive task");
    }
  };

  const handleHiddenTask = async (id) => {
    console.log("Hide clicked");
    try{
      const msg = await archiveTask({id,filter:"hidden"});
      if(msg){
        dispatch(deleteTask(id));
        toast.success("Task hidden successfully");
      } 
    } catch(error) {
      console.error("Error hiding task:", error);
      toast.error("Failed to hide task");
    }

  }


  return (
    <li
      style={{
        textDecoration: task.isCompleted ? "line-through" : "none",
        background: task.isCompleted
          ? "rgba(161, 28, 155, 0.5)"
          : "rgba(6, 14, 92, 0.2)",
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>{task.title}</h3>
      <span>{task.value}</span>

      <div>
        <select
          defaultValue={task.priority || "medium"}
          style={{
            padding: "5px",
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            background: "rgba(6, 14, 92, 0.2)",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            ":hover": {
              background: "rgba(6, 14, 92, 0.5)",
            },
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={() => handleDeleteTask(task.id)}>
          <MdDeleteOutline />
        </button>

        <button onClick={() => handleCompletedTask(task.id, task.status)}>
          <IoMdDoneAll />
        </button>
        <button onClick={() => handleArchiveTask(task.id)}>
          <IoMdArchive />
        </button>
        <button onClick={() => handleHiddenTask(task.id)}>
          <BiSolidHide />
        </button>
      </div>
    </li>
  );
};

const TaskList = () => {
  const taskItems = useSelector((store) => store.taskItems.tasks);

  return (
    <div
      className="task-list-container"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <h2>Task List</h2>
      {taskItems.length === 0 ? <h2>Add tasks</h2> : null}
      <div style={{ overflowY: "auto", maxHeight: "300px" }}>
        <ul>
          {taskItems
            .filter((task) => task.filter === "visible" || task.filter === "archive" || task.filter === "hidden") 
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
