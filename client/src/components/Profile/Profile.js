// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import deleteUserApi from "../../api/deleteUser";

// Redux
import { connect } from "react-redux";

// Actions
import { RESET_STATE } from "../../actions/actions";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core/";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

//---------------- Material UI custom styles

const styles = {
  paper: {
    margin: "10vh 0",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem"
  },

  icon: {
    fontSize: "8rem"
  },

  title: {
    fontSize: "3rem",
    minHeight: "3rem"
  },

  bodyText: {
    minHeight: "15rem",
    fontSize: "1.4rem"
  },

  button: {
    minHeight: "3rem",
    fontSize: "1rem",
    marginBottom: 20
  },

  link: {
    textDecoration: "none"
  }
};

class Profile extends Component {
  // Delete account confirmation dialog
  state = {
    dialogOpen: false
  };

  // Delete account confirmation dialog
  handleDialogOpen = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          <Paper className={classes.paper}>
            {/* Account icon */}
            <AccountBoxIcon color="primary" className={classes.icon} />

            {/* Account heading */}
            <Typography
              variant="title"
              align="center"
              className={classes.title}
              gutterBottom
            >
              Profile
            </Typography>

            {/* Account details */}
            <Typography
              variant="body1"
              align="left"
              className={classes.bodyText}
              gutterBottom
            >
              <span style={{ color: "blue" }}>User name: </span>
              {this.props.userName}
              <br />
              <span style={{ color: "blue" }}>Email: </span>
              {this.props.userEmail}
              <br />
              <span style={{ color: "blue" }}>Role: </span>
              {this.props.role}
              <br />
              <span style={{ color: "blue" }}>Account created: </span>
              {this.props.accountCreated
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
              <br />
              <br />
              To logout click account icon in the top right corner.
            </Typography>

            {/* Delete account icon */}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleDialogOpen}
            >
              <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                {/* Dialog title */}

                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this account?"}
                </DialogTitle>
                <DialogActions>
                  {/* Agree button */}

                  <Button
                    onClick={() =>
                      this.props.onDelete(this.props.userID, this.props.history)
                    }
                    variant="contained"
                    color="primary"
                  >
                    Agree
                  </Button>

                  {/* Disagree button */}

                  <Button onClick={this.handleDialogOpen} color="primary">
                    Disagree
                  </Button>
                </DialogActions>
              </Dialog>
              Delete account
            </Button>

            {/* RETURN BUTTON */}
            {this.props.role === "user" ? (
              <Link to="/dashboard" className={classes.link}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  return to dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/admin-dashboard" className={classes.link}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  return to dashboard
                </Button>
              </Link>
            )}
          </Paper>
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    // USER DATA
    userID: state.loggerReducer.userID,
    userName: state.loggerReducer.userName,
    userEmail: state.loggerReducer.email,
    role: state.loggerReducer.role,
    accountCreated: state.loggerReducer.accountCreated,

    // TICKET DATA
    ticketID: state.ticketReducer.id,
    ticketUserID: state.ticketReducer.userID,
    ticketTitle: state.ticketReducer.title,
    ticketDescription: state.ticketReducer.description,
    ticketCreationDate: state.ticketReducer.created,
    ticketStatus: state.ticketReducer.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch({ type: RESET_STATE }),
    onDelete: (userID, history) =>
      deleteUserApi.deleteUser(dispatch, userID, history)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
