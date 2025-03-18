import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTask, toggleTask } from "../redux/taskItemSlice";
import { useSelector, useDispatch } from "react-redux";
import { SortableContext,verticalListSortingStrategy,arrayMove } from "@dnd-kit/sortable";
import { DndContext,closestCenter,useSensor,useSensors,PointerSensor,KeyboardSensor } from "@dnd-kit/core";
import SortableTaskItem from "./SortableTaskItem";

const TaskList = () => {
  const taskItems = useSelector((store) => store.taskItems.tasks);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const removeTask = (id) => {
    dispatch(deleteTask(id));
  };
  const isTaskDone = (id) => {
    dispatch(toggleTask(id));
  };

  return (
    <div className=" task-list-container">
      <h2>Task list</h2>
      {taskItems.length === 0 ? <h2>Add tasks</h2> : null}
        <div className="tasks-div">
      <ul>
        {taskItems.map((task) => {
          return (
            <li
              key={task.id}
              draggable="true"
              style={{
                textDecoration: task.isCompleted ? "Line-through" : "none",
                background: !task.isCompleted
                  ? "rgba(6, 14, 92, 0.2)"
                  : "rgba(161, 28, 155, 0.5)",
              }}
            >
              {task.value}
              <div>
                <button
                  onClick={() => {
                    removeTask(task.id);
                  }}
                >
                  <MdDeleteOutline />
                </button>
                <button
                  onClick={() => {
                    isTaskDone(task.id);
                  }}
                >
                  <IoMdDoneAll />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
};

export default TaskList;
