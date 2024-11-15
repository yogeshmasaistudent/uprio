import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskFormModal from "./components/TaskFormModal";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all"); 

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks(); 
  }, [tasks, filter]);

  const fetchTasks = async () => {
    const res = await axios.get("https://uprio-4otg.onrender.com/api/tasks");
    setTasks(res.data);
  };

  const filterTasks = () => {
    if (filter === "all") {
      setFilteredTasks(tasks);
    } else {
      const isCompleted = filter === "completed";
      setFilteredTasks(
        tasks.filter((task) => task.isCompleted === isCompleted)
      );
    }
  };

  const createTask = async (task) => {
    await axios.post("https://uprio-4otg.onrender.com/api/tasks", task);
    toast.success("Task created!");
    fetchTasks();
  };

  const updateTask = async (task) => {
    await axios.put(
      `https://uprio-4otg.onrender.com/api/tasks/${editingTask._id}`,
      task
    );
    toast.success("Task updated!");
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://uprio-4otg.onrender.com/api/tasks/${id}`);
    toast.error("Task deleted!");
    fetchTasks();
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...filteredTasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setFilteredTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Todo App
      </h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Add New Task
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
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
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
        moveTask={moveTask}
      />
    </div>
  );
};

export default App;
