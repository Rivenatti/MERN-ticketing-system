import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";
import cookie from "react-cookies";

// Sign in api request
const login = (dispatch, email, password, history) => {
  axios
    .post(
      "/login",
      {
        email: email,
        password: password
      },
      {
        withCredentials: true
      }
    )
    .then(result => {
      // Cookie expiration date (in miliseconds)
      let expires = new Date();
      expires.setTime(expires.getTime() + 60 * 60 * 1000);

      cookie.save("token", result.data.token, { expires });
    })
    .catch(error =>
      // Set the errors in the store
      dispatch({ type: HANDLE_ERROR, message: error.response.data.message })
    );
};

export default { login };
