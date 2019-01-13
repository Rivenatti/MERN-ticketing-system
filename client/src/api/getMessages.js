import axios from "axios";
import { HANDLE_ERROR, GET_MESSAGES } from "../actions/actions";

async function getMessages(dispatch, userID, ticketID) {
  await axios
    .post(`/getMessages/${ticketID}`, {
      userID,
      ticketID
    })
    .then(result => {
      return dispatch({
        type: GET_MESSAGES,
        messages: result.data.messages
      });
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
}

export default { getMessages };
