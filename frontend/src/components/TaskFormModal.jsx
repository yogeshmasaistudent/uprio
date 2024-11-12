import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TaskFormModal = ({ task, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, isCompleted };
    onSave(taskData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close Modal"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {task ? "Edit Task" : "New Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 p-3 w-full border border-gray-300 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 p-3 w-full border border-gray-300 rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mb-4 p-3 w-full border border-gray-300 rounded"
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Completed</label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-600 transition"
          >
            Save Task
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
