import React, { Component } from "react";

// Material-UI
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

class NotFound extends Component {
  state = {
    currentCount: 3
  };

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    });

    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
      this.props.history.push("/");
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
            Error 404: Page not found.
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

export default withStyles(styles)(NotFound);
