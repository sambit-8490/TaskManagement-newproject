import api from "../../services/api";
import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from "./taskTypes";

// Get tasks with query params
export const fetchTasks =
  (page = 1, search = "", status = "", sort = "createdAt") =>
  async (dispatch) => {
    try {
      dispatch({ type: TASK_REQUEST });

      const res = await api.get(
        `/tasks?page=${page}&search=${search}&status=${status}&sort=${sort}`
      );

      dispatch({
        type: TASK_SUCCESS,
        payload: {
          tasks: res.data.tasks,
          totalPages: res.data.pagination.totalPages,
          currentPage: res.data.pagination.page,
        },
      });
    } catch (error) {
      dispatch({
        type: TASK_FAIL,
        payload: error.response?.data?.message || "Failed to fetch tasks",
      });
    }
  };

export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: TASK_REQUEST });

    const res = await api.post("/tasks", taskData);
    dispatch(fetchTasks());
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload: "Failed to create task",
    });
  }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    dispatch({ type: TASK_REQUEST });

    const res = await api.put(`/tasks/${id}`, taskData);

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload: "Failed to update task",
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_REQUEST });

    await api.delete(`/tasks/${id}`);

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload: "Failed to delete task",
    });
  }
};
