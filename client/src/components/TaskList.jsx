import TaskItem from "./TaskItem";

const TaskList = ({ tasks, loading }) => {
  if (loading) return <p>Loading...</p>;
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
