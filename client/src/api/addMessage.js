import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const addMessage = (dispatch, userID, ticketID, message, date) => {
  axios
    .post("/addMessage", {
      userID,
      ticketID,
      message,
      date
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

export default { addMessage };
