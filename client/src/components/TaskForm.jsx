import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/tasks/taskActions";
import "./TaskForm.css";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title) return;

    dispatch(createTask({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={submitHandler}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
