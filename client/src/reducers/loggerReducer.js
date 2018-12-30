import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

// Actions
import { LOGGED_IN, LOGGED_OUT } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USERS -----------------
  // User token status
  token: false,

  // User role
  role: null
};

const loggedInReducer = (state = INITIAL_STATE, action) => {
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

    case LOGGED_OUT: {
      // Remove token from the browser
      cookie.remove("token");

      // Reset the state
      return Object.assign({}, state, {
        token: false,
        role: null
      });
    }

    default: {
      return state;
    }
  }
};

export default loggedInReducer;
