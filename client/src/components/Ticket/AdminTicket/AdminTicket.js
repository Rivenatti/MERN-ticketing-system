// React
import React, { Component } from "react";
import getTicketApi from "../../../api/getTicket";
import addNewMessageApi from "../../../api/addMessage";
import changeTicketStatusApi from "../../../api/changeTicketStatus";

// Redux
import { connect } from "react-redux";

// Actions
import { TICKET_INPUT_CHANGED } from "../../../actions/actions";

// Api
import getUserApi from "../../../api/getUser";
import getMessagesApi from "../../../api/getMessages";

// Material-UI
import { Grid, Typography, Paper, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Material UI custom styles
const styles = {
  paper: {
    margin: "10vh 0",
    textAlign: "center"
  },

  formWrapper: {
    padding: 20,
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  },

  actionButton: {
    width: "25%",
    margin: "5px 0 0 0"
  },

  replies: {
    marginTop: 20,
    padding: 10
  },

  newReply: {
    margin: "20px 0"
  },

  returnButton: {
    width: "50%",
    margin: "20px auto 0px auto"
  },

  menu: {
    width: 200
  }
};

class AdminTicket extends Component {
  componentWillMount = () => {
    // Check if user is authorized
    if (this.props.userRole !== "admin") this.props.history.push("/");
  };

  componentDidMount = () => {
    // Get ticket info
    this.props.getTicket(this.props.userID, this.props.match.params.id);
  };

  // Update ticket status state and handlers
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    this.props.messages.length === 0 &&
      this.props.getMessages(this.props.userID, this.props.match.params.id);
    this.props.ticketUserID !== "" &&
      this.props.getUser(this.props.ticketUserID);
    return (
      <>
        <Grid container>
          <Grid item xs={1} sm={3} md={4} />
          <Grid item xs={10} sm={6} md={4}>
            <Paper className={classes.paper}>
              {/* WRAPPER FOR PADDING */}
              <div className={classes.formWrapper}>
                {/* TITLE */}
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Ticket
                </Typography>

                {/* CREATOR */}
                <Typography variant="h6">
                  Creator: {this.props.ticketUserName}
                </Typography>

                {/* TICKET ID */}
                <Typography variant="h6">
                  <span style={{ color: "blue" }}>Ticket ID: </span>#
                  {this.props.ticketID}
                </Typography>

                {/* TITLE */}
                <Typography variant="h6">
                  <span style={{ color: "blue" }}>Title: </span>
                  {this.props.ticketTitle}
                </Typography>

                {/* DATE */}
                <Typography variant="h6">
                  <span style={{ color: "blue" }}>Date: </span>
                  {this.props.ticketCreationDate
                    .toString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </Typography>

                {/* DESCRIPTION */}
                <Typography variant="h6">
                  <span style={{ color: "blue" }}>Description: </span>
                  {this.props.ticketDescription}
                </Typography>

                {/* STATUS */}
                <Typography variant="h6">
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Update status"
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText={`Current status: ${
                      this.props.ticketStatus === "inProgress"
                        ? "in progress"
                        : this.props.ticketStatus
                    }`}
                    margin="normal"
                    variant="outlined"
                    onChange={event =>
                      this.props.handleTicketStatusChange(
                        event,
                        this.props.ticketID
                      )
                    }
                  >
                    <option />
                    <option>in progress</option>
                    <option>done</option>
                    <option>cancelled</option>
                  </TextField>
                </Typography>

                {/* MESSAGES SECTION*/}

                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Messages
                </Typography>

                {this.props.messages.length > 0
                  ? this.props.messages.map(message => {
                      return (
                        <Paper className={classes.replies} key={message.id}>
                          <Typography variant="caption">
                            `{message.firstName} {message.lastName}`
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ margin: "5px 0" }}
                          >
                            {message.message}
                          </Typography>
                          <div
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <Typography variant="caption">
                              {message.date
                                .toString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </Typography>
                          </div>
                        </Paper>
                      );
                    })
                  : null}

                {/* NEW REPLY */}
                <form
                  onSubmit={event =>
                    this.props.addNewMessage(
                      event,
                      this.props.userID,
                      this.props.ticketID,
                      this.props.message,
                      new Date()
                    )
                  }
                >
                  <TextField
                    id="standard-multiline-static"
                    name="message"
                    label="Add new reply..."
                    multiline
                    rows="2"
                    placeholder="Type here..."
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={this.props.onInputChange}
                    value={this.props.message}
                    fullWidth
                  />

                  <div style={{ display: "flex", justifyContent: "right" }}>
                    {/* ADD REPLY BUTTON*/}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.actionButton}
                    >
                      ADD REPLY
                    </Button>
                  </div>
                </form>

                {/* RETURN BUTTON */}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.returnButton}
                  onClick={() => this.props.history.push(`/admin-dashboard`)}
                >
                  RETURN TO DASHBOARD
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // USER DATA
    userID: state.loggerReducer.userID,
    userRole: state.loggerReducer.role,

    // TICKET DATA
    ticketID: state.ticketReducer.id,
    ticketUserID: state.ticketReducer.userID,
    ticketUserName: state.ticketReducer.userName,
    ticketTitle: state.ticketReducer.title,
    ticketDescription: state.ticketReducer.description,
    ticketCreationDate: state.ticketReducer.created,
    ticketStatus: state.ticketReducer.status,

    // MESSAGES DATA
    message: state.ticketReducer.message,
    messages: state.ticketReducer.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: event => {
      dispatch({
        type: TICKET_INPUT_CHANGED,
        name: event.target.name,
        value: event.target.value
      });
    },

    getTicket: (userID, ticketID) => {
      return getTicketApi.getTicket(dispatch, userID, ticketID);
    },

    getUser: userID => {
      return getUserApi.getUser(dispatch, userID);
    },

    addNewMessage: (event, userID, ticketID, message, date) => {
      event.preventDefault();
      return addNewMessageApi.addMessage(
        dispatch,
        userID,
        ticketID,
        message,
        date
      );
    },

    getMessages: (userID, ticketID) => {
      return getMessagesApi.getMessages(dispatch, userID, ticketID);
    },

    handleTicketStatusChange: (event, _ticketID) => {
      return changeTicketStatusApi.changeTicketStatus(
        dispatch,
        _ticketID,
        event.target.value === "in progress" ? "inProgress" : event.target.value
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminTicket));
