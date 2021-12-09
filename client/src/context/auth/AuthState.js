import { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    // If there is a token in local storage it will be set as the token in the request
    if (localStorage.token) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("http://localhost:5000/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users",
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        // If registration is successful. We will receive a token in the payload
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        // The error will come from the server. It will tell us if email is already in use, it is a bad request, or
        // anything like that
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    // These are the headers of the request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // We send a request to the server and wait for the response
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth",
        formData,
        config
      );
      // Once the response is there, we execute the action in our state
      dispatch({
        type: LOGIN_SUCCESS,
        // If login is successful. We will receive a token in the payload
        // We send it to the dispatcher and it will handle it
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        // The error will come from the server. It will tell us if email is already in use, it is a bad request, or
        // anything like that
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => console.log("logout");

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
