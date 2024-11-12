import React from "react";
import { useDrag, useDrop } from "react-dnd";

const TaskList = ({ tasks, onEdit, onDelete, moveTask }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task, index) => (
        <DraggableTask
          key={task._id}
          task={task}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

const DraggableTask = ({ task, index, onEdit, onDelete, moveTask }) => {
  const [, ref] = useDrag({
    type: "TASK",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const refDrop = (node) => ref(drop(node));

  return (
    <div
      ref={refDrop}
      className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl border-l-4 border-blue-500 transition"
    >
      <h3 className="text-2xl font-semibold text-gray-800">{task.title}</h3>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <p className="text-gray-500 mt-2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="mt-2">
        <span
          className={`${
            task.isCompleted ? "text-green-600" : "text-red-500"
          } font-semibold`}
        >
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;
