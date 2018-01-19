import adminCollectionsReducer from "./adminCollectionsReducer";
import adminImagesReducer from "./adminImagesReducer";
import apolloClient from "../apollo";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import counter from "./counter";
import { reducer as formReducer } from "redux-form";
import planteReducer from "./planteReducer";
import { routerReducer } from "react-router-redux";
import searchReducer from "./searchReducer";

export default combineReducers({
  routing: routerReducer,
  counter: counter,
  auth: authReducer,
  form: formReducer,
  search: searchReducer,
  plante: planteReducer,
  adminCollections: adminCollectionsReducer,
  adminImages: adminImagesReducer,
  apollo: apolloClient.reducer()
});
