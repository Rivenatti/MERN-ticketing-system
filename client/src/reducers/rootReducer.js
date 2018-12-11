// Actions
import { ACTION } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  input: ""
};

// Root reducer
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Action
    case ACTION: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
