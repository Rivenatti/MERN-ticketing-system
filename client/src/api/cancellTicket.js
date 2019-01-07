import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const cancellTicket = (dispatch, ticketID, history) => {
  axios
    .post(`/cancell/${ticketID}`)
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

export default { cancellTicket };
