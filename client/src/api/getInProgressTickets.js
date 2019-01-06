import axios from "axios";
import { HANDLE_ERROR, GET_IN_PROGRESS_TICKETS } from "../actions/actions";

async function getInProgressTickets(dispatch) {
  await axios
    .post(`/getTickets/inProgress`)
    .then(result => {
      return dispatch({
        type: GET_IN_PROGRESS_TICKETS,
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

export default { getInProgressTickets };
