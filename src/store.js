import { applyMiddleware, compose, createStore } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";

import client from "./apollo";
import createHistory from "history/createBrowserHistory";
import localForage from "localforage";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

export const history = createHistory();

const initialState = {};
const enhancers = [autoRehydrate()];
const middleware = [
  logger,
  thunk,
  client.middleware(),
  routerMiddleware(history)
];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);
persistStore(store, {
  storage: localForage,
  whitelist: ["auth", "search"]
});
export default store;
