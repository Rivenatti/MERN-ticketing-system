import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import cookie from "react-cookies";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

import { LOGGED_IN } from "./actions/actions";

// Create redux store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// Check for cookies on page reload in the browser
let token = cookie.load("token");
if (token) {
  // Set authorization header
  axios.defaults.headers.common.authorization = `Bearer ${token}`;

  // Set user information
  store.dispatch({ type: LOGGED_IN, token });
}

// If token expired remove authorization header from the browser
else {
  delete axios.defaults.headers.common.authorization;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
