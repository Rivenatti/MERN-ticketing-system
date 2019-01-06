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
  console.log("works");
  axios
    .post("/createTicket", {
      userID,
      title,
      description,
      dateOfCreation,
      status
    })
    .then(result => {
      // Refresh page on success
      return window.location.reload();
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
};

export default { createTicket };
