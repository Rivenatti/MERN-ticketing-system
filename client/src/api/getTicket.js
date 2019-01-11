import axios from "axios";
import { HANDLE_ERROR, GET_TICKET } from "../actions/actions";

async function getTicket(dispatch, userID, ticketID) {
  console.log(userID);
  await axios
    .post(`/get/${ticketID}`, {
      userID,
      ticketID
    })
    .then(result => {
      return dispatch({
        type: GET_TICKET,
        ticket: result.data.ticket
      });
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
}

export default { getTicket };
