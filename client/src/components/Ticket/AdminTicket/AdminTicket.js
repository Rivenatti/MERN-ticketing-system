// React
import React, { Component } from "react";
import getTicketApi from "../../../api/getTicket";
import editTicketApi from "../../../api/editTicket";

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
    marginTop: "17vh",
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
    padding: 20
  },

  newReply: {
    margin: "20px 0"
  },

  returnButton: {
    width: "50%",
    margin: "20px auto 0px auto"
  }
};

class Ticket extends Component {
  componentDidMount = () => {
    this.props.getTicket(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
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
                <Typography variant="h6">Creator: </Typography>

                {/* DATE */}
                <Typography variant="h6">Date: </Typography>

                {/* DESCRIPTION */}
                <Typography variant="h6">Description: </Typography>

                {/* STATUS */}
                <Typography variant="h6">Status: </Typography>

                {/* CHANGE STATUS BUTTON */}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.actionButton}
                >
                  Change status
                </Button>

                {/* REPILES */}
                <Paper className={classes.replies}>Reply 1</Paper>

                {/* NEW REPLY */}
                <TextField
                  id="filled-full-width"
                  label="Reply"
                  style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                {/* ADD REPLY BUTTON*/}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.actionButton}
                >
                  ADD REPLY
                </Button>

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
    ticketTitle: state.ticketReducer.title,
    ticketDescription: state.ticketReducer.description,
    ticketCreationDate: state.ticketReducer.created
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
)(withStyles(styles)(Ticket));
