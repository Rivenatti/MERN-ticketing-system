import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const changeTicketStatus = (dispatch, ticketID, status) => {
  axios
    .post(`/changeStatus/${ticketID}`, {
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

export default { changeTicketStatus };
