export default function onInputFocus(state, name) {
  switch (name) {
    case "firstNameInput": {
      return Object.assign({}, state, { firstNameInputFocused: true });
    }

    case "lastNameInput": {
      return Object.assign({}, state, { lastNameInputFocused: true });
    }

    case "emailInput": {
      return Object.assign({}, state, { emailInputFocused: true });
    }

    case "passwordInput": {
      return Object.assign({}, state, { passwordInputFocused: true });
    }

    case "confirmPasswordInput": {
      return Object.assign({}, state, { confirmPasswordInputFocused: true });
    }

    default:
      return null;
  }
}
