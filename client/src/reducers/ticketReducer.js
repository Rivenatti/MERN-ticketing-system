// Actions
import {
  TICKET_INPUT_CHANGED,
  GET_TICKET,
  GET_USER,
  GET_ALL_TICKETS,
  GET_USER_TICKETS,
  GET_MESSAGES,
  RESET_STATE,
  TICKET_DIALOG_OPEN,
  ADMIN_TICKET_DIALOG_OPEN
} from "../actions/actions";

// Initial state
const INITIAL_STATE = {
  //----------------- USER DASHBOARD TICKET -----------------

  // Ticket id
  id: null,

  // Ticket creator id
  userID: "",

  // Ticket creator name
  userName: "",

  // Ticket title
  title: "",

  // Ticket description
  description: "",

  // Date of creation
  created: new Date(),

  // Ticket status
  status: "",

  // Array of user tickets to display on the dashboard
  userTickets: [],

  //----------------- TICKET MESSAGES -----------------

  // Add new ticket message
  message: "",

  // Get all messages
  messages: [],

  //----------------- ADMIN DASHBOARD TICKET -----------------

  // All tickets array
  allTickets: [],

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
        userID: action.ticket[0].userID,
        title: action.ticket[0].title,
        description: action.ticket[0].description,
        created: action.ticket[0].dateOfCreation,
        status: action.ticket[0].status
      });
    }

    case GET_USER: {
      return Object.assign({}, state, {
        userName: `${action.user[0].firstName} ${action.user[0].lastName}`
      });
    }

    case GET_USER_TICKETS: {
      return Object.assign({}, state, { userTickets: action.tickets });
    }

    case GET_ALL_TICKETS: {
      return Object.assign({}, state, { allTickets: action.tickets });
    }

    case GET_MESSAGES: {
      return Object.assign({}, state, { messages: action.messages });
    }

    case TICKET_DIALOG_OPEN: {
      let { userTickets } = state;
      let newTicketsArray = userTickets.map(ticket => {
        return ticket.ticketID === action.ticketID
          ? Object.assign({}, ticket, { dialogOpen: !ticket.dialogOpen })
          : ticket;
      });

      return Object.assign({}, state, {
        userTickets: newTicketsArray
      });
    }

    case ADMIN_TICKET_DIALOG_OPEN: {
      let { allTickets } = state;
      let newTicketsArray = allTickets.map(ticket => {
        return ticket.ticketID === action.ticketID
          ? Object.assign({}, ticket, { dialogOpen: !ticket.dialogOpen })
          : ticket;
      });

      return Object.assign({}, state, {
        allTickets: newTicketsArray
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
