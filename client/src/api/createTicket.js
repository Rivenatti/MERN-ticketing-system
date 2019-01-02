import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const createTicket = (
  dispatch,
  creator,
  title,
  description,
  dateOfCreation,
  status,
  history
) => {
  axios
    .post("/createTicket", {
      creator,
      title,
      description,
      dateOfCreation,
      status
    })
    .then(result => {
      // Redirect user to dashboard page after success
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({ type: HANDLE_ERROR, message: error.response.data.message });
    });
};

export default { createTicket };
