import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

// Actions
import { LOGGED_IN, LOGGED_OUT } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USER -----------------
  // User token status
  token: false,

  // User id
  userID: null,

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
        userID: decoded.userID,
        userName: `${decoded.firstName} ${decoded.lastName}`,
        email: decoded.email,
        accountCreated: decoded.created,
        role: decoded.role,
        serverErrors: []
      });
    }

    // After user logs out, remove cookie
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
