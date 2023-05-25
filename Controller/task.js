import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Added Successfully",
  });
};

export const getMyTask = async (req, res, next) => {
  const userId = req.user._id;

  const task = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    task,
  });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if(!task) 
    return res.status(404).json({
        success:false,
        message:"invalid id",
    });
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.status(200).json({
    success: true,
    message: "task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if(!task) 
    return res.status(404).json({
        success:false,
        message:"invalid id",
    });
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "task deleted",
  });
};
