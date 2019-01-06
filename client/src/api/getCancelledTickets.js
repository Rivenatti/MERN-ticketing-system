import axios from "axios";
import { HANDLE_ERROR, GET_CANCELLED_TICKETS } from "../actions/actions";

async function getCancelledTickets(dispatch) {
  await axios
    .post(`/getTickets/cancelled`)
    .then(result => {
      return dispatch({
        type: GET_CANCELLED_TICKETS,
        tickets: result.data.ticket
      });
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
}

export default { getCancelledTickets };
