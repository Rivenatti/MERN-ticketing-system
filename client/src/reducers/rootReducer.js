import { combineReducers } from "redux";
import loginAndRegisterReducer from "./loginAndRegisterReducer";
import loggerReducer from "./loggerReducer";

// Actions
import { RESET_STATE } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USERS -----------------
  // User token status
  token: false,

  // User role
  role: null
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
  loggerReducer
});
