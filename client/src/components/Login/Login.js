// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../../api/login";

// Redux
import { connect } from "react-redux";
import {
  RESET_STATE,
  INPUT_FOCUSED,
  INPUT_BLUR,
  INPUT_CHANGED,
  SNACKBAR_CLOSE
} from "../../actions/actions";

// Material-UI
import {
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

// Material UI custom styles
const styles = {
  loginItem: {
    marginTop: "20vh"
  },

  loginInput: {
    marginTop: 20
  },

  loginButton: {
    marginTop: 20
  },

  link: {
    textDecoration: "none",
    color: "#1a73e8"
  },

  snakbar: {
    backgroundColor: "#d32f2f"
  },

  message: {
    display: "flex",
    alignItems: "center"
  },

  errorIcon: {
    marginRight: "1rem"
  }
};

class Login extends Component {
  componentWillMount = () => {
    this.props.onMountResetState();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={1} sm={3} md={4} lg={5} />
        <Grid item xs={10} sm={6} md={4} lg={2} className={classes.loginItem}>
          {/* ----- SERVER ERRORS SNACKBAR ----- */}
          {this.props.serverErrors.length === 0 ? null : (
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={this.props.snackbarOpen}
              autoHideDuration={5000}
              onClose={this.props.handleSnackbarClose}
            >
              <SnackbarContent
                className={classes.snakbar}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <ErrorIcon className={classes.errorIcon} />
                    {this.props.serverErrors[0].error}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.props.handleSnackbarClose}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />
            </Snackbar>
          )}

          {/* ----- LOGIN__HEADER ----- */}
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Let's get started
          </Typography>

          {/* ----- LOGIN__INPUTS ----- */}
          <form
            onSubmit={event =>
              this.props.handleSubmit(
                event,
                this.props.emailInput,
                this.props.passwordInput,
                this.props.history
              )
            }
          >
            {/*  EMAIL INPUT  */}
            <FormControl
              error={
                !this.props.emailInputFocused && this.props.emailInputError
              }
              aria-describedby="component-error-text"
              fullWidth
              required
              className={classes.loginInput}
            >
              <InputLabel htmlFor="component-error">Email</InputLabel>
              <Input
                id="component-error"
                name="emailInput"
                value={this.props.emailInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* EMAIL INPUT ERRORS */}
              <FormHelperText id="component-error-text">
                {!this.props.emailInputFocused &&
                  this.props.emailInputError &&
                  "Email format invalid."}
              </FormHelperText>
            </FormControl>

            {/*  PASSWORD INPUT  */}
            <FormControl
              error={
                !this.props.passwordInputFocused &&
                this.props.passwordInputError
              }
              aria-describedby="component-error-text"
              fullWidth
              required
              className={classes.loginInput}
            >
              <InputLabel htmlFor="component-error">Password</InputLabel>
              <Input
                id="component-error"
                name="passwordInput"
                type="password"
                value={this.props.passwordInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* PASSWORD INPUT ERRORS */}
              <FormHelperText id="component-error-text">
                {!this.props.passwordInputFocused &&
                  this.props.passwordInputError &&
                  "Password format invalid."}
              </FormHelperText>
            </FormControl>

            {/* LOGIN BUTTON */}

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.loginButton}
              fullWidth
            >
              login
            </Button>
          </form>

          {/* CREATE ACCOUT LINK */}
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: 20, textAlign: "center" }}
          >
            <Link to="/register" className={classes.link}>
              Create an account
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} sm={3} md={4} lg={5} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    // Email input
    emailInput: state.emailInput,
    emailInputFocused: state.emailInputFocused,
    emailInputError: state.emailInputError,

    // Password input
    passwordInput: state.passwordInput,
    passwordInputFocused: state.passwordInputFocused,
    passwordInputError: state.passwordInputError,

    // Server errors
    serverErrors: state.serverErrors,

    // Snackbar for server errors:
    snackbarOpen: state.snackbarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMountResetState: () => dispatch({ type: RESET_STATE }),
    inputFocused: e => dispatch({ type: INPUT_FOCUSED, name: e.target.name }),
    inputBlur: e => dispatch({ type: INPUT_BLUR, name: e.target.name }),

    inputChanged: e => {
      dispatch({
        type: INPUT_CHANGED,
        name: e.target.name,
        value: e.target.value
      });
    },

    handleSubmit: (event, _emailInput, _passwordInput, _history) => {
      // Prevent window from reloading
      event.preventDefault();

      // Reset form inputs state
      dispatch({ type: RESET_STATE });

      // Pass the data to registration api
      Api.login(dispatch, _emailInput, _passwordInput, _history);
    },

    handleSnackbarClose: e => {
      dispatch({ type: SNACKBAR_CLOSE });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
