import axios from "axios";
import { HANDLE_ERROR, GET_IN_PROGRESS_TICKETS } from "../actions/actions";

async function getInProgressTickets(dispatch) {
  await axios
    .post(`/getTickets/inProgress`)
    .then(result => {
      let tickets = result.data.tickets.map(ticket => {
        return Object.assign({}, ticket, { dialogOpen: false });
      });
      return dispatch({
        type: GET_IN_PROGRESS_TICKETS,
        tickets
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
