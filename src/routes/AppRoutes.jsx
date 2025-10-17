import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TaskList from "../pages/TaskList";
import TaskForm from "../pages/TaskForm";
import TaskLayout from "../components/TaskLayout";

const AppRoutes = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated === true ? (
            <Navigate to="/tasks" replace />
          ) : (
            <Navigate to="/signup" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated === true ? <Navigate to="/tasks" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated == true ? (
            <Navigate to="/tasks" replace />
          ) : (
            <Signup />
          )
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated ? <TaskLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="tasks" element={<TaskList />} />
        <Route path="add" element={<TaskForm />} />
        <Route path="edit/:id" element={<TaskForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
