import apolloClient from "../apollo";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import counter from "./counter";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  routing: routerReducer,
  counter: counter,
  auth: authReducer,
  form: formReducer,
  apollo: apolloClient.reducer()
});
