// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// API
import getAllTicketsApi from "../../../api/getAllTickets";
import changeTicketStatusApi from "../../../api/changeTicketStatus";

// Actions
import {
  RESET_STATE,
  ADMIN_TICKET_DIALOG_OPEN
} from "../../../actions/actions";

// Material-UI
import {
  AppBar,
  Tabs,
  Tab,
  Button,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import AnnoucementIcon from "@material-ui/icons/Announcement";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BuildIcon from "@material-ui/icons/Build";
import DoneIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { withStyles } from "@material-ui/core/styles";

// Expansion tab container
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

// Material UI custom styles
const styles = {
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: 18
  },

  secondaryHeading: {
    fontSize: 18
  },

  expansionBar: {
    overflow: "hidden",
    margin: "1vh 0"
  },

  expansionPanelDetails: {
    flexDirection: "column",
    backgroundColor: "#fff"
  },

  expansionPanelActions: {
    backgroundColor: "#fff"
  },

  ticketDate: {
    padding: "1vh 0",
    fontSize: 17
  },

  ticketStatus: {
    padding: "1vh 0",
    fontSize: 17
  },

  ticketBody: {
    padding: "2vh 0 0 0"
  },

  paper: {
    marginTop: "17vh",
    textAlign: "center"
  },

  formWrapper: {
    padding: 20
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },

  formButton: {
    width: "50%",
    margin: "20px auto 0px auto"
  }
};

class AdminDashboard extends Component {
  // Expansion tabs state
  state = {
    expanded: null,
    activeTab: 0
  };

  componentWillMount = () => {
    // Check if user is authorized
    if (this.props.userRole !== "admin") this.props.history.push("/");
  };

  componentDidMount = () => {
    // Get all tickets array
    this.props.allTickets.length === 0 && this.props.getAllTickets();
  };

  componentWillUnmount = () => {
    // On unmounting reset state
    this.props.resetState();
  };

  // Active tab change
  handleActiveChange = (event, activeTab) => {
    this.setState({ activeTab });
  };

  // Tab expanded panel change
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  // Handle new ticket form submit
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { activeTab, expanded } = this.state;

    const renderPanel = ticket => {
      return (
        // UNIQUE KEY
        <div key={ticket.ticketID}>
          {/* TICKET PANEL */}
          <ExpansionPanel
            expanded={expanded === ticket.ticketID}
            onChange={this.handleChange(ticket.ticketID)}
            className={classes.expansionBar}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/* TICKET ID */}
              <Typography className={classes.heading}>
                #{ticket.ticketID}
              </Typography>

              {/* TICKET TITLE */}
              <Typography className={classes.secondaryHeading}>
                {ticket.title}
              </Typography>
            </ExpansionPanelSummary>

            {/* TICKET EXPANDED DETAILS */}
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {/* HORIZONTAL DIVIDER */}
              <Divider />

              {/* STATUS */}
              <Typography className={classes.ticketStatus}>
                <span style={{ color: "#00ad0e" }}>Status: </span>
                {ticket.status === "inProgress" ? "in progress" : ticket.status}
              </Typography>

              {/* DATE OF CREATION/EDITION 'dd-mm-yyyy' */}
              <Typography className={classes.ticketDate}>
                <span style={{ color: "blue" }}>Date: </span>
                {ticket.dateOfCreation
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </Typography>

              {/* DESCRIPTION */}
              <Typography className={classes.ticketStatus}>
                <span style={{ color: "blue" }}> Description: </span>{" "}
                {ticket.description}
              </Typography>
            </ExpansionPanelDetails>

            {/* HORIZONTAL DIVIDER */}
            <Divider />

            {/* EDIT BUTTON */}
            <ExpansionPanelActions className={classes.expansionPanelActions}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  this.props.history.push(`/admin-ticket/${ticket.ticketID}`)
                }
              >
                status
              </Button>

              {/* IF TICKET HAS NOT BEEN CANCELLED, DISPLAY CANCELL BUTTON */}
              {ticket.status !== "cancelled" && (
                <Button
                  size="small"
                  onClick={() => this.props.handleDialogOpen(ticket.ticketID)}
                >
                  {/* BUTTON NAME VALUE */}
                  Cancell
                  {/* DIALOG ON BUTTON CLICK  */}
                  <Dialog
                    open={ticket.dialogOpen}
                    onClose={() => this.props.handleDialogOpen(ticket.ticketID)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    {/* Dialog title */}
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to cancell this ticket?"}
                    </DialogTitle>
                    <DialogActions>
                      {/* Agree button */}
                      <Button
                        onClick={() =>
                          this.props.cancellTicket(ticket.ticketID)
                        }
                        color="primary"
                        autoFocus
                      >
                        Agree
                      </Button>

                      {/* Disagree button */}
                      <Button color="primary">Disagree</Button>
                    </DialogActions>
                  </Dialog>
                </Button>
              )}
            </ExpansionPanelActions>
          </ExpansionPanel>
        </div>
      );
    };

    return (
      <>
        {/* ---------- APP BAR, TABS ---------- */}
        <AppBar position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={this.handleActiveChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
            variant="scrollable"
            scrollButtons="off"
          >
            <Tab label="New" icon={<AnnoucementIcon />} />
            <Tab label="In progress" icon={<BuildIcon />} />
            <Tab label="Done" icon={<DoneIcon />} />
            <Tab label="Cancelled" icon={<CancelIcon />} />
          </Tabs>
        </AppBar>

        {/* NEW TICKETS TAB */}
        {activeTab === 0 && (
          <TabContainer>
            {this.props.allTickets.map(
              ticket =>
                (ticket.status === "new" || ticket.status === "edited") &&
                renderPanel(ticket)
            )}
          </TabContainer>
        )}

        {/* IN PROGRESS TICKETS TAB */}
        {activeTab === 1 && (
          <TabContainer>
            {this.props.allTickets.map(
              ticket => ticket.status === "inProgress" && renderPanel(ticket)
            )}
          </TabContainer>
        )}

        {/* DONE TICKETS TAB */}
        {activeTab === 2 && (
          <TabContainer>
            {this.props.allTickets.map(
              ticket => ticket.status === "done" && renderPanel(ticket)
            )}
          </TabContainer>
        )}

        {/* CANCELLED TICKETS TAB */}
        {activeTab === 3 && (
          <TabContainer>
            {this.props.allTickets.map(
              ticket => ticket.status === "cancelled" && renderPanel(ticket)
            )}
          </TabContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // USER ROLE
    userRole: state.loggerReducer.role,

    // ALL TICKETS FROM THE DB
    allTickets: state.ticketReducer.allTickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch({ type: RESET_STATE }),

    handleDialogOpen: ticketID => {
      return dispatch({ type: ADMIN_TICKET_DIALOG_OPEN, ticketID });
    },

    getAllTickets: () => {
      return getAllTicketsApi.getAllTickets(dispatch);
    },

    cancellTicket: ticketID => {
      return changeTicketStatusApi.changeTicketStatus(
        dispatch,
        ticketID,
        "cancelled"
      );
    }
  };
};
AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminDashboard));
