// React
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import getUserTicketsApi from "../../api/getUserTickets";
import getNewTicketsApi from "../../api/getNewTickets";
import getInProgressTicketsApi from "../../api/getInProgressTickets";
import getDoneTicketsApi from "../../api/getDoneTickets";
import getCancelledTicketsApi from "../../api/getCancelledTickets";
import deleteTicketApi from "../../api/deleteTicket";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE, TICKET_DIALOG_OPEN } from "../../actions/actions";

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
  state = {
    expanded: null,
    activeTab: 0
  };

  // On mounting reset previous state
  componentWillMount = () => {
    this.props.onMountResetState();
  };

  // Get user tickets array
  componentDidMount = () => {
    this.props.newTickets.length === 0 && this.props.getNewTickets();
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

    return (
      <>
        {/* ---------- "MY TICKETS" TAB ---------- */}
        <AppBar position="static" color="default">
          <Tabs
            value={activeTab}
            onChange={this.handleActiveChange}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
            scrollable={false}
          >
            <Tab label="New" icon={<AnnoucementIcon />} />
            <Tab label="In progress" icon={<BuildIcon />} />
            <Tab label="Done" icon={<DoneIcon />} />
            <Tab label="Cancelled" icon={<CancelIcon />} />
          </Tabs>
        </AppBar>
        {activeTab === 0 && (
          <div>
            {this.props.newTickets.map(ticket => {
              return (
                <div key={ticket.ticketID}>
                  <ExpansionPanel
                    expanded={expanded === ticket.ticketID}
                    onChange={this.handleChange(ticket.ticketID)}
                    className={classes.expansionBar}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Me</Typography>
                      <Typography className={classes.secondaryHeading}>
                        {ticket.title}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                      className={classes.expansionPanelDetails}
                    >
                      <Divider />
                      <Typography className={classes.ticketDate}>
                        Date:{" "}
                        {ticket.dateOfCreation
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </Typography>
                      <Typography className={classes.ticketStatus}>
                        Status: {ticket.status}
                      </Typography>

                      <Typography className={classes.ticketStatus}>
                        Description:
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.ticketBody}
                      >
                        {ticket.description}
                      </Typography>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions
                      className={classes.expansionPanelActions}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          this.props.history.push(`/edit/${ticket.ticketID}`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        onClick={() =>
                          this.props.handleDialogOpen(ticket.ticketID)
                        }
                      >
                        <Dialog
                          open={ticket.dialogOpen}
                          onClose={() =>
                            this.props.handleDialogOpen(ticket.ticketID)
                          }
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          {/* Dialog title */}

                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete this ticket?"}
                          </DialogTitle>
                          <DialogActions>
                            {/* Agree button */}

                            <Button
                              onClick={() =>
                                this.props.deleteTicket(
                                  ticket.ticketID,
                                  this.props.history
                                )
                              }
                              color="primary"
                              autoFocus
                            >
                              Agree
                            </Button>

                            {/* Disagree button */}

                            <Button
                              onClick={() =>
                                this.props.handleDialogOpen(ticket.ticketID)
                              }
                              color="primary"
                            >
                              Disagree
                            </Button>
                          </DialogActions>
                        </Dialog>
                        Delete
                      </Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </div>
              );
            })}
          </div>
        )}

        {
          (activeTab === 1 &&
            this.props.inProgressTickets.length === 0 &&
            this.props.getInProgressTickets(),
          (
            <div>
              {this.props.inProgressTickets.map(ticket => {
                return (
                  <div key={ticket.ticketID}>
                    <ExpansionPanel
                      expanded={expanded === ticket.ticketID}
                      onChange={this.handleChange(ticket.ticketID)}
                      className={classes.expansionBar}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Me</Typography>
                        <Typography className={classes.secondaryHeading}>
                          {ticket.title}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        className={classes.expansionPanelDetails}
                      >
                        <Divider />
                        <Typography className={classes.ticketDate}>
                          Date:{" "}
                          {ticket.dateOfCreation
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </Typography>
                        <Typography className={classes.ticketStatus}>
                          Status: {ticket.status}
                        </Typography>

                        <Typography className={classes.ticketStatus}>
                          Description:
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ticketBody}
                        >
                          {ticket.description}
                        </Typography>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions
                        className={classes.expansionPanelActions}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() =>
                            this.props.history.push(`/edit/${ticket.ticketID}`)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          onClick={() =>
                            this.props.handleDialogOpen(ticket.ticketID)
                          }
                        >
                          <Dialog
                            open={ticket.dialogOpen}
                            onClose={() =>
                              this.props.handleDialogOpen(ticket.ticketID)
                            }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            {/* Dialog title */}

                            <DialogTitle id="alert-dialog-title">
                              {"Are you sure you want to delete this ticket?"}
                            </DialogTitle>
                            <DialogActions>
                              {/* Agree button */}

                              <Button
                                onClick={() =>
                                  this.props.deleteTicket(
                                    ticket.ticketID,
                                    this.props.history
                                  )
                                }
                                color="primary"
                                autoFocus
                              >
                                Agree
                              </Button>

                              {/* Disagree button */}

                              <Button
                                onClick={() =>
                                  this.props.handleDialogOpen(ticket.ticketID)
                                }
                                color="primary"
                              >
                                Disagree
                              </Button>
                            </DialogActions>
                          </Dialog>
                          Delete
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </div>
          ))
        }

        {
          (activeTab === 2 &&
            this.props.doneTickets.length === 0 &&
            this.props.getDoneTickets(),
          (
            <div>
              {this.props.doneTickets.map(ticket => {
                return (
                  <div key={ticket.ticketID}>
                    <ExpansionPanel
                      expanded={expanded === ticket.ticketID}
                      onChange={this.handleChange(ticket.ticketID)}
                      className={classes.expansionBar}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Me</Typography>
                        <Typography className={classes.secondaryHeading}>
                          {ticket.title}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        className={classes.expansionPanelDetails}
                      >
                        <Divider />
                        <Typography className={classes.ticketDate}>
                          Date:{" "}
                          {ticket.dateOfCreation
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </Typography>
                        <Typography className={classes.ticketStatus}>
                          Status: {ticket.status}
                        </Typography>

                        <Typography className={classes.ticketStatus}>
                          Description:
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ticketBody}
                        >
                          {ticket.description}
                        </Typography>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions
                        className={classes.expansionPanelActions}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() =>
                            this.props.history.push(`/edit/${ticket.ticketID}`)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          onClick={() =>
                            this.props.handleDialogOpen(ticket.ticketID)
                          }
                        >
                          <Dialog
                            open={ticket.dialogOpen}
                            onClose={() =>
                              this.props.handleDialogOpen(ticket.ticketID)
                            }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            {/* Dialog title */}

                            <DialogTitle id="alert-dialog-title">
                              {"Are you sure you want to delete this ticket?"}
                            </DialogTitle>
                            <DialogActions>
                              {/* Agree button */}

                              <Button
                                onClick={() =>
                                  this.props.deleteTicket(
                                    ticket.ticketID,
                                    this.props.history
                                  )
                                }
                                color="primary"
                                autoFocus
                              >
                                Agree
                              </Button>

                              {/* Disagree button */}

                              <Button
                                onClick={() =>
                                  this.props.handleDialogOpen(ticket.ticketID)
                                }
                                color="primary"
                              >
                                Disagree
                              </Button>
                            </DialogActions>
                          </Dialog>
                          Delete
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </div>
          ))
        }

        {
          (activeTab === 3 &&
            this.props.cancelledTickets.length === 0 &&
            this.props.getCancelledTickets(),
          (
            <div>
              {this.props.cancelledTickets.map(ticket => {
                return (
                  <div key={ticket.ticketID}>
                    <ExpansionPanel
                      expanded={expanded === ticket.ticketID}
                      onChange={this.handleChange(ticket.ticketID)}
                      className={classes.expansionBar}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Me</Typography>
                        <Typography className={classes.secondaryHeading}>
                          {ticket.title}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        className={classes.expansionPanelDetails}
                      >
                        <Divider />
                        <Typography className={classes.ticketDate}>
                          Date:{" "}
                          {ticket.dateOfCreation
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </Typography>
                        <Typography className={classes.ticketStatus}>
                          Status: {ticket.status}
                        </Typography>

                        <Typography className={classes.ticketStatus}>
                          Description:
                        </Typography>
                        <Typography
                          variant="body1"
                          className={classes.ticketBody}
                        >
                          {ticket.description}
                        </Typography>
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions
                        className={classes.expansionPanelActions}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() =>
                            this.props.history.push(`/edit/${ticket.ticketID}`)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          onClick={() =>
                            this.props.handleDialogOpen(ticket.ticketID)
                          }
                        >
                          <Dialog
                            open={ticket.dialogOpen}
                            onClose={() =>
                              this.props.handleDialogOpen(ticket.ticketID)
                            }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            {/* Dialog title */}

                            <DialogTitle id="alert-dialog-title">
                              {"Are you sure you want to delete this ticket?"}
                            </DialogTitle>
                            <DialogActions>
                              {/* Agree button */}

                              <Button
                                onClick={() =>
                                  this.props.deleteTicket(
                                    ticket.ticketID,
                                    this.props.history
                                  )
                                }
                                color="primary"
                                autoFocus
                              >
                                Agree
                              </Button>

                              {/* Disagree button */}

                              <Button
                                onClick={() =>
                                  this.props.handleDialogOpen(ticket.ticketID)
                                }
                                color="primary"
                              >
                                Disagree
                              </Button>
                            </DialogActions>
                          </Dialog>
                          Delete
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </div>
          ))
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    newTickets: state.ticketReducer.newTickets,
    inProgressTickets: state.ticketReducer.inProgressTickets,
    doneTickets: state.ticketReducer.doneTickets,
    cancelledTickets: state.ticketReducer.cancelledTickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMountResetState: () => dispatch({ type: RESET_STATE }),

    getTickets: userID => {
      return getUserTicketsApi.getUserTickets(dispatch, userID);
    },

    getNewTickets: () => {
      return getNewTicketsApi.getNewTickets(dispatch);
    },

    getInProgressTickets: () => {
      return getInProgressTicketsApi.getInProgressTickets(dispatch);
    },

    getDoneTickets: () => {
      return getDoneTicketsApi.getDoneTickets(dispatch);
    },

    getCancelledTickets: () => {
      return getCancelledTicketsApi.getCancelledTickets(dispatch);
    },

    handleDialogOpen: ticketID => {
      return dispatch({ type: TICKET_DIALOG_OPEN, ticketID });
    },

    deleteTicket: (ticketID, history) => {
      return deleteTicketApi.deleteTicket(dispatch, ticketID, history);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminDashboard));
