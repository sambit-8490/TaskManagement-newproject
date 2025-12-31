import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasks/taskActions";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    tasks = [],
    loading,
    error,
    totalPages = 1,
    currentPage = 1
  } = useSelector((state) => state.tasks);

  // UI states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks
  useEffect(() => {
    dispatch(fetchTasks(page, search, status, sort));
  }, [dispatch, page, search, status, sort]);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>My Tasks</h2>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
          </select>
        </div>

        {/* Add Task */}
        <TaskForm onSuccess={() => dispatch(fetchTasks(page))} />

        {/* Loading / Error */}
        {loading && <p className="loading">Loading tasks...</p>}
        {error && <p className="error">{error}</p>}

        {/* Task List */}
        {!loading && tasks.length === 0 && (
          <p className="empty">No tasks found</p>
        )}

        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              editingTaskId={editingTaskId}
              setEditingTaskId={setEditingTaskId}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
