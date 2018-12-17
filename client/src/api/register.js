import axios from "axios";

const register = (dispatch, firstName, lastName, email, password, history) => {
  axios
    .post("/register", {
      firstName,
      lastName,
      email,
      password,
      history
    })
    .then(res => {
      // Redirect user to sign in page after success
      history.push("/signin");
    })
    .catch(error => {
      console.log(error.response);
    });
};

export default { register };
