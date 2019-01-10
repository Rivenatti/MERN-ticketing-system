import axios from "axios";
import { HANDLE_ERROR, GET_USER } from "../actions/actions";

async function getUser(dispatch, userID) {
  await axios
    .post(`/getUser/${userID}`, {
      userID
    })
    .then(result => {
      return dispatch({
        type: GET_USER,
        user: result.data.user
      });
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
}

export default { getUser };
