// TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmVhNDQ4ZGJjYzAxODU3ODQwM2JjMiIsImVtYWlsIjoicmFrZXNoMTJAZ21haWwuY29tIiwibmFtZSI6InJha2VzaCBUeWFnaSIsImlhdCI6MTcxNDMzNDAzMSwiZXhwIjoxNzE0NDIwNDMxfQ.8Ybvs715zc8nlmKlbJIOMa4yr1AgpKekZrMnuLfvtr4";
  const team_Id = "662ea71b4d7a19a196ef8c3e";
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/task/getAllTasks?team_Id=${team_Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data.tasks);
        setError("");
      } catch (err) {
        setError("Error fetching tasks");
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  });

  return (
    <div className="task-list">
      <h2>All Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Assignee: {task.assignee}</p>
            {/* Add other task details as needed */}
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};
export default TaskList;
