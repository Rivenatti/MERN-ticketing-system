import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const deleteTicket = (dispatch, ticketID, userID, history) => {
  axios
    .post(`/delete/${ticketID}`, { userID })
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

export default { deleteTicket };
