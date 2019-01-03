// Actions
import { TICKET_INPUT_CHANGED, RESET_STATE } from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- TICKET -----------------

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation 'dd-mm-yyyy'
  created: new Date()
};

const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_INPUT_CHANGED: {
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    }

    case RESET_STATE: {
      return Object.assign({}, state, INITIAL_STATE);
    }

    default: {
      return state;
    }
  }
};

export default ticketReducer;
