import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

// Sign in api request
const login = (dispatch, email, password, history) => {
  axios
    .post("/login", {
      email: email,
      password: password
    })
    .then(result => {
      alert("logged in");
    })
    .catch(error =>
      // Set the errors in the store
      dispatch({ type: HANDLE_ERROR, message: error.response.data.message })
    );
};

export default { login };
