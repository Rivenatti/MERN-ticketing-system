export default function onInputFocus(state, name) {
  switch (name) {
    case "usernameInput": {
      return Object.assign({}, state, { usernameInputFocused: true });
    }
    case "emailInput": {
      return Object.assign({}, state, { emailInputFocused: true });
    }

    case "passwordInput": {
      return Object.assign({}, state, { passwordInputFocused: true });
    }

    default:
      return null;
  }
}
