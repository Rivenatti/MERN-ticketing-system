// Actions
import {
  INPUT_CHANGED,
  INPUT_FOCUSED,
  INPUT_BLUR,
  RESET_STATE
} from "../actions/actions";

// Validation script
import validate from "../utils/inputValidation";

// On input focus and blur scripts (for error message display)
import onInputFocus from "../utils/onInputFocus";
import onInputBlur from "../utils/onInputBlur";

// Initial state
const INITIAL_STATE = {
  // Email input
  usernameInput: "",
  usernameInputFocused: false,
  usernameInputError: false,

  // Email input
  emailInput: "",
  emailInputFocused: false,
  emailInputError: false,

  // Password input
  passwordInput: "",
  passwordInputFocused: false,
  passwordInputError: false,

  // Server error:
  serverError: false
};

// Root reducer
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_STATE: {
      return Object.assign({}, state, { ...INITIAL_STATE });
    }

    case INPUT_FOCUSED: {
      return onInputFocus(state, action.name);
    }

    case INPUT_BLUR: {
      return onInputBlur(state, action.name);
    }

    // On login/register form input change handler with validation
    case INPUT_CHANGED: {
      return validate(state, action.name, action.value);
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
