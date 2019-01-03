import axios from "axios";
import { HANDLE_ERROR, GET_USER_TICKETS } from "../actions/actions";

async function getUserTickets(dispatch, userID) {
  await axios
    .post("/getUserTickets", {
      userID
    })
    .then(result => {
      return dispatch({
        type: GET_USER_TICKETS,
        tickets: result.data.tickets
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
