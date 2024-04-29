// src/CreateTask.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./taskForm.css"; // Import CSS file for styling

const CreateTask = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmVhNDQ4ZGJjYzAxODU3ODQwM2JjMiIsImVtYWlsIjoicmFrZXNoMTJAZ21haWwuY29tIiwibmFtZSI6InJha2VzaCBUeWFnaSIsImlhdCI6MTcxNDMzNDAzMSwiZXhwIjoxNzE0NDIwNDMxfQ.8Ybvs715zc8nlmKlbJIOMa4yr1AgpKekZrMnuLfvtr4";
  const team_Id = "662ea71b4d7a19a196ef8c3e";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    label: "No Label",
    priority: "no_priority",
    status: "backlog",
    assignee: "", // This should be an ID of the user, you might want to add a select option to select the assignee
    startDate: new Date().toISOString().split("T")[0],
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if assignee is not empty
      const assigneeId = formData.assignee.trim()
        ? formData.assignee.trim()
        : null;

      const res = await axios.post(
        `http://localhost:5000/api/v1/task/createTask?team_Id=${team_Id}`,
        {
          ...formData,
          // Assign the assigneeId if it's not empty, otherwise null
          assignee: assigneeId,
          // Format startDate and dueDate to match MongoDB's expected format
          startDate: new Date(formData.startDate),
          dueDate: new Date(formData.dueDate),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      setError("");
      setFormData({
        title: "",
        description: "",
        label: "No Label",
        priority: "no_priority",
        status: "backlog",
        assignee: "662ea448dbcc018578403bc2",
        startDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="create-task-form">
        <h2>Create Task</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="label">
            <Form.Label>Label</Form.Label>
            <Form.Control
              as="select"
              name="label"
              value={formData.label}
              onChange={handleChange}
            >
              <option value="No Label">No Label</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Improvement">Improvement</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="no_priority">No Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="assignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              // You may replace this with a select dropdown to select the assignee
            />
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateTask;
