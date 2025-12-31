import Task from "../models/task.model.js";

export const createTask = async (data, userId) => {
  return await Task.create({
    ...data,
    user: userId
  });
};

export const getTasks = async (query, userId) => {
  const {
    search,
    status,
    sort = "desc",
    page = 1,
    limit = 10
  } = query;

  const filter = { user: userId };

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const updateTask = async (taskId, userId, data) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });

  if (!task) {
    throw new Error("Task not found or unauthorized");
  }

  return task;
};
