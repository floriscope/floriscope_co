import authService from "../services/authService";

const initialState = {
  isLoginIn: false,
  isAuthenticated: false,
  user: {},
  authToken: undefined,
  redirectToReferrer: false
};

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
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
        isAuthenticated: true,
        isLoginIn: false,
        redirectToReferrer: true
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

// actionCreators

export function login(credentials) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "auth/TRY_LOGIN", user });
      const user = await authService.login(credentials);
      dispatch({ type: "auth/LOGIN_IN", user });
      console.log("fetched user", user);
    } catch (error) {
      console.error(error);
    }
  };
}

// NEW SYNTAX - ARROW FN
export const logout = () => dispatch => {
  dispatch({
    type: "auth/LOG_OUT"
  });
};

// Actions
export const TRY_LOGIN = "auth/TRY_LOGIN";
export const LOGIN_IN = "auth/LOGIN_IN";
export const LOG_OUT = "auth/LOG_OUT";
