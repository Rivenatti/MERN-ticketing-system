export default function onInputBlur(state, name) {
  switch (name) {
    case "usernameInput": {
      return Object.assign({}, state, { usernameInputFocused: false });
    }

    case "emailInput": {
      return Object.assign({}, state, { emailInputFocused: false });
    }

    case "passwordInput": {
      return Object.assign({}, state, { passwordInputFocused: false });
    }

    default:
      return null;
  }
}
