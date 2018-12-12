// Regular expressions
const usernameRegEx = RegExp(/^[a-zA-Z0-9_-]{4,16}$/);
const emailRegEx = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const passwordRegEx = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
);

// Validation
export default function validate(state, name, value) {
  switch (name) {
    // -------------------- USERNAME INPUT VALIDATION --------------------
    case "usernameInput": {
      if (usernameRegEx.test(value)) {
        return Object.assign({}, state, {
          [name]: value,
          usernameInputError: false
        });
      } else if (value === "") {
        return Object.assign({}, state, {
          [name]: value,
          usernameInputError: false
        });
      } else {
        return Object.assign({}, state, {
          [name]: value,
          usernameInputError: true
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

    default: {
      return null;
    }
  }
}
