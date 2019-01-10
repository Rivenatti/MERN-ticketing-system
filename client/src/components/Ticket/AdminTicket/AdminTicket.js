// React
import React, { Component } from "react";
import getTicketApi from "../../../api/getTicket";
import editTicketApi from "../../../api/editTicket";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE, TICKET_INPUT_CHANGED } from "../../../actions/actions";

// Api
import getUserApi from "../../../api/getUser";

// Material-UI
import {
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Material UI custom styles
const styles = {
  paper: {
    margin: "17vh 0",
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
  componentDidMount = () => {
    this.props.getTicket(this.props.match.params.id);
  };

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
    console.log(this.props);
    if (this.props.ticketUserID !== "")
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

                {/* TITLE */}
                <Typography variant="h6">
                  Title: {this.props.ticketTitle}
                </Typography>

                {/* DATE */}
                <Typography variant="h6">
                  Date:{" "}
                  {this.props.ticketCreationDate
                    .toString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </Typography>

                {/* DESCRIPTION */}
                <Typography variant="h6">
                  Description: {this.props.ticketDescription}
                </Typography>

                {/* STATUS */}
                <Typography variant="h6">
                  Status: {this.props.ticketStatus}
                </Typography>

                {/* CHANGE STATUS BUTTON */}
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickOpen}
                  >
                    Update status
                  </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle
                      id="form-dialog-title"
                      style={{ textAlign: "center" }}
                    >
                      Status
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Select current ticket status.
                      </DialogContentText>
                      <TextField
                        id="outlined-select-currency-native"
                        select
                        margin="normal"
                        variant="outlined"
                        SelectProps={{
                          native: true,
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        fullWidth
                      >
                        <option>in progress</option>
                        <option>done</option>
                      </TextField>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Update
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

                {/* MESSAGES SECTION*/}
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Messages
                </Typography>

                <Paper className={classes.replies}>
                  <Typography variant="caption">John Smith</Typography>
                  <Typography variant="body1" style={{ margin: "5px 0" }}>
                    Reply 1
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <Typography variant="caption">10-01-2019</Typography>
                  </div>
                </Paper>

                {/* NEW REPLY */}
                <TextField
                  id="standard-multiline-static"
                  label="Add new reply..."
                  multiline
                  rows="2"
                  placeholder="Type here..."
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                />

                <div style={{ display: "flex", justifyContent: "right" }}>
                  {/* ADD REPLY BUTTON*/}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                  >
                    ADD REPLY
                  </Button>
                </div>

                {/* RETURN BUTTON */}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.returnButton}
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
    ticketID: state.ticketReducer.id,
    ticketUserID: state.ticketReducer.userID,
    ticketUserName: state.ticketReducer.userName,
    ticketTitle: state.ticketReducer.title,
    ticketDescription: state.ticketReducer.description,
    ticketCreationDate: state.ticketReducer.created,
    ticketStatus: state.ticketReducer.status
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

    getTicket: ticketID => {
      getTicketApi.getTicket(dispatch, ticketID);
    },

    getUser: userID => {
      getUserApi.getUser(dispatch, userID);
    },

    handleSubmit: (
      event,
      _ticketID,
      _title,
      _description,
      _dateOfCreation,
      _status,
      _history
    ) => {
      event.preventDefault();

      dispatch({
        type: RESET_STATE
      });

      editTicketApi.editTicket(
        dispatch,
        _ticketID,
        _title,
        _description,
        _history
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminTicket));
