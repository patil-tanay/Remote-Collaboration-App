import ApiError from "../Utils/apiError.js";
import ApiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { Task } from "../Models/task.js";

const getAllTasks = asyncHandler(async (req, res) => {
  const { team_Id } = req.params;
  const tasks = await Task.find({ team_Id });

  if (!tasks) {
    throw new ApiError(404, "No tasks found");
  }
  return res.status(200).json(new ApiResponse(200, "Tasks found", tasks));
});

const createTask = asyncHandler(async (req, res) => {
  const { team_Id } = req.query;
  const {
    title,
    description,
    label,
    priority,
    status,
    assignee,
    startDate,
    dueDate,
  } = req.body;

  const task = await Task.create({
    team_Id,
    author: req.user._id,
    title,
    description,
    label,
    priority,
    status,
    assignee,
    startDate,
    dueDate,
  });

  console.log(task);

  return res.status(201).json(new ApiResponse(201, "Task created", task));
});

const updateTask = asyncHandler(async (req, res) => {
  const { task_Id } = req.query;
  const {
    title,
    description,
    status,
    priority,
    label,
    startDate,
    dueDate,
    assignee,
  } = req.body;

  const taskToUpdate = await Task.findById(task_Id);
  if (!taskToUpdate) {
    throw new ApiError(404, "The Task you are trying to update doesn't exist.");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    task_Id,
    {
      title,
      description,
      status,
      priority,
      label,
      startDate,
      dueDate,
      assignee,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated", updatedTask));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { task_Id } = req.query;
  const taskToDelete = await Task.findById(task_Id);

  if (!taskToDelete) {
    throw new ApiError(404, "The Task you are trying to delete doesn't exist.");
  }

  await Task.findByIdAndDelete(task_Id);

  return res.status(200).json(new ApiResponse(200, "Task deleted"));
});

export { getAllTasks, createTask, updateTask, deleteTask };
