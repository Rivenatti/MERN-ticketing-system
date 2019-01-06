// Actions
import {
  TICKET_INPUT_CHANGED,
  GET_TICKET,
  GET_NEW_TICKETS,
  GET_IN_PROGRESS_TICKETS,
  GET_DONE_TICKETS,
  GET_CANCELLED_TICKETS,
  GET_USER_TICKETS,
  RESET_STATE,
  TICKET_DIALOG_OPEN
} from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USER DASHBOARD TICKET -----------------

  // Ticket id
  id: null,

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation
  created: new Date(),

  // Array of user tickets to display on the dashboard
  userTickets: [],

  //----------------- ADMIN DASHBOARD TICKET -----------------

  // New tickets array
  newTickets: [],

  // In progress tickets array
  inProgressTickets: [],

  // Done tickets array
  doneTickets: [],

  // Cancelled tickets array
  cancelledTickets: []
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

    case GET_NEW_TICKETS: {
      Object.assign({}, state, INITIAL_STATE);
      return Object.assign({}, state, { newTickets: action.tickets });
    }

    case GET_IN_PROGRESS_TICKETS: {
      Object.assign({}, state, INITIAL_STATE);
      return Object.assign({}, state, { inProgressTickets: action.tickets });
    }

    case GET_DONE_TICKETS: {
      Object.assign({}, state, INITIAL_STATE);
      return Object.assign({}, state, { doneTickets: action.tickets });
    }

    case GET_CANCELLED_TICKETS: {
      Object.assign({}, state, INITIAL_STATE);
      return Object.assign({}, state, { cancelledTickets: action.tickets });
    }

    case TICKET_DIALOG_OPEN: {
      let { userTickets } = state;
      let changedTicket = userTickets.map(ticket => {
        return Object.assign({}, ticket, { dialogOpen: !ticket.dialogOpen });
      });

      console.log(changedTicket);

      return Object.assign({}, state, {
        userTickets: changedTicket
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
