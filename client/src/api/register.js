import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const register = (dispatch, firstName, lastName, email, password, history) => {
  axios
    .post("/register", {
      firstName,
      lastName,
      email,
      password
    })
    .then(result => {
      // Redirect user to login page after success
      history.push("/login");
    })
    .catch(error => {
      dispatch({ type: HANDLE_ERROR, message: error.response.data.message });
    });
};

export default { register };
