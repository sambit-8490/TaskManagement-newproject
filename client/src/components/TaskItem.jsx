import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../redux/tasks/taskActions";

const TaskItem = ({ task, editingTaskId, setEditingTaskId }) => {
  const dispatch = useDispatch();
  const isEditing = editingTaskId === task._id;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    if (isEditing) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [isEditing, task]);

  const handleSave = () => {
    dispatch(
      updateTask(task._id, {
        title,
        description,
        status
      })
    );
    setEditingTaskId(null);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingTaskId(null)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: <strong>{task.status}</strong></p>

          <button onClick={() => setEditingTaskId(task._id)}>
            Edit
          </button>
          <button onClick={() => dispatch(deleteTask(task._id))}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
