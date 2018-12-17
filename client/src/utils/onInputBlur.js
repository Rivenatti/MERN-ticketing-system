export default function onInputBlur(state, name) {
  switch (name) {
    case "firstNameInput": {
      return Object.assign({}, state, { firstNameInputFocused: false });
    }

    case "lastNameInput": {
      return Object.assign({}, state, { lastNameInputFocused: false });
    }

    case "emailInput": {
      return Object.assign({}, state, { emailInputFocused: false });
    }

    case "passwordInput": {
      return Object.assign({}, state, { passwordInputFocused: false });
    }

    case "confirmPasswordInput": {
      return Object.assign({}, state, { confirmPasswordInputFocused: false });
    }

    default:
      return null;
  }
}
