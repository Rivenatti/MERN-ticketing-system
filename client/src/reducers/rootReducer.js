// Actions
import {
  INPUT_CHANGED,
  INPUT_FOCUSED,
  INPUT_BLUR,
  RESET_STATE,
  HANDLE_ERROR,
  SNACKBAR_CLOSE
} from "../actions/actions";

// Validation script
import validate from "../utils/inputValidation";

// On input focus and blur scripts (for error message display)
import onInputFocus from "../utils/onInputFocus";
import onInputBlur from "../utils/onInputBlur";

// Initial state
const INITIAL_STATE = {
  //----------------- USERS //-----------------
  // First name input
  firstNameInput: "",
  firstNameInputFocused: false,
  firstNameInputError: false,

  // Last name input
  lastNameInput: "",
  lastNameInputFocused: false,
  lastNameInputError: false,

  // Email input
  emailInput: "",
  emailInputFocused: false,
  emailInputError: false,

  // Password input
  passwordInput: "",
  passwordInputFocused: false,
  passwordInputError: false,

  // Confirm password input
  confirmPasswordInput: "",
  confirmPasswordInputFocused: false,
  confirmPasswordInputError: false,

  // Server errors:
  serverErrors: [],

  // Snackbar for server errors:
  snackbarOpen: true
};

// Root reducer
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // After component switch reset state
    case RESET_STATE: {
      return Object.assign({}, state, { ...INITIAL_STATE });
    }

    // Form input focused
    case INPUT_FOCUSED: {
      return onInputFocus(state, action.name);
    }

    // Form input blur
    case INPUT_BLUR: {
      return onInputBlur(state, action.name);
    }

    // On login/register form input change handler with validation
    case INPUT_CHANGED: {
      return validate(state, action.name, action.value);
    }

    // On server error set it in the state
    case HANDLE_ERROR: {
      return Object.assign({}, state, {
        ...state.serverErrors,
        serverErrors: action.message
      });
    }

    case SNACKBAR_CLOSE: {
      return Object.assign({}, state, {
        snackbarOpen: false,
        serverErrors: []
      });
    }

    default: {
      return state;
    }
  }
};

export default rootReducer;
