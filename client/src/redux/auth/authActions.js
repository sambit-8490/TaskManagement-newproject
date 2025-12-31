import api from "../../services/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_FAIL,
} from "./authTypes";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });

    await api.post("/auth/register", userData);

    dispatch({ type: AUTH_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response?.data?.message || "Registration failed"
    });
  }
};


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const res = await api.post("/auth/login", {
      email,
      password
    });

    const { token, name } = res.data.data;

    localStorage.setItem("token", token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: name
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response?.data?.message || "Login failed"
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
