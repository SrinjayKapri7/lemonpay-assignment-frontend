import React, { useState, useEffect, useContext } from "react";
import { fetchTasks, deleteTask } from "../api/task";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

 
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  if (!isAuthenticated) {
    return <p>Unauthorized Access.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 md:ms-[50px]">
        <h1 className="text-3xl font-bold font-nunito text-[rgba(30,59,163,1)] md:mt-5">
          Tasks Management
        </h1>
      </div>

      <div className="flex justify-end items-center mb-4 md:me-[150px]">
        <button
          className="bg-[rgba(30,59,163,1)] text-white px-4 py-2 rounded-2xl flex items-center space-x-2"
          onClick={() => navigate("/add")}
        >
          <FaPlus />
          Add Task
        </button>
      </div>
      
      <table className="mx-auto w-fit md:w-[1400px] border-collapse border border-gray-300 ">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Task Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Due Date & Time
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-600">
                No tasks found.
              </td>
            </tr>
          ) : (
            currentTasks.map((task) => (
              <tr key={task._id} className="bg-white border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {task.taskName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(task.dueDate).toLocaleDateString()}{" "}
                  {new Date(task.dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/edit/${task._id}`)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
       <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &#171; 
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &#8249; 
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &#8250; 
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &#187;
        </button>
      </div>
    </div>
  );
};

export default TaskList;
