import axios from "axios";
import { HANDLE_ERROR, GET_NEW_TICKETS } from "../actions/actions";

async function getNewTickets(dispatch) {
  await axios
    .post(`/getTickets/new`)
    .then(result => {
      return dispatch({
        type: GET_NEW_TICKETS,
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

export default { getNewTickets };
