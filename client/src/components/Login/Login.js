// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
  RESET_STATE,
  INPUT_FOCUSED,
  INPUT_BLUR,
  INPUT_CHANGED
} from "../../actions/actions";

// Material-UI
import {
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
          {/* ----- LOGIN__HEADER ----- */}
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Let's get started
          </Typography>

          {/* ----- LOGIN__INPUTS ----- */}
          <form>
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
    passwordInputError: state.passwordInputError
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
