import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../services/task.service.js";

export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body, req.user._id);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const result = await getTasks(req.query, req.user._id);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
