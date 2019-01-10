import React, { Component } from "react";
import { connect } from "react-redux";

// Material-UI
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LOGGED_OUT } from "../../actions/actions";

const styles = {
  container: {
    marginTop: "25vh"
  },

  heading: {
    marginTop: 20,
    textAlign: "center"
  },

  content: {
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    alignItems: "center"
  },

  button: {
    marginTop: 20
  }
};

class SignOut extends Component {
  state = {
    currentCount: 3
  };

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    });

    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
      this.props.handleLogout(this.props.history);
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6} className={classes.content}>
          <Typography variant="h2" className={classes.heading}>
            Logged out
          </Typography>
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>
            Redirecting to homepage...
          </Typography>
          <CircularProgress disableShrink style={{ marginTop: 20 }} />
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.loggerReducer.token,
    role: state.loggerReducer.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: history => {
      if (dispatch({ type: LOGGED_OUT })) {
        history.push("/");
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignOut));
