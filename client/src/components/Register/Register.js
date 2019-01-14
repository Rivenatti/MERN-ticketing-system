// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../../api/register";

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
  registerItem: {
    margin: "12vh 0"
  },

  registerInput: {
    marginTop: 20
  },

  registerButton: {
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

class Register extends Component {
  componentWillMount = () => {
    // If user is logged in, redirect to home
    if (this.props.token) this.props.history.push("/");
  };

  componentWillUnmount = () => {
    // On unmounting reset state
    this.props.resetState();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={1} sm={3} md={4} lg={5} />
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          lg={2}
          className={classes.registerItem}
        >
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

          {/* ----- REGISTRATION HEADER ----- */}
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Create an account
          </Typography>

          {/* ----- REGISTRATION FORM ----- */}
          <form
            onSubmit={event =>
              this.props.handleSubmit(
                event,
                this.props.firstNameInput,
                this.props.lastNameInput,
                this.props.emailInput,
                this.props.passwordInput,
                this.props.history
              )
            }
          >
            {/* -------------------- FIRST NAME INPUT --------------------*/}
            <FormControl
              error={
                !this.props.firstNameInputFocused &&
                this.props.firstNameInputError
              }
              aria-describedby="firstName-error-text"
              fullWidth
              required
              className={classes.registerInput}
            >
              <InputLabel htmlFor="firstName-error">First name</InputLabel>
              <Input
                id="firstName"
                name="firstNameInput"
                value={this.props.firstNameInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* FIRSTNAME INPUT ERRORS */}
              <FormHelperText id="firstName-error-text">
                {!this.props.firstNameInputFocused &&
                  this.props.firstNameInputError &&
                  "First name format invalid."}
              </FormHelperText>
            </FormControl>

            {/* -------------------- LAST NAME INPUT --------------------*/}
            <FormControl
              error={
                !this.props.lastNameInputFocused &&
                this.props.lastNameInputError
              }
              aria-describedby="lastName-error-text"
              fullWidth
              required
              className={classes.registerInput}
            >
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <Input
                id="lastName"
                name="lastNameInput"
                value={this.props.lastNameInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* LASTNAME INPUT ERRORS */}
              <FormHelperText id="lastName-error-text">
                {!this.props.lastNameInputFocused &&
                  this.props.lastNameInputError &&
                  "Last name format invalid."}
              </FormHelperText>
            </FormControl>

            {/* -------------------- EMAIL INPUT --------------------*/}
            <FormControl
              error={
                !this.props.emailInputFocused && this.props.emailInputError
              }
              aria-describedby="email-error-text"
              fullWidth
              required
              className={classes.registerInput}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="emailInput"
                value={this.props.emailInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* EMAIL INPUT ERRORS */}
              <FormHelperText id="email-error-text">
                {!this.props.emailInputFocused &&
                  this.props.emailInputError &&
                  "Email format invalid."}
              </FormHelperText>
            </FormControl>

            {/* -------------------- PASSWORD INPUT --------------------*/}
            <FormControl
              error={
                !this.props.passwordInputFocused &&
                this.props.passwordInputError
              }
              aria-describedby="password-error-text"
              fullWidth
              required
              className={classes.registerInput}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="passwordInput"
                type="password"
                value={this.props.passwordInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* PASSWORD INPUT ERRORS */}
              <FormHelperText id="password-error-text">
                {!this.props.passwordInputFocused &&
                  this.props.passwordInputError &&
                  "Password format invalid."}
              </FormHelperText>
            </FormControl>

            {/* -------------------- CONFIRM PASSWORD INPUT --------------------*/}
            <FormControl
              error={
                !this.props.confirmPasswordInputFocused &&
                this.props.confirmPasswordInputError
              }
              aria-describedby="confirmPassword-error-text"
              fullWidth
              required
              className={classes.registerInput}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPasswordInput"
                type="password"
                value={this.props.confirmPasswordInput}
                onChange={this.props.inputChanged}
                onFocus={this.props.inputFocused}
                onBlur={this.props.inputBlur}
              />

              {/* CONFIRM PASSWORD INPUT ERRORS */}
              <FormHelperText id="confirmPassword-error-text">
                {!this.props.confirmPasswordInputFocused &&
                  this.props.confirmPasswordInputError &&
                  "Passwords don't match."}
              </FormHelperText>
            </FormControl>

            {/* -------------------- REGISTER BUTTON --------------------*/}

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.registerButton}
              fullWidth
              disabled={
                this.props.firstNameInput === "" ||
                this.props.firstNameInputError ||
                this.props.lastNameInput === "" ||
                this.props.lastNameInputError ||
                this.props.emailInput === "" ||
                this.props.emailInputError ||
                this.props.passwordInput === "" ||
                this.props.passwordInputError ||
                this.props.confirmPasswordInput === "" ||
                this.props.confirmPasswordInputError ||
                this.props.serverErrors.length !== 0
              }
            >
              Register
            </Button>
          </form>

          {/* ALREADY REGISTERED LINK */}
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: 20, textAlign: "center" }}
          >
            <Link to="/login" className={classes.link}>
              Already registered
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
    // Token
    token: state.loggerReducer.token,

    // First name input
    firstNameInput: state.loginAndRegisterReducer.firstNameInput,
    firstNameInputFocused: state.loginAndRegisterReducer.firstNameInputFocused,
    firstNameInputError: state.loginAndRegisterReducer.firstNameInputError,

    // Last name input
    lastNameInput: state.loginAndRegisterReducer.lastNameInput,
    lastNameInputFocused: state.loginAndRegisterReducer.lastNameInputFocused,
    lastNameInputError: state.loginAndRegisterReducer.lastNameInputError,

    // Email input
    emailInput: state.loginAndRegisterReducer.emailInput,
    emailInputFocused: state.loginAndRegisterReducer.emailInputFocused,
    emailInputError: state.loginAndRegisterReducer.emailInputError,

    // Password input
    passwordInput: state.loginAndRegisterReducer.passwordInput,
    passwordInputFocused: state.loginAndRegisterReducer.passwordInputFocused,
    passwordInputError: state.loginAndRegisterReducer.passwordInputError,

    // Confirm password input
    confirmPasswordInput: state.loginAndRegisterReducer.confirmPasswordInput,
    confirmPasswordInputFocused:
      state.loginAndRegisterReducer.confirmPasswordInputFocused,
    confirmPasswordInputError:
      state.loginAndRegisterReducer.confirmPasswordInputError,

    // Server errors
    serverErrors: state.loginAndRegisterReducer.serverErrors,

    // Snackbar for server errors:
    snackbarOpen: state.loginAndRegisterReducer.snackbarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch({ type: RESET_STATE }),
    inputFocused: event =>
      dispatch({ type: INPUT_FOCUSED, name: event.target.name }),
    inputBlur: event => dispatch({ type: INPUT_BLUR, name: event.target.name }),

    inputChanged: event => {
      dispatch({
        type: INPUT_CHANGED,
        name: event.target.name,
        value: event.target.value
      });
    },

    handleSubmit: (
      event,
      _firstNameInput,
      _lastNameInput,
      _emailInput,
      _passwordInput,
      _history
    ) => {
      // Prevent window from reloading
      event.preventDefault();

      // Reset form inputs state
      dispatch({ type: RESET_STATE });

      // Pass the data to registration api
      Api.register(
        dispatch,
        _firstNameInput,
        _lastNameInput,
        _emailInput,
        _passwordInput,
        _history
      );
    },

    handleSnackbarClose: e => {
      dispatch({ type: SNACKBAR_CLOSE });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
