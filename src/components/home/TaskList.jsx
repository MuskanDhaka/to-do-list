import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, reorderTasks } from "@redux/taskItemSlice";
import { BsRecycle } from "react-icons/bs";
import { IoMdArchive } from "react-icons/io";
import { toast } from "sonner";

const SortableTaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
const handleCompletedTask = async ({id,status}) => {
  try{
    console.log("hello");
    const response = await toggleTask(id,status);
    if(response.data.success){
      toast.success("Task updated successfully");
    }
    


    
  }catch(error){
    console.log("Error in fetching data: ", error);
    toast.error("Failed to fetch data");
  }
}
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        textDecoration: task.isCompleted ? "line-through" : "none",
        background: task.isCompleted
          ? "rgba(161, 28, 155, 0.5)"
          : "rgba(6, 14, 92, 0.2)",
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        cursor: "grab",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>{task.title}</h3>
      <span>{task.value}</span>

      <div>
        <select selected={task.priority || "medium"}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTask(task.id)); 
          }}
        >
          <MdDeleteOutline />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTask(task.id)); 
            handleCompletedTask(task.id,task.status);
          }}
        >
          <IoMdDoneAll />
        </button>
        
        <button onClick={(e) => console.log("Event", e)}>
          <BsRecycle />
        </button>
        <button onClick={(e) => console.log("Event", e)}>
          <IoMdArchive />
        </button>
      </div>
    </li>
  );
};

// 🔹 Main Task List Component
const TaskList = () => {
  const taskItems = useSelector((store) => store.taskItems.tasks);
  const dispatch = useDispatch();

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = taskItems.findIndex((task) => task.id === active.id);
    const newIndex = taskItems.findIndex((task) => task.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch(reorderTasks({ from: oldIndex, to: newIndex }));
    }
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {taskItems.length === 0 ? <h2>Add tasks</h2> : null}
      <div className="tasks-div">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={taskItems.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {taskItems.map((task) => (
                <SortableTaskItem key={task.id} task={task} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default TaskList;
