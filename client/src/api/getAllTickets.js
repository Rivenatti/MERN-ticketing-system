import axios from "axios";
import { HANDLE_ERROR, GET_ALL_TICKETS } from "../actions/actions";

async function getAllTickets(dispatch) {
  await axios
    .post(`/getTickets/all`)
    .then(result => {
      let tickets = result.data.tickets.map(ticket => {
        return Object.assign({}, ticket, { dialogOpen: false });
      });
      return dispatch({
        type: GET_ALL_TICKETS,
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

export default { getAllTickets };
