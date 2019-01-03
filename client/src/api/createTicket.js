import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const createTicket = (
  dispatch,
  userID,
  title,
  description,
  dateOfCreation,
  status,
  history
) => {
  axios
    .post("/createTicket", {
      userID,
      title,
      description,
      dateOfCreation,
      status
    })
    .then(result => {
      // Redirect user to dashboard page after success
      return history.push("/dashboard");
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
};

export default { createTicket };
