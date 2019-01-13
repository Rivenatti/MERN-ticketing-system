import axios from "axios";
import { HANDLE_ERROR } from "../actions/actions";

const deleteUser = (dispatch, userID, history) => {
  axios
    .post(`/deleteUser/${userID}`, { userID })
    .then(result => {
      return history.push("/logout");
    })
    .catch(error => {
      return dispatch({
        type: HANDLE_ERROR,
        message: error.response.data.message
      });
    });
};

export default { deleteUser };
