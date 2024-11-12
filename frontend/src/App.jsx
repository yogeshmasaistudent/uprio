import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskFormModal from "./components/TaskFormModal";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const createTask = async (task) => {
    await axios.post("http://localhost:5000/api/tasks", task);
    toast.success("Task created!");
    fetchTasks();
  };

  const updateTask = async (task) => {
    await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, task);
    toast.success("Task updated!");
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    toast.error("Task deleted!");
    fetchTasks();
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Todo App
      </h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-green-700 transition"
      >
        Add New Task
      </button>
      <TaskFormModal
        task={editingTask}
        isOpen={modalOpen || !!editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? updateTask : createTask}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        moveTask={moveTask}
      />
    </div>
  );
};

export default App;
