import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const deleteTicket = (dispatch, ticketID, history) => {
  axios
    .post(`/delete/${ticketID}`)
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
