// Regular expressions
const usernameRegEx = RegExp(/^[a-zA-Z0-9_-]{4,16}$/);
const emailRegEx = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const passwordRegEx = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
);

// Validation
export default function validate(state, name, value) {
  switch (name) {
    // -------------------- FIRSTNAME INPUT VALIDATION --------------------
    case "firstNameInput": {
      if (usernameRegEx.test(value)) {
        return Object.assign({}, state, {
          [name]: value,
          firstNameInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          firstNameInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          firstNameInputError: true
        });
      }
    }
    // -------------------- LASTNAME INPUT VALIDATION --------------------
    case "lastNameInput": {
      if (usernameRegEx.test(value)) {
        return Object.assign({}, state, {
          [name]: value,
          lastNameInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          lastNameInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          lastNameInputError: true
        });
      }
    }

    // -------------------- EMAIL INPUT VALIDATION --------------------
    case "emailInput": {
      if (emailRegEx.test(value)) {
        return Object.assign({}, state, {
          [name]: value,
          emailInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          emailInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          emailInputError: true
        });
      }
    }

    // -------------------- PASSWORD INPUT VALIDATION --------------------
    case "passwordInput": {
      // Clear confirm password input
      state.confirmPasswordInput = "";
      state.confirmPasswordInputError = false;

      if (passwordRegEx.test(value)) {
        return Object.assign({}, state, {
          [name]: value,
          passwordInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          passwordInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          passwordInputError: true
        });
      }
    }

    // -------------------- CONFIRM PASSWORD INPUT VALIDATION --------------------
    case "confirmPasswordInput": {
      if (value === state.passwordInput) {
        return Object.assign({}, state, {
          [name]: value,
          confirmPasswordInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          confirmPasswordInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          confirmPasswordInputError: true
        });
      }
    }

    default: {
      return null;
    }
  }
}
