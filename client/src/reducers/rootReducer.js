import { combineReducers } from "redux";
import loginAndRegisterReducer from "./loginAndRegisterReducer";
import loggedInReducer from "./loggedInReducer";

// Actions
import { RESET_STATE } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USERS -----------------
  // User token status
  token: false,

  // User role
  role: "user"
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // After component switch reset state
    case RESET_STATE: {
      return Object.assign({}, state, { ...INITIAL_STATE });
    }
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer,
  loginAndRegisterReducer,
  loggedInReducer
});
