import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import peopleReducer from "./people";

export const history = createBrowserHistory();

const initialState = {};

const appReducer = (state = initialState, action) => {
  return state;
};

const rootReducer = combineReducers({
  app: appReducer,
  people: peopleReducer,
  router: connectRouter(history),
});

export default rootReducer;
