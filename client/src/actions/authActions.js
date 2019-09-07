import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from "../actions/types";

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //console.log("loading user");
  //user loading -> set isLOADING to TRUE
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
export const register = ({ name, email, password }) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //REquest body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAILED")
      );
      dispatch({
        type: REGISTER_FAILED
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//setup config/headers and token

export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;
  //headers
  const config = {
    headers: {
      "Conten-type": "application/json"
    }
  };
  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
