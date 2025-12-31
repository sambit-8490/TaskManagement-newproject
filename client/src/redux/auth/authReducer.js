import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_REQUEST,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_SUCCESS,
  AUTH_FAIL,
} from "./authTypes";
const token = localStorage.getItem("token");
const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: !!token,
  registerSuccess: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };

    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case AUTH_REGISTER_RESET:
      return {
        ...state,
        registerSuccess: false
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default authReducer;
