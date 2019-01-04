// Actions
import {
  TICKET_INPUT_CHANGED,
  GET_TICKET,
  GET_USER_TICKETS,
  RESET_STATE
} from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- TICKET -----------------

  // Ticket id
  id: null,

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation
  created: new Date(),

  // Array of user tickets to display on the dashboard
  userTickets: []
};

const ticketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_INPUT_CHANGED: {
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    }

    case GET_TICKET: {
      return Object.assign({}, state, {
        id: action.ticket[0].ticketID,
        title: action.ticket[0].title,
        description: action.ticket[0].description,
        created: action.ticket[0].dateOfCreation
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
