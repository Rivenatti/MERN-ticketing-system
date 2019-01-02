// Actions
import { TICKET_INPUT_CHANGED, CREATE_NEW_TICKET } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- TICKET -----------------

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation 'dd-mm-yyyy'
  created: new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-")
};

const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_INPUT_CHANGED: {
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    }

    case CREATE_NEW_TICKET: {
      return Object.assign({}, state, { creator: action.creator });
    }

    default: {
      return state;
    }
  }
};

export default ticketReducer;
