import axios from "axios";
import { HANDLE_ERROR, GET_USER_TICKETS } from "../actions/actions";

async function getUserTickets(dispatch, userID) {
  await axios
    .post("/getUserTickets", {
      userID
    })
    .then(result => {
      let tickets = result.data.tickets.map(ticket => {
        return Object.assign({}, ticket, { dialogOpen: false });
      });

      return dispatch({
        type: GET_USER_TICKETS,
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

export default { getUserTickets };
