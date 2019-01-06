import axios from "axios";
import { HANDLE_ERROR, GET_DONE_TICKETS } from "../actions/actions";

async function getDoneTickets(dispatch) {
  await axios
    .post(`/getTickets/done`)
    .then(result => {
      return dispatch({
        type: GET_DONE_TICKETS,
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

export default { getDoneTickets };
