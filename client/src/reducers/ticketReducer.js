// Actions
import {
  TICKET_INPUT_CHANGED,
  GET_USER_TICKETS,
  RESET_STATE
} from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- TICKET -----------------

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation 'dd-mm-yyyy'
  created: new Date(),

  userTickets: []
};

const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_INPUT_CHANGED: {
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    }

    case GET_USER_TICKETS: {
      return Object.assign({}, state, { userTickets: action.tickets });
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
