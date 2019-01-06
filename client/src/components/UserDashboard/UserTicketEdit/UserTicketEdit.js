// React
import React, { Component } from "react";
import getTicketApi from "../../../api/getTicket";
import editTicketApi from "../../../api/editTicket";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE, TICKET_INPUT_CHANGED } from "../../../actions/actions";

// Material-UI
import { Grid, Typography, Paper, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Material UI custom styles
const styles = {
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

class UserTicketEdit extends Component {
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
                {/* FORM TITLE */}
                <Typography variant="h5">Edit ticket</Typography>

                {/* FORM */}
                <form
                  onSubmit={event =>
                    this.props.handleSubmit(
                      event,
                      this.props.ticketID,
                      this.props.ticketTitle,
                      this.props.ticketDescription,
                      this.props.ticketCreationDate,
                      "edited",
                      this.props.history
                    )
                  }
                  className={classes.form}
                >
                  {/* TICKET TITLE */}
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Ticket title"
                    className={classes.textField}
                    margin="normal"
                    value={this.props.ticketTitle}
                    onChange={this.props.onInputChange}
                  />

                  {/* TICKET DESCRIPTION */}
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Ticket description"
                    multiline
                    rows="4"
                    margin="normal"
                    value={this.props.ticketDescription}
                    onChange={this.props.onInputChange}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.formButton}
                  >
                    Edit
                  </Button>
                </form>
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
)(withStyles(styles)(UserTicketEdit));
