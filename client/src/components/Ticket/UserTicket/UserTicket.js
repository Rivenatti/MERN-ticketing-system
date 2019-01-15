// React
import React, { Component } from "react";
import getTicketApi from "../../../api/getTicket";
import addNewMessageApi from "../../../api/addMessage";
import getMessagesApi from "../../../api/getMessages";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE, TICKET_INPUT_CHANGED } from "../../../actions/actions";

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
  }
};

class UserTicket extends Component {
  componentWillMount = () => {
    // Get ticket data
    this.props.getTicket(this.props.userID, this.props.match.params.id);
  };

  componentDidUpdate = () => {
    // When ticket data loaded, check compare IDs for authorization
    this.props.userID !== this.props.ticketUserID &&
      this.props.history.push("/");
  };

  componentWillUnmount = () => {
    // On unmounting reset state
    this.props.resetState();
  };

  render() {
    const { classes } = this.props;

    this.props.messages.length === 0 &&
      this.props.getMessages(this.props.userID, this.props.match.params.id);

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
                  <span style={{ color: "blue" }}>Status: </span>
                  {this.props.ticketStatus}
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
                            style={{
                              display: "flex",
                              justifyContent: "right",
                              flexFlow: "row-reverse"
                            }}
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      flexFlow: "row-reverse"
                    }}
                  >
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
                  onClick={() => this.props.history.push(`/dashboard`)}
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

    // TICKET DATA
    ticketID: state.ticketReducer.id,
    ticketUserID: state.ticketReducer.userID,
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
    resetState: () => dispatch({ type: RESET_STATE }),
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserTicket));
