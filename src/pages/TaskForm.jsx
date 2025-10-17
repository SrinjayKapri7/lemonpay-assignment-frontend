import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask, updateTask, fetchTasks } from "../api/task";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await fetchTasks();
          const task = response.data.find((t) => t._id === id);
          if (task) {
            setTaskName(task.taskName);
            setDescription(task.description);
            setDueDate(new Date(task.dueDate));
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) {
      setError("Task name and due date are required.");
      return;
    }
    const taskData = { taskName, description, dueDate };
    try {
      if (id) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save task");
    }
  };

  if (!isAuthenticated) {
    return <p>Unauthorized Access.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl mb-4 font-semibold flex justify-center">
        {id ? "Edit Task" : "Add Task"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Task Name"
          className="w-full border p-2 rounded"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full border p-2 rounded"
          placeholderText="Select date and time"
          required
        />

        <div className="flex flex-col items-center mt-4 space-y-3">
          <button
            type="submit"
            className="bg-[rgba(30,59,163,1)] text-white py-2 rounded-2xl w-full md:w-40"
          >
            {id ? "Update Task" : "Save"}
          </button>

          <button
            type="button"
            className="text-black py-2 rounded w-full md:w-40"
            onClick={() => {
              navigate("/tasks");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
