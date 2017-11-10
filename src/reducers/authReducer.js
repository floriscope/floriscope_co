import authService from "../services/authService";

const initialState = {
  isLoginIn: false,
  isAuthenticated: false,
  user: {},
  authToken: undefined,
  authentificationFailed: false,
  errorMessage: "",
  redirectToReferrer: false
};

/* REDUCERS */

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        authentificationFailed: false,
        errorMessage: ""
      };
    case TRY_LOGIN:
      return {
        ...state,
        isLoginIn: true
        // isAuthenticated: true, // NEED TO WORKOFFLINE (TEMP)
        // redirectToReferrer: true // NEED TO WORKOFFLINE (TEMP)
      };
    case LOGIN_IN:
      return {
        ...state,
        user: action.user,
        authToken: action.user.auth_token,
        isAuthenticated: true,
        isLoginIn: false,
        redirectToReferrer: true
      };
    case AUTHENTIFICATION_FAILED:
      return {
        ...state,
        authentificationFailed: true,
        errorMessage: action.error.message
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        authToken: undefined,
        redirectToReferrer: false
      };

    default:
      return state;
  }
};

/* actionCreators */

export function login(credentials) {
  return async (dispatch, getState) => {
    try {
      const response = await authService.login(credentials);
      dispatch({ type: "auth/TRY_LOGIN" });
      dispatch({ type: "auth/LOGIN_IN", user: response.user });
      dispatch({
        type: "auth/CLEAR_AUTH_ERRORS"
      });
      console.log("fetched user", response);
    } catch (error) {
      console.error(error);
      dispatch({
        type: "auth/AUTHENTIFICATION_FAILED",
        error
      });
    }
  };
}

// New actionCreator syntax
export const clearAuthErrors = () => dispatch => {
  dispatch({
    type: "auth/CLEAR_AUTH_ERRORS"
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: "auth/LOG_OUT"
  });
};

/* ACTIONS */
export const CLEAR_AUTH_ERRORS = "auth/CLEAR_AUTH_ERRORS";
export const TRY_LOGIN = "auth/TRY_LOGIN";
export const LOGIN_IN = "auth/LOGIN_IN";
export const AUTHENTIFICATION_FAILED = "auth/AUTHENTIFICATION_FAILED";
export const LOG_OUT = "auth/LOG_OUT";
