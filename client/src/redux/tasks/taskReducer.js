import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS
} from "./taskTypes";

const initialState = {
  loading: false,
  tasks: [],
  totalPages: 1,
  currentPage: 1,
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return { ...state, loading: true, error: null };

    case TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [action.payload, ...state.tasks]
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? action.payload
            : task
        )
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(
          (task) => task._id !== action.payload
        )
      };

    case TASK_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
