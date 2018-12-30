import jwt_decode from "jwt-decode";

// Actions
import { LOGGED_IN } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USERS -----------------
  // User token status
  token: false,

  // User role
  role: "user"
};

const loginAndRegisterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // After user logs in, set the token state, user role and remove errors if any
    case LOGGED_IN: {
      const decoded = jwt_decode(action.token);
      return Object.assign({}, state, {
        token: true,
        role: decoded.role,
        serverErrors: []
      });
    }

    default: {
      return state;
    }
  }
};

export default loginAndRegisterReducer;
